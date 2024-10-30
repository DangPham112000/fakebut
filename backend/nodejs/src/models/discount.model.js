import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";

// Declare the Schema of the Mongo model
var discountSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, require: true },
		type: {
			type: String,
			default: "fixed_amount",
			enum: ["fixed_amount", "percentage"],
		},
		value: { type: Number, required: true }, //if type = fixed_amount then 10.000 => 10k vnd, if type = percentage then 10 => 10%
		code: { type: String, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		maxUses: { type: Number, required: true }, // max discount can use
		usesCount: { type: Number, required: true }, // amount discount remain
		usersUsed: { type: Array, default: [] }, // who used
		maxUsesPerUser: { type: Number, required: true }, // max discount each user can use
		minOrderValue: { type: Number, required: true },
		creatorId: { type: Schema.Types.ObjectId, ref: "User" },
		isActive: { type: Boolean, default: true },
		appliesTo: { type: String, required: true, enum: ["all", "specific"] },
		postIds: { type: Array, default: [] }, // if appliesTo = specific, then must specify posts can apply this voucher
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

//Export the model
export default model(DOCUMENT_NAME, discountSchema);
