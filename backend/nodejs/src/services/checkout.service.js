import { BadRequestError } from "../core/error.response.js";
import CartRepo from "../models/repositories/cart.repo.js";
import PostRepo from "../models/repositories/post.repo.js";
import DiscountService from "./discount.service.js";
import { getInfoData } from "../utils/index.js";

export default class CheckoutService {
	/*
    payload = {
        cartId,
        userId,
        ordersPerCreators: [
            {
                creatorId,
                discountCode,
                postIds: []
            }
        ]
    }
    */
	static async checkoutReview({ cartId, userId, ordersPerCreators }) {
		const foundCart = await CartRepo.findCartById({ cartId });
		if (!foundCart) {
			throw new BadRequestError("Cart does not exist");
		}

		if (foundCart.owner.toString() !== userId) {
			throw new BadRequestError("Wrong information");
		}

		const checkoutOrders = [];

		for (const order of ordersPerCreators) {
			const { creatorId, discountCode, postIds } = order;
			const checkoutOrder = {
				creatorId,
				discountCode,
				posts: [],
				totalPrice: 0,
				feeShip: 0, // TODO: TBU feeship
				discountAmount: 0,
				totalCheckout: 0,
			};

			if (discountCode) {
				const {
					posts,
					discountValue,
					totalPrice,
					discountAmount,
					finalPrice,
				} = await DiscountService.getDiscountAmount({
					code: discountCode,
					creatorId,
					postIds,
				});

				checkoutOrder.posts = posts;
				checkoutOrder.discountValue = discountValue;
				checkoutOrder.totalPrice = totalPrice;
				checkoutOrder.discountAmount = discountAmount;
				checkoutOrder.totalCheckout = finalPrice;
			} else {
				const posts = await PostRepo.findPostsByIds({ postIds });
				const totalPrice = posts.reduce((acc, post) => {
					checkoutOrder.posts.push(
						getInfoData(["postId", "title", "price"], post)
					);
					return acc + post.price;
				}, 0);
				checkoutOrder.totalPrice += totalPrice;
				checkoutOrder.totalCheckout += totalPrice;
			}

			checkoutOrders.push(checkoutOrder);
		}

		const finalCheckout = checkoutOrders.reduce(
			(acc, checkoutOrder) => {
				return {
					totalPrice: acc.totalPrice + checkoutOrder.totalPrice,
					feeShip: acc.feeShip + checkoutOrder.feeShip,
					totalDiscount:
						acc.totalDiscount + checkoutOrder.discountAmount,
					totalCheckout:
						acc.totalCheckout + checkoutOrder.totalCheckout,
				};
			},
			{
				totalPrice: 0,
				feeShip: 0,
				totalDiscount: 0,
				totalCheckout: 0,
			}
		);

		return {
			ordersPerCreators,
			checkoutOrders,
			finalCheckout,
		};
	}
}
