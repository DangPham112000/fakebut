import userModel from "../models/user.model.js";

const ROLES = {
	USER: "USER",
	ADMIN: "ADMIN",
};

export const findByEmail = async ({
	email,
	select = { email: 1, password: 1, name: 1, status: 1, role: 1 },
}) => {
	return await userModel.findOne({ email }).select(select).lean();
};

export const createUser = async ({
	name,
	email,
	hashedPass,
	roles = [ROLES.USER],
}) => {
	return userModel.create({
		name,
		email,
		password: hashedPass,
		roles,
	});
};

// TODO: TBU
class UserService {}
