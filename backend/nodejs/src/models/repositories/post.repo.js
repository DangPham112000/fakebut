import mongoose from "mongoose";
import { postModel } from "../post.model.js";
import { getSelectData, getUnselectData } from "../../utils/index.js";

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
			_id: postId,
			postOwner: postOwner,
		});
		if (!foundPost) return null;

		foundPost.isDraft = false;
		foundPost.isPublished = true;

		const { modifiedCount } = await foundPost.updateOne(foundPost);

		return modifiedCount;
	}

	static async unpublishPostByOwner({ postId, postOwner }) {
		const foundPost = await postModel.findOne({
			_id: postId,
			postOwner: postOwner,
		});
		if (!foundPost) return null;

		foundPost.isDraft = true;
		foundPost.isPublished = false;

		const { modifiedCount } = await foundPost.updateOne(foundPost);

		return modifiedCount;
	}

	// update depend on model param
	static async updatePostById({ postId, bodyUpdate, model, isNew = true }) {
		return await model.findByIdAndUpdate(postId, bodyUpdate, {
			new: isNew,
		});
	}

	static async searchPostsByUser({ keySearch }) {
		const regexSearch = new RegExp(keySearch);
		const result = await postModel
			.find(
				{
					isPublished: true,
					$text: { $search: regexSearch },
				},
				{
					score: { $meta: "textScore" },
				}
			)
			.sort({ score: { $meta: "textScore" } })
			.lean();

		return result;
	}

	static async findAllPosts({ limit, sort, page, filter, select }) {
		const skip = (page - 1) * limit;
		const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
		const posts = await postModel
			.find(filter)
			.sort(sortBy)
			.skip(skip)
			.limit(limit)
			.select(getSelectData(select))
			.lean();

		return posts;
	}

	static async findPostUnselect({ postId, unselect }) {
		return await postModel
			.findById(postId)
			.select(getUnselectData(unselect))
			.lean();
	}

	static async findPostSelect({ postId, select }) {
		return await postModel
			.findById(postId)
			.select(getSelectData(select))
			.lean();
	}

	static async findPostsByIds({ postIds }) {
		return await Promise.all(
			postIds.map((postId) =>
				this.findPostUnselect({ postId, unselect: ["__v"] })
			)
		);
	}
}

export default PostRepo;
