import "./loadEnvironment.js";
import express from "express";
import cors from "cors";
import login from "./routes/login.js";
import home from "./routes/home.js";
import register from "./routes/register.js";
import session from "express-session";
import redisStore from "./db/redis.js";
import error from "./middleware/error.js";
import authen from "./routes/authen.js";
import logout from "./routes/logout.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: redisStore,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 },
  })
);
// Global error handling
app.use(error);

app.use("/login", login);
app.use("/authen", authen);
app.use("/logout", logout);
app.use("/register", register);
app.use("/", home);

app.listen(+process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
