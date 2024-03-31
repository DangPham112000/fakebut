import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hihi");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  let collection = await db.collection("accounts");
  let results = await collection.find({ email, password }).toArray();
  if (results.length) {
    res.send({ auth: true });
  } else {
    return res.send({ auth: false });
  }
});

export default router;
