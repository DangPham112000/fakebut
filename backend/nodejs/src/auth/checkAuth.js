import { findById } from "../services/apiKey.service.js";

const HEADER = {
	API_KEY: "x-api-key",
	AUTHORIZATION: "authorization",
};

export const apiKey = async (req, res, next) => {
	try {
		const key = req.headers[HEADER.API_KEY]?.toString();
		if (!key) {
			return res.status(403).json({
				message: "Forbidden Error",
			});
		}
		// check ObjKey in DB
		const objKey = await findById(key);
		if (!objKey) {
			return res.status(403).json({
				message: "Forbidden Error",
			});
		}

		req.objKey = objKey;

		return next();
	} catch (error) {}
};

// closure function
// return a func that can use parent variable
export const validatePermission = (permission) => {
	return (req, res, next) => {
		if (!req.objKey.permissions) {
			return res.status(403).json({
				message: "Permission denined",
			});
		}

		console.log("permission::", req.objKey.permissions);

		const validPermission = req.objKey.permissions.includes(permission);
		if (!validPermission) {
			return res.status(403).json({
				message: "Permission denined",
			});
		}

		return next();
	};
};

export const asyncHandler = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	};
};
