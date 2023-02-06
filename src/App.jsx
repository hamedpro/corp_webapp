import React, { useEffect, useState } from "react";
import "./App.css";
import "./output.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { customAjax } from "../src/custom_ajax.js";
import { gen_link_to_file } from "./common";
import {
	ApiTestPage,
	AdminDashboard,
	Login,
	MainHeader,
	Product,
	Products,
	Register,
	Root,
	MainFooter,
	User,
	NavBar,
} from "./components";
import Orders from "./components/orders/comp";
import Order from "./components/order/comp";
import { ShoppingCardPage } from "./components";
import { PG } from "./components/pg/pg";
import { CheckUserPrivilege } from "./components/CheckUserPrivilege/comp";
import { PageNotFound } from "./components/PageNotFound/comp";
import { multi_lang_helper as ml } from "./common";
import { DownloadCenter } from "./components/DownloadCenter";
import { Writing } from "./components/Writing";
import { Writings } from "./components/Writings";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import { ContactUs } from "./components/ContactUs";
import { NewSupportMessage } from "./components/NewSupportMessage";
import { SupportMessage } from "./components/SupportMessage";
import { get_collection } from "../api/client";
function App() {
	window.ml = ml;
	window.customAjax = customAjax;
	async function get_data() {
		var company_info =
			(
				await get_collection({
					collection_name: "paired_data",
					filters: {
						key: "company_info",
					},
				})
			).data[0] || {};
		if (Object.keys(company_info).includes("favicon_file_id")) {
			document.getElementById("favicon").href = company_info.favicon_file_id;
		}

		if (Object.keys(company_info).includes("name")) {
			document.title = company_info.name;
		}
	}
	useEffect(() => {
		get_data();
	}, []);
	if (company_info === undefined) return <h1>loading company info ...</h1>;
	return (
		<div className="h-full w-full overflow-x-hidden overflow-y-hidden">
			<div className={["relative mx-auto w-full h-full overflow-x-hidden fa"].join(" ")}>
				<MainHeader />
				<NavBar />
				<div id="x-container">
					<Routes>
						<Route path="*" element={<PageNotFound />} />
						<Route
							path="/api_test_page"
							element={
								<CheckUserPrivilege level="admin">
									<ApiTestPage />
								</CheckUserPrivilege>
							}
						/>
						<Route
							path="/pg"
							element={
								<CheckUserPrivilege level="admin">
									<PG />
								</CheckUserPrivilege>
							}
						/>
						<Route
							path="/download-center"
							element={
								<div className="mx-1">
									<DownloadCenter />
								</div>
							}
						/>
						<Route exact path="/users/:username/orders" element={<Orders />} />
						<Route exact path="/users/:username/orders/:order_id" element={<Order />} />
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
						<Route path="/new-support-message" element={<NewSupportMessage />} />
						<Route
							path="/support_messages/:support_message_id"
							element={<SupportMessage />}
						/>
					</Routes>
				</div>
				<MainFooter />
			</div>
		</div>
	);
}

export default App;
