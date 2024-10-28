import express from "express";
import { authentication, authenticationV2 } from "../../auth/authUtils.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import postController from "../../controllers/post.controller.js";

const router = express.Router();

router.use(authenticationV2);

// POST
router.post("", asyncHandler(postController.createPost));
router.post("/publish/:id", asyncHandler(postController.publishPostByOwner));
router.post(
	"/unpublish/:id",
	asyncHandler(postController.unpublishPostByOwner)
);

// QUERY //
router.get("/drafts/all", asyncHandler(postController.findAllDraftsOfUser));
router.get("/published/all", asyncHandler(postController.findAllPublishOfUser));

export default router;
