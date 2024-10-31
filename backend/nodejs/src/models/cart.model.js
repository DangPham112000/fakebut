import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";

// Declare the Schema of the Mongo model
var cartSchema = new Schema(
	{
		state: {
			type: String,
			required: true,
			enum: ["active", "completed", "failed", "pending"],
			default: "active",
		},
		postIds: { type: Array, required: true, default: [] },
		countPost: { type: Number, default: 0 },
		owner: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

//Export the model
export default model(DOCUMENT_NAME, cartSchema);
