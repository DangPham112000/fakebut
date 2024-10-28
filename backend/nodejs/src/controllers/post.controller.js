import { SuccessResponse } from "../core/success.response.js";
import { PostFactory } from "../services/post.service.js";

class PostController {
	async createPost(req, res, next) {
		new SuccessResponse({
			message: "Create new post success!!!",
			metatdata: await PostFactory.create(req.body.topic, {
				...req.body,
				postOwner: req.user.userId,
			}),
		}).send(res);
	}

	async publishPostByOwner(req, res, next) {
		new SuccessResponse({
			message: "Publish post success!!!",
			metatdata: await PostFactory.publishPostByOwner({
				postId: req.params.id,
				postOwner: req.user.userId,
			}),
		}).send(res);
	}

	async unpublishPostByOwner(req, res, next) {
		new SuccessResponse({
			message: "Upublish post success!!!",
			metatdata: await PostFactory.unpublishPostByOwner({
				postId: req.params.id,
				postOwner: req.user.userId,
			}),
		}).send(res);
	}

	// QUERY //
	async findAllDraftsOfUser(req, res, next) {
		new SuccessResponse({
			message: "Get list Draft success!!!",
			metatdata: await PostFactory.findAllDraftsOfUser({
				userId: req.user.userId,
			}),
		}).send(res);
	}

	async findAllPublishOfUser(req, res, next) {
		new SuccessResponse({
			message: "Get list Publish success!!!",
			metatdata: await PostFactory.findAllPublishOfUser({
				userId: req.user.userId,
			}),
		}).send(res);
	}
}

export default new PostController();
