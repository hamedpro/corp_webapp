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
import { FreeFlowReact, context, context_value } from "freeflow-react";
import { useContext, useEffect } from "react";
import { calc_file_url } from "freeflow-core/dist/utils";
export default function () {
	var { set_state, profiles, profiles_seed, cache, rest_endpoint } = useContext<context_value>(
		context as any
	);

	var company_info = cache.find((ci) => ci.thing.type === "company_info");

	var favicon_url;
	if (company_info?.thing.value.favicon_file_id) {
		favicon_url = calc_file_url(
			profiles_seed,
			rest_endpoint,
			company_info?.thing.value.favicon_file_id
		);
	}

	return (
		<>
			{favicon_url && (
				<link
					rel="icon"
					href={favicon_url}
				></link>
			)}
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
					<Route
						path="/"
						element={<Root />}
					/>

					<Route
						path="/about-us"
						element={<AboutUs />}
					/>

					<Route
						path="/contact-us"
						element={<ContactUs />}
					/>
					<Route
						path="/login"
						element={<Login />}
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
    path="/writings/:writing_id"
    element={<Writing />}
/>
<Route
    path="/writings"
    element={<Writings />}
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
