import express from "express";
import db from "../db/mongo.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi register");
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const accountCLT = await db.collection("accounts");
  const results = await accountCLT.find({ email }).toArray();

  if (results.length) {
    return res.send({ status: false, code: 1 });
  } else {
    await accountCLT.insertOne({ name, email, password });
    return res.send({ status: true });
  }
});

export default router;
