import "./tailwind_output.css";
//theme
import "primereact/resources/themes/lara-dark-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { Routes, Route } from "react-router-dom";
import { AdminDashboard } from "./components/AdminDashboard";
import { Root } from "./components/Root";
import { Orders } from "./components/Orders";
import { Order } from "./components/Order";
import { ShoppingCardPage } from "./components/ShoppingCardPage";
import { CheckUserPrivilege } from "./components/CheckUserPrivilege.js";
import { PageNotFound } from "./components/PageNotFound";
import { DownloadCenter } from "./components/DownloadCenter";
import { Writing } from "./components/Writing";
import { Writings } from "./components/Writings";
import { AboutUs } from "./components/AboutUs.jsx";
import { ContactUs } from "./components/ContactUs";
import { NewSupportMessage } from "./components/NewSupportMessage";
import { SupportMessage } from "./components/SupportMessage";
import { FullScreenImageSlider } from "./components/FullScreenImageSlider";
import { MainHeader } from "./components/MainHeader";
import { NavBar } from "./components/NavBar";
import { Login } from "./components/Login";
import { Product } from "./components/Product";
import { User } from "./components/User";
import { Products } from "./components/Products";
import { Register } from "./components/Register";
import { MainFooter } from "./components/MainFooter";
import { FreeFlowReact, context } from "freeflow-react";
import { useContext, useEffect } from "react";
export default function () {
	var { set_state, profiles, profiles_seed } = useContext(context);
	useEffect(() => {
		set_state((prev) => ({
			...prev,
			profiles_seed: [
				...prev.profiles_seed,
				{
					user_id: -1,
					jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjotMSwiZXhwIjoxNjk0Mjc2MzkxLCJpYXQiOjE2OTM2NzE1OTB9.zpH0ONCZb47fZd7jXwGlYZ7KeswQ7vGqvc11Is28oH0",
					is_active: true,
				},
			],
		}));
	}, []);

	return (
		<>
			<MainHeader />
			<NavBar />
			<div style={{ minHeight: "calc(100vh - 15rem)", width: "100vw" }}>
				<Routes>
					<Route
						path="*"
						element={<PageNotFound />}
					/>
					<Route
						path="/download-center"
						element={
							<div className="mx-1">
								<DownloadCenter />
							</div>
						}
					/>
					<Route
						path="/admin-dashboard/*"
						element={
							<CheckUserPrivilege allowed_users={[-1]}>
								<AdminDashboard />
							</CheckUserPrivilege>
						}
					/>
					{/* 	<Route
    path="/users/:username/orders"
    element={<Orders />}
/>

<Route
    path="/users/:username/orders/:order_id"
    element={<Order />}
/>
<Route
    path="/users/:username/shopping-card"
    element={<ShoppingCardPage />}
/>

<Route
    path="/about-us"
    element={<AboutUs />}
/>
<Route
    path="/login"
    element={<Login />}
/>

<Route
    path="/products/:product_id"
    element={<Product />}
/>
<Route
    path="/users/:username"
    element={<User />}
/>

<Route
    path="/products"
    element={<Products />}
/>
<Route
    path="/register"
    element={<Register />}
/>
<Route
    path="/"
    element={<Root />}
/>
<Route
    path="/writings/:writing_id"
    element={<Writing />}
/>
<Route
    path="/writings"
    element={<Writings />}
/>
<Route
    path="/contact-us"
    element={<ContactUs />}
/>
<Route
    path="/new-support-message"
    element={<NewSupportMessage />}
/>
<Route
    path="/products/:product_id/images"
    element={<FullScreenImageSlider />}
/>
<Route
    path="/support_messages/:support_message_id"
    element={<SupportMessage />}
/> */}
				</Routes>
			</div>
			<MainFooter />
		</>
	);
}
