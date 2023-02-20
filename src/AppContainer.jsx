import React from "react";
import "./App.css";
import "./output.css";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
export function AppContainer() {
	return (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
}
