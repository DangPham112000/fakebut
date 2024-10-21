import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Post";
const COLLECTION_NAME = "Posts";

const postSchema = new Schema(
	{
		title: { type: String, required: true },
		media: String,
		content: { type: String, required: true },
		price: { type: Number, default: 0 },
		owner: { type: Schema.Types.ObjectId, ref: "User" },
		topic: {
			type: String,
			required: true,
			enum: ["Movie", "Music", "Tech", "Edu"],
		},
		attributes: { type: Schema.Types.Mixed, required: true },
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

const movieSchema = new Schema(
	{
		movieName: { type: String, required: true },
		director: { type: String, required: true },
	},
	{
		collection: "Movies",
		timestamps: true,
	}
);

const musicSchema = new Schema(
	{
		musicName: { type: String, required: true },
		singer: { type: String, required: true },
	},
	{
		collection: "Musics",
		timestamps: true,
	}
);

const techSchema = new Schema(
	{
		productName: { type: String, required: true },
		inventor: { type: String, required: true },
	},
	{
		collection: "Technologies",
		timestamps: true,
	}
);

const eduSchema = new Schema(
	{
		subject: { type: String, required: true },
		techer: { type: String, required: true },
	},
	{
		collection: "Educations",
		timestamps: true,
	}
);

export const postModel = model(DOCUMENT_NAME, postSchema),
	movieModel = model("Movie", movieSchema),
	musicModel = model("Music", musicSchema),
	techModel = model("Technology", techSchema),
	eduModel = model("Education", eduSchema);
