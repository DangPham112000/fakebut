import { SuccessResponse } from "../core/success.response.js";
import CartService from "../services/cart.service.js";

class CartController {
	async addToCart(req, res, next) {
		new SuccessResponse({
			message: "Add to cart successfully",
			metatdata: await CartService.addToCart({
				...req.body,
				userId: req.user.userId,
			}),
		}).send(res);
	}

	async removeFromCart(req, res, next) {
		new SuccessResponse({
			message: "Remove from cart successfully",
			metatdata: await CartService.removeFromCart({
				...req.body,
				userId: req.user.userId,
			}),
		}).send(res);
	}

	async getUserCart(req, res, next) {
		new SuccessResponse({
			message: "Get  user cart successfully",
			metatdata: await CartService.getUserCart({
				userId: req.user.userId,
			}),
		}).send(res);
	}
}

export default new CartController();
