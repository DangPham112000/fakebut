import { SuccessResponse } from "../core/success.response.js";
import CheckoutService from "../services/checkout.service.js";

class CheckoutController {
	async checkoutReview(req, res, next) {
		new SuccessResponse({
			message: "Review checkout successfully",
			metatdata: await CheckoutService.checkoutReview({
				...req.body,
				userId: req.user.userId,
			}),
		}).send(res);
	}
}

export default new CheckoutController();