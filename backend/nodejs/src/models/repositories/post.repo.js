import mongoose from "mongoose";
import { postModel } from "../post.model.js";

const { Types } = mongoose;

class PostRepo {
	static async queryPosts({ query, limit, skip }) {
		return await postModel
			.find(query)
			.populate("postOwner", "name email -_id")
			.sort({ updatedAt: -1 })
			.skip(skip)
			.limit(limit)
			.lean()
			.exec();
	}

	static async publishPostByOwner({ postId, postOwner }) {
		const foundPost = await postModel.findOne({
			_id: new Types.ObjectId(postId),
			postOwner: new Types.ObjectId(postOwner),
		});
		if (!foundPost) return null;

		foundPost.isDraft = false;
		foundPost.isPublished = true;

		const { modifiedCount } = await foundPost.updateOne(foundPost);

		return modifiedCount;
	}

	static async unpublishPostByOwner({ postId, postOwner }) {
		const foundPost = await postModel.findOne({
			_id: new Types.ObjectId(postId),
			postOwner: new Types.ObjectId(postOwner),
		});
		if (!foundPost) return null;

		foundPost.isDraft = true;
		foundPost.isPublished = false;

		const { modifiedCount } = await foundPost.updateOne(foundPost);

		return modifiedCount;
	}
}

export default PostRepo;
