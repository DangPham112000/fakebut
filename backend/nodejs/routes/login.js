import express from "express";
import db from "../db/mongo.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hihi login");
});

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  let collection = await db.collection("accounts");
  let results = await collection.find({ email, password }).toArray();
  if (results.length) {
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.user = req.body.email;
      console.log("Set new session: ", req.session.user);
      req.session.save((err) => {
        if (err) return next(err);
        res.send({ login: true });
      });
    });
  } else {
    return res.send({ login: false });
  }
});

export default router;
