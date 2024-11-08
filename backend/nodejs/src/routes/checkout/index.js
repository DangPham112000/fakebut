import express from "express";
import { authenticationV2 } from "../../auth/authUtils.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import checkoutController from "../../controllers/checkout.controller.js";

const router = express.Router();

router.use(authenticationV2);

router.post("/review", asyncHandler(checkoutController.checkoutReview));
router.post("/finish", asyncHandler(checkoutController.finishCheckout));

export default router;
