import express from "express";
import { authentication } from "../../auth/authUtils.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import checkoutController from "../../controllers/checkout.controller.js";

const router = express.Router();

router.use(asyncHandler(authentication));

router.post("/review", asyncHandler(checkoutController.checkoutReview));
router.post("/finish", asyncHandler(checkoutController.finishCheckout));

export default router;
