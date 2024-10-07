import app from "./src/app.js";
import configMongodb from "./src/configs/config.mongodb.js";

const {app: {port}} = configMongodb;

const server = app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});

// process.on('SIGINT', () => {
//     server.close(() => console.log(`Exit server express`))
// })