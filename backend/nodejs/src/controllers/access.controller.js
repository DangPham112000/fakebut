import { CREATED, SuccessResponse } from "../core/success.response.js";
import AccessService from "../services/access.service.js";

class AccessController {
	login = async (req, res, next) => {
		new SuccessResponse({
			metatdata: await AccessService.login(req.body),
		}).send(res);
	};

	signup = async (req, res, next) => {
		console.log("[P]::sign up::", req.body);
		new CREATED({
			message: "Registered OK!",
			metatdata: await AccessService.signUp(req.body),
			options: {
				limit: 10,
			},
		}).send(res);
		return;
	};

	logout = async (req, res, next) => {
		new SuccessResponse({
			message: "Logout success",
			metatdata: await AccessService.logout(req.user),
		}).send(res);
	};

	handleRefreshToken = async (req, res, next) => {
		new SuccessResponse({
			message: "Update token success",
			metatdata: await AccessService.handleRefreshToken({
				refreshToken: req.refreshToken,
				user: req.user,
			}),
		}).send(res);
	};
}

export default new AccessController();
