import {
	SVR_ACCOUNT_DOES_NOT_EXIST,
	SVR_PASSWORD_IS_INCORRECT,
} from "../../k/serverErrorCode";
import users from "../mockDB/user";

export default (options) => {
	const { email, password } = JSON.parse(options.body);
	const isEmailExist = users.some((user) => user.email === email);
	let isCorrectPassword = false;
	if (isEmailExist) {
		isCorrectPassword = users.some(
			(user) => user.email === email && user.password === password
		);
	}

	return {
		errorCode: isEmailExist
			? isCorrectPassword
				? 0
				: SVR_PASSWORD_IS_INCORRECT
			: SVR_ACCOUNT_DOES_NOT_EXIST,
	};
};
