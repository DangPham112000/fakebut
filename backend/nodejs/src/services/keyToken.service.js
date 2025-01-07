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
		return await keyTokenModel.findOne({ user: userId }).lean();
	};

	static removeByUserId = async (userId) => {
		return await keyTokenModel.deleteMany({ user: userId }).lean();
	};

	static updateRefreshToken = async (userId, newRT, oldRT) => {
		const filter = { user: userId };
		const update = {
			$set: { refreshToken: newRT },
			$addToSet: { refreshTokensUsed: oldRT },
		};
		return await keyTokenModel.findOne(filter).updateOne(update);
	};
}

export default KeyTokenService;
