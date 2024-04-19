import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Cart } from "./base_components/Cart";
import { Product } from "./base_components/Product";
import { Index } from "./base_components/Index";
import { Checkout } from "./base_components/Checkout";
import { Category } from "./base_components/Category";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={<Cart />}
					path="/cart"
				/>
				<Route
					element={<Product />}
					path="/product"
				/>
				<Route
					element={<Index />}
					path="/"
				/>
				<Route
					element={<Checkout />}
					path="/checkout"
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
