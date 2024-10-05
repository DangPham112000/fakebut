import "./loadEnvironment.js";
import app from "./src/app.js";

const PORT = +process.env.PORT;

const server = app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});

// process.on('SIGINT', () => {
//     server.close(() => console.log(`Exit server express`))
// })