import ReactDOM from "react-dom/client";
import App from "./App";
import mockServer from "./mockServer/server";

mockServer();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
