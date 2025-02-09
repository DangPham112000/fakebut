import express from "express";
import { authentication } from "../../auth/authUtils.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import discountController from "../../controllers/discount.controller.js";

const router = express.Router();

router.get(
	"/list-post",
	asyncHandler(discountController.getAllPostsAvailForDiscountCode)
);
router.post("/amount", asyncHandler(discountController.getDiscountAmount));

router.use(asyncHandler(authentication));

router.get("", asyncHandler(discountController.getAllDiscountCodesOfCreator));
router.post("", asyncHandler(discountController.createDiscountCode));

export default router;
