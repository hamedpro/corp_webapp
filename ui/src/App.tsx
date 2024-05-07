import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import { Home } from "./Home";
import { NewFile } from "./NewFile";
import { Settings } from "./Settings";
import { Downloads } from "./Downloads";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={<Home />}
					path="/"
				/>
				<Route
					element={<Settings />}
					path="/settings/*"
				/>
				<Route
					element={<Downloads />}
					path="/downloads"
				/>
			</Routes>
		</BrowserRouter>
	);
}
