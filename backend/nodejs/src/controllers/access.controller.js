import { CREATED } from "../core/success.response.js";
import AccessService from "../services/access.service.js";

class AccessController {
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
}

export default new AccessController();
