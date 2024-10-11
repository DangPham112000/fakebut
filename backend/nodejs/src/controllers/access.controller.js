import AccessService from "../services/access.service.js";

class AccessController {
	signup = async (req, res, next) => {
		try {
			console.log("[P]::sign up::", req.body);
			// 200 ok
			// 201 CREATED
			return res.status(201).json(await AccessService.signUp(req.body));
		} catch (e) {
			next(e);
		}
	};
}

export default new AccessController();
