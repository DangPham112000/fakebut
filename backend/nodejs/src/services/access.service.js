import bcrypt from "bcrypt";
import crypto from "crypto";
import userModel from "../models/user.model.js";
import KeyTokenService from "./keyToken.service.js";
import { createTokenPair } from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";
import { AuthFailureError, BadRequestError } from "../core/error.response.js";
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
	static login = async ({ email, password, refreshToken = null }) => {
		const foundUser = await findByEmail({ email });
		if (!foundUser) {
			throw new BadRequestError("User not yet registered");
		}
		const match = await bcrypt.compare(password, foundUser.password);
		if (!match) {
			throw new AuthFailureError("Authentication error");
		}

		const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
			modulusLength: 4096,
			publicKeyEncoding: {
				type: "pkcs1",
				format: "pem",
			},
			privateKeyEncoding: {
				type: "pkcs1",
				format: "pem",
			},
		});

		const { _id: userId } = foundUser;

		const tokens = await createTokenPair(
			{ userId, email },
			publicKey,
			privateKey
		);

		await KeyTokenService.createKeyToken({
			userId,
			publicKey,
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
			const { privateKey, publicKey } = crypto.generateKeyPairSync(
				"rsa",
				{
					modulusLength: 4096,
					publicKeyEncoding: {
						type: "pkcs1",
						format: "pem",
					},
					privateKeyEncoding: {
						type: "pkcs1",
						format: "pem",
					},
				}
			);

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
}

export default AccessService;
