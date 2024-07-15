import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import { Home } from "./Home";
import { NewFile } from "./NewFile";
import { Settings } from "./Settings";
import { Downloads } from "./Downloads";
import { AboutUs } from "./AboutUs";
import { ContactUs } from "./ContactUs";
import { Products } from "./Products";
import { Product } from "./Product";

export function App() {
	return (
		<BrowserRouter>
			<Header />
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
				<Route
					element={<Products />}
					path="/products"
				/>
				<Route
					element={<Product />}
					path="/products/:product_id"
				/>
				<Route
					element={<AboutUs />}
					path="/about-us"
				/>
				<Route
					element={<ContactUs />}
					path="/contact-us"
				/>
			</Routes>
		</BrowserRouter>
	);
}
