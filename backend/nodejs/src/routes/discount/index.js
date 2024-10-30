import express from "express";
import { authenticationV2 } from "../../auth/authUtils.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import discountController from "../../controllers/discount.controller.js";

const router = express.Router();

router.post("/amount", asyncHandler(discountController.getDiscountAmount));
router.get(
	"/list-posts",
	asyncHandler(discountController.getAllPostsAvailForDiscountCode)
);

router.use(authenticationV2);

router.post("", asyncHandler(discountController.createDiscountCode));
router.get("", asyncHandler(discountController.getAllDiscountCodesOfCreator));

export default router;
