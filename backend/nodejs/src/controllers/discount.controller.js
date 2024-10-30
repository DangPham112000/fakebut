import { SuccessResponse } from "../core/success.response.js";
import DiscountService from "../services/discount.service.js";

class DiscountController {
	async getDiscountAmount(req, res, next) {
		new SuccessResponse({
			message: "Get discount amount successfully",
			metatdata: await DiscountService.getDiscountAmount({
				...req.body,
			}),
		}).send(res);
	}

	async getAllPostsAvailForDiscountCode(req, res, next) {
		new SuccessResponse({
			message: "Get posts available for discount code successfully",
			metatdata: await DiscountService.getAllPostsAvailForDiscountCode({
				...req.query,
			}),
		}).send(res);
	}

	async createDiscountCode(req, res, next) {
		new SuccessResponse({
			message: "Discount code generated successfully",
			metatdata: await DiscountService.createDiscountCode({
				...req.body,
				creatorId: req.user.userId,
			}),
		}).send(res);
	}

	async getAllDiscountCodesOfCreator(req, res, next) {
		new SuccessResponse({
			message: "Discount codes got successfully",
			metatdata: await DiscountService.getAllDiscountCodesOfCreator({
				...req.query,
				creatorId: req.user.userId,
			}),
		}).send(res);
	}
}

export default new DiscountController();
