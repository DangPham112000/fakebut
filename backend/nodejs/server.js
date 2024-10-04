import "./loadEnvironment.js";
import app from "./src/app.js";

app.listen(+process.env.PORT, () => {
	console.log(`http://localhost:${process.env.PORT}`);
});
