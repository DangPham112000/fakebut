import express from "express";
import { authentication } from "../../auth/authUtils.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import postController from "../../controllers/post.controller.js";

const router = express.Router();

router.get(
	"/search/:keySearch",
	asyncHandler(postController.searchPostsByUser)
);
router.get("", asyncHandler(postController.findAllPosts));
router.get("/:postId", asyncHandler(postController.findPost));

router.use(asyncHandler(authentication));

// POST
router.post("", asyncHandler(postController.createPost));
router.patch("/:postId", asyncHandler(postController.updatePost));
router.post("/publish/:id", asyncHandler(postController.publishPostByOwner));
router.post(
	"/unpublish/:id",
	asyncHandler(postController.unpublishPostByOwner)
);

// QUERY //
router.get("/drafts/all", asyncHandler(postController.findAllDraftsOfUser));
router.get("/published/all", asyncHandler(postController.findAllPublishOfUser));

export default router;
