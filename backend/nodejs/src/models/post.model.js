import mongoose from "mongoose";
import slugify from "slugify";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Post";
const COLLECTION_NAME = "Posts";

const postSchema = new Schema(
	{
		title: { type: String, required: true },
		media: String,
		content: { type: String, required: true },
		slug: String,
		price: { type: Number, default: 0 },
		postOwner: { type: Schema.Types.ObjectId, ref: "User" },
		topic: {
			type: String,
			required: true,
			enum: ["Movie", "Music", "Tech", "Edu"],
		},
		attributes: { type: Schema.Types.Mixed, required: true },

		satisfied: { type: Number, default: 0 },
		unsatisfied: { type: Number, default: 0 },
		share: { type: Number, default: 0 },

		isDraft: { type: Boolean, default: true, index: true, select: false },
		isPublished: {
			type: Boolean,
			default: false,
			index: true,
			select: false,
		},
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

// Create index
postSchema.index({ title: "text", content: "text" });

// Post middleware: runs before .save(), .create(), ....
postSchema.pre("save", function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

const movieSchema = new Schema(
	{
		movieName: { type: String, required: true },
		director: { type: String, required: true },
		postOwner: { type: Schema.Types.ObjectId, ref: "User" },
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
		postOwner: { type: Schema.Types.ObjectId, ref: "User" },
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
		postOwner: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{
		collection: "Technologies",
		timestamps: true,
	}
);

// const eduSchema = new Schema(
// 	{
// 		subject: { type: String, required: true },
// 		techer: { type: String, required: true },
// 	},
// 	{
// 		collection: "Educations",
// 		timestamps: true,
// 	}
// );

export const postModel = model(DOCUMENT_NAME, postSchema),
	movieModel = model("Movie", movieSchema),
	musicModel = model("Music", musicSchema),
	techModel = model("Tech", techSchema);
