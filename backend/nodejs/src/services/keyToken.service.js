import { Types } from "mongoose";
import keyTokenModel from "../models/keyToken.model.js";

class KeyTokenService {
	static createKeyToken = async ({
		userId,
		privateKey,
		publicKey,
		refreshToken,
	}) => {
		try {
			const publicKeyString = publicKey.toString(),
				privateKeyString = privateKey.toString();

			const filter = { user: userId },
				update = {
					privateKey: privateKeyString,
					publicKey: publicKeyString,
					refreshTokensUsed: [],
					refreshToken,
				},
				options = { upsert: true, new: true };

			const token = await keyTokenModel
				.findOneAndUpdate(filter, update, options)
				.lean();
			return token ? token.publicKey : null;
		} catch (error) {
			return error;
		}
	};

	static findByUserId = async (userId) => {
		return await keyTokenModel.findOne({
			user: new Types.ObjectId(userId),
		});
	};

	static removeKeyById = async (id) => {
		return await keyTokenModel
			.deleteOne({ _id: new Types.ObjectId(id) })
			.lean();
	};

	static findByRefreshTokensUsed = async (refreshToken) => {
		return await keyTokenModel
			.findOne({ refreshTokensUsed: refreshToken })
			.lean();
	};

	static removeByUserId = async (userId) => {
		return await keyTokenModel.deleteMany({ user: userId }).lean();
	};

	static findByRefreshToken = async (refreshToken) => {
		return await keyTokenModel.findOne({ refreshToken });
	};
}

export default KeyTokenService;
