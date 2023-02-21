import React, { useEffect } from "react";
import "./App.css";
import "./output.css";
import { Routes, Route } from "react-router-dom";
import { customAjax } from "../src/custom_ajax.js";
import { AdminDashboard } from "./components/AdminDashboard";
import { Root } from "./components/Root";
import { Orders } from "./components/Orders";
import {Order} from "./components/Order";
import { ShoppingCardPage } from "./components/ShoppingCardPage";
import { CheckUserPrivilege } from "./components/CheckUserPrivilege";
import { PageNotFound } from "./components/PageNotFound";
import { multi_lang_helper as ml } from "./common";
import { DownloadCenter } from "./components/DownloadCenter";
import { Writing } from "./components/Writing";
import { Writings } from "./components/Writings";
import { AboutUs } from "./components/AboutUs.jsx";
import { ContactUs } from "./components/ContactUs";
import { NewSupportMessage } from "./components/NewSupportMessage";
import { SupportMessage } from "./components/SupportMessage";
import { get_company_info } from "../api/client";
import { FullScreenImageSlider } from "./components/FullScreenImageSlider";
import { LatestChangesModal } from "./components/LatestChangesModal";
import { MainHeader } from "./components/MainHeader";
import { NavBar } from "./components/NavBar";
import { Login } from "./components/Login";
import { Product } from "./components/Product";
import { User } from "./components/User";
import { Products } from "./components/Products";
import { Register } from "./components/Register";
import { MainFooter } from "./components/MainFooter";
import { DownloadCenterItemsContextProvider } from "./components/DownloadCenterItemsContextProvider";
export function App() {
	window.ml = ml;
	window.customAjax = customAjax;
	async function get_data() {
		var company_info = await get_company_info();
		if (Object.keys(company_info).includes("favicon_file_id")) {
			var favicon_file_url = new URL(
				`/files/${company_info.favicon_file_id}`,
				vite_api_endpoint
			).href;
			document.getElementById("favicon").href = favicon_file_url;
		}
		if (Object.keys(company_info).includes("name")) {
			document.title = company_info.name;
		}
	}
	useEffect(() => {
		get_data();
	}, []);
	return (
		<>
			<LatestChangesModal />
			<DownloadCenterItemsContextProvider>
				<div className="h-full w-full overflow-x-hidden overflow-y-hidden">
					<div
						className={["relative mx-auto w-full h-full overflow-x-hidden fa"].join(
							" "
						)}
					>
						<MainHeader />
						<NavBar />
						<div id="x-container">
							<Routes>
								<Route path="*" element={<PageNotFound />} />
								<Route
									path="/download-center"
									element={
										<div className="mx-1">
											<DownloadCenter />
										</div>
									}
								/>
								<Route exact path="/users/:username/orders" element={<Orders />} />
								<Route
									exact
									path="/users/:username/orders/:order_id"
									element={<Order />}
								/>
								<Route
									exact
									path="/users/:username/shopping-card"
									element={<ShoppingCardPage />}
								/>
								<Route
									path="/admin-dashboard/*"
									element={
										<CheckUserPrivilege level="admin">
											<AdminDashboard />
										</CheckUserPrivilege>
									}
								/>
								<Route path="/about-us" element={<AboutUs />} />
								<Route path="/login" element={<Login />} />

								<Route exact path="/products/:product_id" element={<Product />} />
								<Route exact path="/users/:username" element={<User />} />

								<Route exact path="/products" element={<Products />} />
								<Route path="/register" element={<Register />} />
								<Route path="/" element={<Root />} />
								<Route path="/writings/:writing_id" element={<Writing />} />
								<Route path="/writings" element={<Writings />} />
								<Route path="/contact-us" element={<ContactUs />} />
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
								/>
							</Routes>
						</div>
						<MainFooter />
					</div>
				</div>
			</DownloadCenterItemsContextProvider>
		</>
	);
}
