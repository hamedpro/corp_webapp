import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Product } from "./base_components/Product";
import { Index } from "./base_components/Index";
import { Category } from "./base_components/Category";
import "./js/theme.js";
/* import "./scss/libs.scss";
import "./scss/theme.scss"; */
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={<Product />}
					path="/product"
				/>
				<Route
					element={<Index />}
					path="/"
				/>
				<Route
					element={<Category />}
					path="/category"
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
