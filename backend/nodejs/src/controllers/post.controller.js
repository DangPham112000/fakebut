import { SuccessResponse } from "../core/success.response.js";
import { PostFactory } from "../services/post.service.js";

class PostController {
	async createPost(req, res, next) {
		new SuccessResponse({
			message: "create new post success!!!",
			metatdata: await PostFactory.create(req.body.topic, req.body),
		}).send(res);
	}
}

export default new PostController();
