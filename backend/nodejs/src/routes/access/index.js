import e from "express";
import accessController from "../../controllers/access.controller.js";
import { asyncHandler } from "../../auth/checkAuth.js";

const router = e.Router();

// sign up
router.post("/user/signup", asyncHandler(accessController.signup));

export default router;
