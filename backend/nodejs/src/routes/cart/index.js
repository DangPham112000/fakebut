import express from "express";
import { authenticationV2 } from "../../auth/authUtils.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import cartController from "../../controllers/cart.controller.js";

const router = express.Router();

router.use(authenticationV2);

router.get("", asyncHandler(cartController.getUserCart));
router.post("/add", asyncHandler(cartController.addToCart));
router.post("/remove", asyncHandler(cartController.removeFromCart));

export default router;
