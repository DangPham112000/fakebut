import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		publicKey: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: Array,
			default: [],
		},
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

//Export the model
export default model(DOCUMENT_NAME, keyTokenSchema);