import e from "express";
import accessController from "../../controllers/access.controller.js";

const router = e.Router();

// sign up
router.post("/user/signup", accessController.signup);

export default router;
