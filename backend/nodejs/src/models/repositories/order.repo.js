import orderModel from "../order.model.js";

export default class OrderRepo {
	static async createUserOrder({ userId, postIds, checkout, payment }) {
		return await orderModel.create({
			userId,
			checkout,
			posts: postIds,
			payment,
		});
	}
}
