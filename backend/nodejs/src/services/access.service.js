import bcrypt from "bcrypt";
import crypto from "crypto";
import userModel from "../models/user.model.js";
import KeyTokenService from "./keyToken.service.js";
import {
	createTokenPair,
	genKeyPairRSA,
	verifyJWT,
} from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";
import {
	AuthFailureError,
	BadRequestError,
	ForbiddenError,
} from "../core/error.response.js";
import { findByEmail } from "./user.service.js";

const ROLES = {
	USER: "USER",
	ADMIN: "ADMIN",
};

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

		const tokens = await createTokenPair(
			{ userId, email },
			publicKey,
			privateKey
		);

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
		const user = await userModel.findOne({ email }).lean();
		if (user) {
			throw new BadRequestError("Error: User has aleady registered");
		}

		const hashedPass = await bcrypt.hash(password, 10);

		const newUser = await userModel.create({
			name,
			email,
			password: hashedPass,
			roles: [ROLES.USER],
		});

		// handle token
		if (newUser) {
			const { privateKey, publicKey } = genKeyPairRSA();

			console.log({ privateKey, publicKey });

			// create a token pair
			const tokens = await createTokenPair(
				{ userId: newUser._id, email },
				publicKey,
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
				return {
					code: "xxx",
					message: "publicKeyString got error",
				};
			}

			return {
				user: getInfoData(["_id", "name", "email"], newUser),
				tokens,
			};
		}
		return {
			code: 200,
			metadata: null,
		};
	};

	static logout = async (keyStore) => {
		const delKey = await KeyTokenService.removeKeyById(keyStore._id);
		console.log({ delKey });
		return delKey;
	};

	/**
	 * Check this is a current refresh token or used refresh tokens
	 *  If used token:
	 *      1. remove all pair tokens or only the suspicious pair token depend on architecture
	 *      2. warning user
	 *  If current token:
	 *      1. Verify token
	 *      2. Create new keyToken pair
	 *      3. update keyToken pair in DBs
	 */
	static handleRefreshToken = async (refreshToken) => {
		const usedRefreshToken = await KeyTokenService.findByRefreshTokensUsed(
			refreshToken
		);
		if (usedRefreshToken) {
			const { userId, email } = verifyJWT(
				refreshToken,
				usedRefreshToken.publicKey
			);
			// mailing to user this suppicious action
			console.log({ userId, email });
			await KeyTokenService.removeByUserId(userId);
			throw new ForbiddenError("Something wrong happen. Pls relogin");
		}

		const currentKeyToken = await KeyTokenService.findByRefreshToken(
			refreshToken
		);
		if (!currentKeyToken) {
			throw new AuthFailureError("Token is deleted or never exist");
		}

		const { email } = verifyJWT(refreshToken, currentKeyToken.publicKey);
		const foundUser = findByEmail({ email });
		if (!foundUser) {
			throw new AuthFailureError("User is deleted or never exist");
		}

		// const { privateKey, publicKey } = genKeyPairRSA();
		const tokens = await createTokenPair(
			{ userId: foundUser._id, email },
			currentKeyToken.publicKey,
			currentKeyToken.privateKey
		);
		await currentKeyToken.updateOne({
			$set: {
				refreshToken: tokens.refreshToken,
			},
			$addToSet: {
				refreshTokensUsed: refreshToken,
			},
		});

		return {
			user: { userId: foundUser._id, email },
			tokens,
		};
	};
}

export default AccessService;
