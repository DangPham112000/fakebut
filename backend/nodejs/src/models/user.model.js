import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

// Declare the Schema of the Mongo model
var userSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			maxLength: 150,
		},
		email: {
			type: String,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},

		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
		verify: {
			type: Schema.Types.Boolean,
			default: false,
		},
		roles: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

//Export the model
export default model(DOCUMENT_NAME, userSchema);
