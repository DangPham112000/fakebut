
import express from "express";
import cors from "cors";
import login from "../routes/login.js";
import home from "../routes/home.js";
import register from "../routes/register.js";
import session from "express-session";
import redisStore from "../db/redis.js";
import error from "../middleware/error.js";
import authen from "../routes/authen.js";
import logout from "../routes/logout.js";

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

app.get("/google", async (req, res) => {
	console.log("hi");
	// const rs = await fetch(`https://google.com`);
	// const html = await rs.body.json();
	// console.log(html);

	fetch("https://www.google.com")
		.then((response) => {
			console.log(response);
			console.log(response.body);
			return response.text();
		})
		.then((data) => res.send(data))
		.catch((error) => console.error("Error:", error));
	// res.send("rs");
});

app.use("/login", login);
app.use("/authen", authen);
app.use("/logout", logout);
app.use("/register", register);
app.use("/", home);


export default app;