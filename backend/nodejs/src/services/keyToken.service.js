import { Types } from "mongoose";
import keyTokenModel from "../models/keyToken.model.js";

class KeyTokenService {
	static createKeyToken = async ({ userId, publicKey, refreshToken }) => {
		try {
			const publicKeyString = publicKey.toString();

			const filter = { user: userId },
				update = {
					publicKey: publicKeyString,
					refreshTokensUsed: [],
					refreshToken,
				},
				options = { upsert: true, new: true };

			const token = await keyTokenModel.findOneAndUpdate(
				filter,
				update,
				options
			);
			return token ? token.publicKey : null;
		} catch (error) {
			return error;
		}
	};

	static findByUserId = async (userId) => {
		return await keyTokenModel
			.findOne({ user: new Types.ObjectId(userId) })
			.lean();
	};

	static removeKeyById = async (id) => {
		return await keyTokenModel.deleteOne({ _id: new Types.ObjectId(id) });
	};
}

export default KeyTokenService;
