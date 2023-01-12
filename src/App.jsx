import React, { useEffect, useState } from "react";
import "./App.css";
import "./output.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { customAjax } from "../src/custom_ajax.js";
import { gen_link_to_file } from "./common";
import {
	ApiTestPage,
	AdminDashboard,
	CompanyInfo,
	Login,
	MainHeader,
	Product,
	Products,
	Register,
	Root,
	MainFooter,
	NewProduct,
	User,
	NavBar,
	FirstSetup,
	NewProductReview,
} from "./components";
import ReviewsPage from "./components/product/reviews_page";
import Orders from "./components/orders/comp";
import Order from "./components/order/comp";
import { ShoppingCardPage } from "./components";
import { PG } from "./components/pg/pg";
import { CheckUserPrivilege } from "./components/CheckUserPrivilege/comp";
import { PageNotFound } from "./components/PageNotFound/comp";
import { multi_lang_helper as ml } from "./common";
import { DownloadCenter } from "./components/DownloadCenter";
import { NewWriting } from "./components/NewWriting";
import { Writing } from "./components/Writing";
function App() {
	window.ml = ml;
	window.customAjax = customAjax;
	window.api_endpoint = API_ENDPOINT;
	var nav = useNavigate();

	function load_company_info() {
		customAjax({
			params: {
				task_name: "get_company_info",
			},
		}).then(
			(data) => {
				document.title = JSON.parse(data.result).name;
				//todo dont let the app to work until there is company data and env vard and ... are there
			},
			(e) => {
				if (e.errors[0].code === 1) {
					console.log("company info is not set yet");
				} else {
					console.log(e);
				}
			}
		);
		customAjax({
			params: {
				task_name: "get_company_media",
			},
		}).then((data) => {
			if (data.result.filter((item) => item.split(".")[0] === "favicon").length !== 0) {
				document
					.getElementById("favicon")
					.setAttribute(
						"href",
						gen_link_to_file(
							"./company_info/" +
								data.result.filter((item) => item.split(".")[0] === "favicon")[0]
						)
					);
			} else {
				console.log("favicon is not uploaded yet");
			}
		});
	}

	useEffect(() => {
		customAjax({
			params: {
				task_name: "is_first_setup_done",
			},
		}).then((data) => {
			if (data.result === true) {
				load_company_info();
			} else {
				nav("/first-setup");
			}
		});
		//todo first setup system should handle both situations : first_setup is done or not
		//it should not face any issue when first setup is not done
	}, []);
	var current_lang = "fa";

	return (
		<div className="h-full w-full overflow-x-hidden overflow-y-hidden">
			<div
				className={["relative mx-auto w-full h-full overflow-x-hidden", current_lang].join(
					" "
				)}
			>
				<MainHeader />
				<NavBar />
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
					<Route path="/download-center" element={<DownloadCenter />} />
					<Route
						path="/products/:product_id/new-product-review"
						element={
							<CheckUserPrivilege level="loged_in">
								<NewProductReview />
							</CheckUserPrivilege>
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
						path="/admin-dashboard"
						element={
							<CheckUserPrivilege level="admin">
								<AdminDashboard />
							</CheckUserPrivilege>
						}
					/>
					<Route path="/company-info" element={<CompanyInfo />} />
					<Route path="/login" element={<Login />} />

					<Route exact path="/products/:product_id" element={<Product />} />
					<Route exact path="/products/:product_id/reviews" element={<ReviewsPage />} />
					<Route exact path="/users/:username" element={<User />} />

					<Route exact path="/products" element={<Products />} />
					<Route
						path="/new-product"
						element={
							<CheckUserPrivilege level={"admin"}>
								<NewProduct />
							</CheckUserPrivilege>
						}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<Root />} />
					<Route path="/writings/new" element={<NewWriting />} />
					<Route path="/writings/:writing_id" element={<Writing />} />
					<Route
						path="/first-setup"
						element={
							<FirstSetup />
							/* todo prevent other to access first setup page  */
						}
					/>
				</Routes>
				<MainFooter />
			</div>
		</div>
	);
}

export default App;
