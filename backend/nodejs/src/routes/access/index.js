import express from "express";
import accessController from "../../controllers/access.controller.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { authentication } from "../../auth/authUtils.js";

const router = express.Router();

// sign up
router.post("/user/signup", asyncHandler(accessController.signup));
// log in
router.post("/user/login", asyncHandler(accessController.login));

// authentication
router.use(asyncHandler(authentication));
// log out
router.post("/user/logout", asyncHandler(accessController.logout));
router.post(
	"/user/handleRefreshToken",
	asyncHandler(accessController.handleRefreshToken)
);

export default router;
