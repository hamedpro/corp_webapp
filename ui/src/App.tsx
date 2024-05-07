import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import { Home } from "./Home";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={<Home />}
					path="/"
				/>
			</Routes>
		</BrowserRouter>
	);
}
