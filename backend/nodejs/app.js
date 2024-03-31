import "./loadEnvironment.js";
import express from "express";
import cors from "cors";
import login from "./routes/login.js";
import home from "./routes/home.js";

const app = express();

app.use(cors());
app.use(express.json());
// Global error handling
app.use((err, _req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/login", login);
app.use("/", home);

app.listen(+process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
