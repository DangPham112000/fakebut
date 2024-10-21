import express from "express";
import access from "./access/index.js";
import post from "./post/index.js";
import { apiKey, validatePermission } from "../auth/checkAuth.js";

const router = express.Router();

// check apiKey
router.use(apiKey);
// check permission
// router.use(validatePermission("1111"));
router.use(validatePermission("0000"));

router.use("/v1/api", access);
router.use("/v1/api/post", post);

export default router;
