import { describe, expect, it } from "vitest";
import { createTokenPair, genKeyPairRSA } from "../../src/auth/authUtils";
import jwt from "jsonwebtoken";
import crypto from "crypto";

describe("authUltils", () => {
	describe("genKeyPairRSA", () => {
		afterEach(() => {
			vi.restoreAllMocks();
			vi.unstubAllGlobals();
		});
		it("should return privateKey and publicKey", () => {
			const { privateKey, publicKey } = genKeyPairRSA();

			expect(privateKey).toMatch(/^-----BEGIN RSA PRIVATE KEY-----/);
			expect(publicKey).toMatch(/^-----BEGIN RSA PUBLIC KEY-----/);
		});
		it("should throw error when crypto lib got error", () => {
			vi.spyOn(crypto, "generateKeyPairSync").mockImplementation(() => {
				throw new Error("Crypto Error");
			});

			const toBeThrowError = () => {
				const { privateKey, publicKey } = genKeyPairRSA();
			};
			expect(toBeThrowError).toThrowError(
				"crypto.generateKeyPairSync got error"
			);
		});
	});
	describe("createTokenPair", () => {
		afterEach(() => {
			vi.restoreAllMocks();
			vi.unstubAllGlobals();
		});
		it("should return accessToken, refreshToken", () => {
			const payload = {
				userId: 123,
				email: "a@b.co",
			};

			const { privateKey, publicKey } = genKeyPairRSA();

			const { accessToken, refreshToken } = createTokenPair(
				payload,
				privateKey
			);

			const accessTokenPayload = jwt.verify(accessToken, publicKey);
			const refreshTokenPayload = jwt.verify(refreshToken, publicKey);

			expect(accessTokenPayload.userId).toEqual(payload.userId);
			expect(accessTokenPayload.email).toEqual(payload.email);
			expect(refreshTokenPayload.userId).toEqual(payload.userId);
			expect(refreshTokenPayload.email).toEqual(payload.email);
		});
		it("should throw error when jwt lib got error", () => {
			vi.spyOn(jwt, "sign").mockImplementation(() => {
				throw new Error("JWT error");
			});

			const payload = {
				userId: 123,
				email: "a@b.co",
			};

			const { privateKey, publicKey } = genKeyPairRSA();

			const toBeThrowError = () => {
				const { accessToken, refreshToken } = createTokenPair(
					payload,
					privateKey
				);
			};
			expect(toBeThrowError).toThrowError("jwt.sign got error");
		});
	});
});
