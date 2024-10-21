import express from "express";
import { authentication } from "../../auth/authUtils.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import postController from "../../controllers/post.controller.js";

const router = express.Router();

router.use(authentication);
router.post("", asyncHandler(postController.createPost));

export default router;
