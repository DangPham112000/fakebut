import keyTokenModel from "../models/keyToken.model.js";

class KeyTokenService {
	static createKeyToken = async ({ userId, publicKey }) => {
		try {
			const publicKeyString = publicKey.toString();
			const token = await keyTokenModel.create({
				user: userId,
				publicKey: publicKeyString,
			});

			return token ? token.publicKey : null;
		} catch (error) {
			return error;
		}
	};
}

export default KeyTokenService;
