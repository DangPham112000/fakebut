import {
	postModel,
	movieModel,
	musicModel,
	techModel,
} from "../models/post.model.js";
import {
	BadRequestError,
	InternalServerError,
} from "../core/error.response.js";
import PostRepo from "../models/repositories/post.repo.js";

// define factory class to create post
export class PostFactory {
	static postRegistry = {}; // postTopic - classRef

	static registerPostTopic(topic, classRef) {
		PostFactory.postRegistry[topic] = classRef;
	}

	/**
	 * @param {*} topic enum ['Music', 'Movie', 'Tech']
	 * @param {*} payload
	 */
	static async create(topic, payload) {
		const postClassRef = PostFactory.postRegistry[topic];
		if (!postClassRef) {
			throw new BadRequestError(`Invalid Post topic::${topic}`);
		}
		return new postClassRef(payload).createPost();
	}

	// Query //
	static async findAllDraftsOfUser({ userId, limit = 50, skip = 0 }) {
		const query = { postOwner: userId, isDraft: true };
		return await PostRepo.queryPosts({ query, limit, skip });
	}

	static async findAllPublishOfUser({ userId, limit = 50, skip = 0 }) {
		const query = { postOwner: userId, isPublished: true };
		return await PostRepo.queryPosts({ query, limit, skip });
	}

	static async searchPostsByUser({ keySearch }) {
		return await PostRepo.searchPostsByUser({ keySearch });
	}

	// Put //
	static async publishPostByOwner({ postId, postOwner }) {
		const isSuccess = await PostRepo.publishPostByOwner({
			postId,
			postOwner,
		});
		if (!isSuccess) {
			throw new InternalServerError(`Publish post fail`);
		}
		return isSuccess;
	}

	static async unpublishPostByOwner({ postId, postOwner }) {
		const isSuccess = await PostRepo.unpublishPostByOwner({
			postId,
			postOwner,
		});
		if (!isSuccess) {
			throw new InternalServerError(`Unpublish post fail`);
		}
		return isSuccess;
	}
}

// define base post class
class Post {
	constructor({
		title,
		media,
		content,
		price,
		postOwner,
		topic,
		attributes,
	}) {
		this.title = title;
		this.media = media;
		this.content = content;
		this.price = price;
		this.postOwner = postOwner;
		this.topic = topic;
		this.attributes = attributes;
	}

	async createPost(postId) {
		return await postModel.create({ ...this, _id: postId });
	}
}

// Define sub-class for difference post types: Movie
class Movie extends Post {
	async createPost() {
		const newMovie = await movieModel.create({
			...this.attributes,
			postOwner: this.postOwner,
		});
		if (!newMovie) {
			throw new InternalServerError("Can not create new Movie post");
		}

		const newPost = await super.createPost(newMovie._id);
		if (!newPost) {
			throw new InternalServerError("Can not create new Post");
		}

		return newPost;
	}
}

// Define sub-class for difference post types: Music
class Music extends Post {
	async createPost() {
		const newMusic = await musicModel.create({
			...this.attributes,
			postOwner: this.postOwner,
		});
		if (!newMusic) {
			throw new InternalServerError("Can not create new Music post");
		}

		const newPost = await super.createPost(newMusic._id);
		if (!newPost) {
			throw new InternalServerError("Can not create new Post");
		}

		return newPost;
	}
}

// Define sub-class for difference post types: Tech
class Tech extends Post {
	async createPost() {
		const newTech = await techModel.create({
			...this.attributes,
			postOwner: this.postOwner,
		});
		if (!newTech) {
			throw new InternalServerError("Can not create new Tech post");
		}

		const newPost = await super.createPost(newTech._id);
		if (!newPost) {
			throw new InternalServerError("Can not create new Post");
		}

		return newPost;
	}
}

PostFactory.registerPostTopic("Music", Music);
PostFactory.registerPostTopic("Movie", Movie);
PostFactory.registerPostTopic("Tech", Tech);
