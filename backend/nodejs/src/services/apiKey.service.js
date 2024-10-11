import apiKeyModel from "../models/apiKey.model.js";
import crypto from "crypto";

export const findById = async (key) => {
	// create key to test
	// const newKey = await apiKeyModel.create({
	// 	key: crypto.randomBytes(64).toString("hex"),
	// 	permissions: ["0000"],
	// });
	// console.log("New API key:: ", newKey);

	// find key in DB
	const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
	return objKey;
};
