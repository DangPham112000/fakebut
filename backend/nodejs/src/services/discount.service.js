import { BadRequestError, NotFoundError } from "../core/error.response.js";
import discountRepo from "../models/repositories/discount.repo.js";
import PostRepo from "../models/repositories/post.repo.js";

export default class DiscountService {
	/**
	 * 1. Validate input
	 * 2. Check discount exist
	 */
	static async createDiscountCode(payload) {
		const { code, startDate, endDate, creatorId, type, value } = payload;
		if (
			new Date() > new Date(startDate) ||
			new Date() > new Date(endDate) ||
			new Date(startDate) >= new Date(endDate)
		) {
			throw new BadRequestError("Invalid date");
		}

		if (type === "percentage" && value <= 100 && value > 0) {
			throw new BadRequestError("Invalid value");
		}

		const foundDiscount = await discountRepo.findDiscount(code, creatorId);
		if (foundDiscount) {
			throw new BadRequestError("Discount exists!!!");
		}

		const newDiscount = await discountRepo.createDiscount(payload);

		return newDiscount;
	}

	// TODO: TBU updateDiscountCode deleteDiscountCode
	static async updateDiscountCode() {}
	static async deleteDiscountCode() {}

	static async getAllPostsAvailForDiscountCode({
		code,
		creatorId,
		limit,
		page,
	}) {
		const foundDiscount = await discountRepo.findDiscount(code, creatorId);
		if (!foundDiscount || !foundDiscount.isActive) {
			throw new NotFoundError("Discount not exist!!!");
		}

		const { appliesTo: discountAppliesTo, postIds: discountPostIds } =
			foundDiscount;

		let foundPosts = [];
		if (discountAppliesTo === "all") {
			foundPosts = await PostRepo.findAllPosts({
				filter: {
					postOwner: creatorId,
					isPublished: true,
				},
				limit: +limit,
				page: +page,
				sort: "ctime",
				select: ["title"],
			});
		}

		if (discountAppliesTo === "specific") {
			foundPosts = await PostRepo.findAllPosts({
				filter: {
					_id: { $in: discountPostIds },
					isPublished: true,
				},
				limit: +limit,
				page: +page,
				sort: "ctime",
				select: ["title"],
			});
		}

		return foundPosts;
	}

	static async getAllDiscountCodesOfCreator({ creatorId, limit, page }) {
		const discountCodes = await discountRepo.findAllDiscountsUnselect({
			filter: {
				creatorId,
				isActive: true,
			},
			limit: +limit,
			page: +page,
			unselect: ["__v", "creatorId"],
		});

		return discountCodes;
	}

	static async getDiscountAmount({ code, creatorId, posts }) {
		const foundDiscount = await discountRepo.findDiscount(code, creatorId);
		if (!foundDiscount || !foundDiscount.isActive) {
			throw new NotFoundError("Discount does not exist");
		}

		const {
			maxUses,
			usesCount,
			endDate,
			minOrderValue,
			maxUsesPerUser,
			type,
			value,
		} = foundDiscount;

		if (maxUses === usesCount) {
			throw new BadRequestError("Discount is out of stock");
		}

		if (new Date() > new Date(endDate)) {
			throw new BadRequestError("Discount is expired");
		}

		// TODO: check maxUsesPerUser
		if (maxUsesPerUser > 0) {
		}

		// TODO: check post can be applied

		const totalOrder = posts.reduce(acc, (post) => acc + post.price, 0);
		if (minOrderValue > 0 && totalOrder < minOrderValue) {
			throw new BadRequestError("Order is not satisty the condition");
		}

		const discountAmount =
			type === "fixed_amount" ? value : totalOrder * (value / 100);

		return {
			totalPrice: totalOrder,
			discountAmount,
			finalPrice: totalOrder - discountAmount,
		};
	}

	static async cancelDiscountCode({ code, userId, creatorId }) {
		const foundDiscount = await discountRepo.findDiscount(code, creatorId);
		if (!foundDiscount) {
			throw new NotFoundError("Discount does not exist");
		}

		const result = await discountRepo.cancelDiscount(
			foundDiscount._id,
			userId
		);

		return result;
	}
}
