import cartModel from "../cart.model.js";

export default class CartRepo {
	static async findCartById({ cartId }) {
		return await cartModel.findOne({ _id: cartId, state: "active" }).lean();
	}

	static async createUserCart({ userId, postId }) {
		return await cartModel.create({
			owner: userId,
			postIds: postId ? [postId] : [],
			state: "active",
			countPost: postId ? 1 : 0,
		});
	}

	static async findCart(userId) {
		return await cartModel.findOne({ owner: userId }).lean();
	}

	static async addPostToCart({ userId, postId }) {
		const query = { owner: userId, state: "active" },
			update = {
				$addToSet: { postIds: postId },
				$inc: { countPost: 1 },
			},
			option = { new: true };

		return await cartModel.findOneAndUpdate(query, update, option);
	}

	static async removePostFromCart({ userId, postId }) {
		const query = { owner: userId, state: "active" },
			update = {
				$pull: { postIds: postId },
				$inc: { countPost: -1 },
			},
			option = { new: true };

		return await cartModel.findOneAndUpdate(query, update, option);
	}
}
