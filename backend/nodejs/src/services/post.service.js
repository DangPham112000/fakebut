import { postModel, movieModel, musicModel } from "../models/post.model.js";
import { BadRequestError } from "../core/error.response.js";

// define factory class to create post
export class PostFactory {
	/**
	 *
	 * @param {*} topic enum ['Music', 'Movie']
	 * @param {*} payload
	 */
	static async create(topic, payload) {
		switch (topic) {
			case "Music":
				return new Music(payload).createPost();
			case "Movie":
				return new Movie(payload).createPost();
			default:
				throw new BadRequestError(`Invalid Post topic::${topic}`);
		}
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

	// create new post
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
			throw new BadRequestError("Can not create new Movie");
		}

		const newPost = await super.createPost(newMovie._id);
		if (!newPost) {
			throw new BadRequestError("Can not create new Post");
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
			throw new BadRequestError("Can not create new Music");
		}

		const newPost = await super.createPost(newMusic._id);
		if (!newPost) {
			throw new BadRequestError("Can not create new Post");
		}

		return newPost;
	}
}
