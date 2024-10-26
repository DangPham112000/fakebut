import express from "express";
import { authentication, authenticationV2 } from "../../auth/authUtils.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import postController from "../../controllers/post.controller.js";

const router = express.Router();

router.use(authenticationV2);
router.post("", asyncHandler(postController.createPost));

export default router;
