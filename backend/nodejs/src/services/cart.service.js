import CartRepo from "../models/repositories/cart.repo.js";

export default class CartService {
	static async addToCart({ userId, postId }) {
		const userCart = await CartRepo.findCart(userId);
		if (!userCart) {
			return await CartRepo.createUserCart({ userId, postId });
		}
		return await CartRepo.addPostToCart({ userId, postId });
	}

	static async removeFromCart({ userId, postId }) {
		const userCart = await CartRepo.findCart(userId);
		if (!userCart) {
			return await CartRepo.createUserCart({ userId });
		}
		return await CartRepo.removePostFromCart({ userId, postId });
	}

	static async getUserCart({ userId }) {
		return await CartRepo.findCart(userId);
	}
}
