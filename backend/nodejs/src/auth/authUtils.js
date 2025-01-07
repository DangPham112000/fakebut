import jwt from "jsonwebtoken";
import crypto from "crypto";
import { AuthFailureError, NotFoundError } from "../core/error.response.js";
import KeyTokenService from "../services/keyToken.service.js";

const HEADER = {
	API_KEY: "x-api-key",
	CLIENT_ID: "x-client-id",
	AUTHORIZATION: "authorization",
	REFRESHTOKEN: "x-rtoken-id",
};

export const createTokenPair = (payload, privateKey) => {
	try {
		const accessToken = jwt.sign(payload, privateKey, {
			algorithm: "RS256",
			// expiresIn: "2 days",
			expiresIn: "60000", // 1min
		});
		const refreshToken = jwt.sign(payload, privateKey, {
			algorithm: "RS256",
			expiresIn: "7 days",
		});

		return { accessToken, refreshToken };
	} catch (error) {
		throw new Error("jwt.sign got error");
	}
};

export const authentication = async (req, res, next) => {
	const userId = req.headers[HEADER.CLIENT_ID];
	if (!userId) {
		throw new AuthFailureError("Invalid request");
	}

	const keyStore = await KeyTokenService.findByUserId(userId);
	if (!keyStore) {
		throw new NotFoundError("Not found any keys and token match this user");
	}

	const refreshToken = req.headers[HEADER.REFRESHTOKEN];
	if (refreshToken) {
		try {
			const decodeUser = jwt.verify(refreshToken, keyStore.publicKey);
			if (userId !== decodeUser.userId) {
				throw new AuthFailureError("Invalid userId");
			}
			req.user = decodeUser; // {userId, email}
			req.refreshToken = refreshToken;
			return next();
		} catch (error) {
			throw error;
		}
	}

	const accessToken = req.headers[HEADER.AUTHORIZATION];
	if (!accessToken) throw new AuthFailureError("Invalid request");

	try {
		const decodeUser = jwt.verify(accessToken, keyStore.publicKey);
		if (userId !== decodeUser.userId) {
			throw new AuthFailureError("Invalid userId");
		}
		req.user = decodeUser; // {userId, email}
		return next();
	} catch (error) {
		throw error;
	}
};

export const genKeyPairRSA = () => {
	try {
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
		return { privateKey, publicKey };
	} catch (error) {
		throw new Error("crypto.generateKeyPairSync got error");
	}
};
