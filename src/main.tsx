import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FreeFlowReact } from "freeflow-react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<FreeFlowReact>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</FreeFlowReact>
);
