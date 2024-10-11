import bcrypt from "bcrypt";
import crypto from "crypto";
import userModel from "../models/user.model.js";
import KeyTokenService from "./keyToken.service.js";
import { createTokenPair } from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";
import { BadRequestError } from "../core/error.response.js";

const ROLES = {
	USER: "USER",
	ADMIN: "ADMIN",
};

class AccessService {
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

			const publicKeyString = await KeyTokenService.createKeyToken({
				userId: newUser._id,
				publicKey,
			});

			if (!publicKeyString) {
				return {
					code: "xxx",
					message: "publicKeyString got error",
				};
			}
			console.log("publicKeyString::", publicKeyString);

			const publicKeyObject = crypto.createPublicKey(publicKeyString);
			console.log("publicKeyObject::", publicKeyObject);
			// create a token pair
			const tokens = await createTokenPair(
				{ userId: newUser._id, email },
				publicKeyObject,
				privateKey
			);
			console.log("Create tokens success:: ", tokens);

			return {
				code: 201,
				metadata: {
					user: getInfoData(["_id", "name", "email"], newUser),
					tokens,
				},
			};
		}
		return {
			code: 200,
			metadata: null,
		};
	};
}

export default AccessService;
