import { postModel } from "../post.model.js";

class PostRepo {
	static async findAllDrafts({ query, limit, skip }) {
		return await postModel
			.find(query)
			.populate("postOwner", "name email -_id")
			.sort({ updatedAt: -1 })
			.skip(skip)
			.limit(limit)
			.lean()
			.exec();
	}
}

export default PostRepo;
