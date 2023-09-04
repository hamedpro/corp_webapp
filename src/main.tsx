import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FreeFlowReact } from "freeflow-react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<FreeFlowReact
		ws_endpoint={import.meta.env.VITE_WS_ENDPOINT}
		rest_endpoint={import.meta.env.VITE_REST_ENDPOINT}
	>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</FreeFlowReact>
);
