import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "Orders";

// Declare the Schema of the Mongo model
var orderSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		checkout: { type: Object, default: {} },
		/**
		 * {
		 *      totalPrice,
		 *      totalApplyDiscount,
		 *      feeShip
		 * }
		 */
		payment: { type: Object, default: {} },
		posts: { type: Array, required: true },
		trackingNumber: { type: String, default: "#000107112024" },
		status: {
			type: String,
			enum: ["pending", "comfirmed", "cancelled"],
			default: "pending",
		},
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

//Export the model
export default model(DOCUMENT_NAME, orderSchema);
