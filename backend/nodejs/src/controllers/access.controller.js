import AccessService from "../services/access.service.js";

class AccessController {
	signup = async (req, res, next) => {
		console.log("[P]::sign up::", req.body);
		// 200 ok
		// 201 CREATED
		return res.status(201).json(await AccessService.signUp(req.body));
	};
}

export default new AccessController();
