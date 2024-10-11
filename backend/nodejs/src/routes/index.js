import express from "express";
import access from "./access/index.js";

const router = express.Router();

router.use("/v1/api", access);

// router.get('/test', (req, res) => {
//     const compressedStr = "super long string";
//     return res.status(201).json({
//         mess: "hello world",
//         metadata: compressedStr.repeat(1000)
//     })
// })

export default router;
