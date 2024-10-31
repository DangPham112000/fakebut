import discountModel from "../discount.model.js";
import { getSelectData, getUnselectData } from "../../utils/index.js";

export default class discountRepo {
	static async createDiscount(payload) {
		const {
			name,
			description,
			type,
			value,
			code,
			startDate,
			endDate,
			maxUses,
			usesCount,
			usersUsed,
			maxUsesPerUser,
			minOrderValue,
			creatorId,
			isActive,
			appliesTo,
			postIds,
		} = payload;
		return await discountModel.create({
			name,
			description,
			type,
			value,
			code,
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			maxUses,
			usesCount,
			usersUsed,
			maxUsesPerUser,
			minOrderValue: minOrderValue || 0,
			creatorId,
			isActive,
			appliesTo,
			postIds: appliesTo === "all" ? [] : postIds,
		});
	}
	static async findDiscount(code, creatorId) {
		return await discountModel.findOne({ code, creatorId }).lean();
	}

	static async findAllDiscountsUnselect({
		filter,
		unselect,
		limit = 50,
		page = 1,
		sort = "ctime",
	}) {
		const skip = (page - 1) * limit;
		const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
		const documents = await discountModel
			.find(filter)
			.sort(sortBy)
			.skip(skip)
			.limit(limit)
			.select(getUnselectData(unselect))
			.lean();

		return documents;
	}

	static async findAllDiscountsSelect({
		filter,
		select,
		limit = 50,
		page = 1,
		sort = "ctime",
	}) {
		const skip = (page - 1) * limit;
		const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
		const documents = await discountModel
			.find(filter)
			.sort(sortBy)
			.skip(skip)
			.limit(limit)
			.select(getSelectData(select))
			.lean();

		return documents;
	}

	static async cancelDiscount(discountId, userId) {
		return await discountModel.findByIdAndUpdate(discountId, {
			$pull: {
				usersUsed: userId,
			},
			$inc: {
				maxUses: 1,
				usesCount: -1,
			},
		});
	}
}
