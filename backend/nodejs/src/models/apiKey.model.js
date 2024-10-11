import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Dành cho doanh nghiệp sử dụng service của chúng ta
// Được tạo bởi chúng ta, và các doanh nghiệp sẽ có 1 APIkey riêng
// Họ sẽ cần add vào header của họ mỗi lần sử dụng
const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

// Declare the Schema of the Mongo model
var apiKeySchema = new Schema(
	{
		key: {
			type: String,
			required: true,
			unique: true,
		},
		status: {
			type: Boolean,
			default: true,
		},
		permissions: {
			type: [String],
			required: true,
			enum: ["0000", "1111", "2222"],
		},
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

//Export the model
export default model(DOCUMENT_NAME, apiKeySchema);
