import express from "express";
import { authentication } from "../../auth/authUtils.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import cartController from "../../controllers/cart.controller.js";

const router = express.Router();

router.use(asyncHandler(authentication));

router.get("", asyncHandler(cartController.getUserCart));
router.post("/add", asyncHandler(cartController.addToCart));
router.post("/remove", asyncHandler(cartController.removeFromCart));

export default router;
