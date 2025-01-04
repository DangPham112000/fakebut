import "./helpers/loadEnvironment.js";
import express from "express";
import cors from "cors";
import session from "express-session";
import redisStore from "./dbs/redis.js";
import error from "../middleware/error.js";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import router from "./routes/index.js";

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
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

// init database
import instanceMongodb from "./dbs/init.mongodb.js";
import { checkOverload } from "./helpers/check.connect.js";
// checkOverload();

// init router
app.use(router);

// handling errors

// wrong route => throw error 404 not found
app.use((req, res, next) => {
	const err = new Error("NOT FOUND");
	err.statusCode = 404;
	next(err);
});

// catch all error
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	return res.status(statusCode).json({
		status: "error",
		code: statusCode,
		stack: err.stack,
		message: err.message || "Internal Server Error",
	});
});

export default app;
