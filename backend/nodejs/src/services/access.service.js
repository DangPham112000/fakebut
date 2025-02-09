import bcrypt from "bcrypt";
import KeyTokenService from "./keyToken.service.js";
import { createTokenPair, genKeyPairRSA } from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";
import {
	AuthFailureError,
	BadRequestError,
	ForbiddenError,
	InternalServerError,
} from "../core/error.response.js";
import { createUser, findByEmail } from "./user.service.js";

class AccessService {
	/**
	 * 1. Check email in BD
	 * 2. Match password
	 * 3. Create AT and RT and save
	 * 4. Generate tokens
	 * 5. Get data return login
	 */
	// TODO: must reuse pub & priv key (if exist) to create new token pair
	static login = async ({ email, password, refreshToken = null }) => {
		const foundUser = await findByEmail({ email });
		if (!foundUser) {
			throw new BadRequestError("User not yet registered");
		}
		const match = await bcrypt.compare(password, foundUser.password);
		if (!match) {
			throw new AuthFailureError("Authentication error");
		}

		const { privateKey, publicKey } = genKeyPairRSA();

		const { _id: userId } = foundUser;

		const tokens = createTokenPair({ userId, email }, privateKey);

		await KeyTokenService.createKeyToken({
			userId,
			publicKey,
			privateKey,
			refreshToken: tokens.refreshToken,
		});

		return {
			user: getInfoData(["_id", "name", "email"], foundUser),
			tokens,
		};
	};

	static signUp = async ({ name, email, password }) => {
		// Check email exists
		const foundUser = await findByEmail({ email });
		if (foundUser) {
			throw new BadRequestError("User has aleady registered");
		}

		const hashedPass = await bcrypt.hash(password, 10);

		const newUser = await createUser({
			name,
			email,
			hashedPass,
		});
		if (!newUser) {
			throw new InternalServerError("Can not create new user");
		}
		console.log("newUser:: ", newUser);

		// handle token
		const { privateKey, publicKey } = genKeyPairRSA();
		console.log({ privateKey, publicKey });

		// create a token pair
		const tokens = createTokenPair(
			{ userId: newUser._id, email },
			privateKey
		);
		console.log("Create tokens success:: ", tokens);

		const publicKeyString = await KeyTokenService.createKeyToken({
			userId: newUser._id,
			publicKey,
			privateKey,
			refreshToken: tokens.refreshToken,
		});
		if (!publicKeyString) {
			throw new InternalServerError("Can not create keys");
		}

		return {
			user: getInfoData(["_id", "name", "email"], newUser),
			tokens,
		};
	};

	static logout = async (user) => {
		const delKey = await KeyTokenService.removeByUserId(user.userId);
		return delKey;
	};

	static handleRefreshToken = async ({ refreshToken, user }) => {
		const { userId, email } = user;
		const keyStore = await KeyTokenService.findByUserId(userId);

		if (keyStore.refreshTokensUsed.includes(refreshToken)) {
			await KeyTokenService.removeByUserId(userId);
			throw new ForbiddenError("Something wrong happen. Pls relogin");
		}

		if (keyStore.refreshToken !== refreshToken) {
			throw new AuthFailureError("Token is deleted or never exist");
		}

		const foundUser = await findByEmail({ email });
		if (!foundUser) {
			throw new AuthFailureError("User is deleted or never exist");
		}

		const newTokens = createTokenPair(
			{ userId: foundUser._id, email },
			keyStore.privateKey
		);

		await KeyTokenService.updateRefreshToken(
			userId,
			newTokens.refreshToken,
			refreshToken
		);

		return {
			user,
			tokens: newTokens,
		};
	};
}

export default AccessService;
