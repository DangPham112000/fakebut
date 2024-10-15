import express from "express";
import accessController from "../../controllers/access.controller.js";
import { asyncHandler } from "../../auth/checkAuth.js";

const router = express.Router();

// sign up
router.post("/user/signup", asyncHandler(accessController.signup));
router.post("/user/login", asyncHandler(accessController.login));

export default router;
