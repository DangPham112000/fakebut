import express from "express";
import access from "./access/index.js";
import post from "./post/index.js";
import discount from "./discount/index.js";
import cart from "./cart/index.js";
import checkout from "./checkout/index.js";
import { apiKey, validatePermission } from "../auth/checkAuth.js";

const router = express.Router();

// check apiKey
router.use(apiKey);
// check permission
// router.use(validatePermission("1111"));
router.use(validatePermission("0000"));

router.use("/v1/api/post", post);
router.use("/v1/api/cart", cart);
router.use("/v1/api/discount", discount);
router.use("/v1/api/checkout", checkout);
router.use("/v1/api", access);

export default router;
