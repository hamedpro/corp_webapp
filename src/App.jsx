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
	NewSupportTicket,
	Product,
	Products,
	Register,
	Root,
	SupportTicket,
	SupprotTickets,
	MainFooter,
	UpdateCompanyData,
	NewProduct,
	User,
	NavBar,
	Blog,
	Blogs,
	NewBlog,
	Terms,
	FirstSetup,
	Users,
	NewProductReview,
} from "./components";
import ReviewsPage from "./components/product/reviews_page";
import Orders from "./components/orders/comp";
import Order from "./components/order/comp";
import { ShoppingCardPage } from "./components";
import { PG } from "./components/pg/pg";
import { CheckUserPrivilege } from "./components/CheckUserPrivilege/comp";
import { ProductCategories } from "./components/product_categories/comp";
import { UserSupportTickets } from "./components/user_support_tickets/comp";
import { Loading } from "./components/loading/comp";
function App() {
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
			(error) => {}
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
				window.localStorage.setItem("username", "root");
				nav("/first-setup");
			}
		});
		//todo first setup system should handle both situations : first_setup is done or not
		//it should not face any issue when first setup is not done
	}, []);

	if (window.localStorage.getItem("language") === null) {
		window.localStorage.setItem("language", "fa");
		//todo get a default lang from users when initialization of app and use it here
	}

	return (
		<>
			<div className="absolute w-full h-full overflow-x-hidden">
				<MainHeader />
				<NavBar />
				<Routes>
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
						path="/products/:product_id/new-product-review"
						element={
							<CheckUserPrivilege level="loged_in">
								<NewProductReview />
							</CheckUserPrivilege>
						}
					/>
					<Route exact path="/users/:username/orders" element={<Orders />} />
					<Route exact path="/users/:username/orders/:order_id" element={<Order />} />
					<Route exact path="/products/categories" element={<ProductCategories />} />
					<Route
						exact
						path="/users/:username/support-tickets"
						element={<UserSupportTickets />}
					/>
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
					<Route
						path="/new-support-ticket"
						element={
							<CheckUserPrivilege level="loged_in">
								<NewSupportTicket />
							</CheckUserPrivilege>
						}
					/>
					<Route
						path="/admin-dashboard/update-company-data"
						element={
							<CheckUserPrivilege level="admin">
								<UpdateCompanyData />
							</CheckUserPrivilege>
						}
					/>
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
					<Route
						path="/support-tickets/:support_ticket_id"
						element={<SupportTicket />}
						exact
					></Route>
					<Route
						exact
						path="/support-tickets"
						element={
							<CheckUserPrivilege level="admin">
								<SupprotTickets />
							</CheckUserPrivilege>
						}
					/>
					<Route exact path="/blog-posts/:blog_id" element={<Blog />} />
					<Route exact path="/blog-posts" element={<Blogs />} />
					<Route
						path="/new-blog-post"
						element={
							<CheckUserPrivilege level="admin">
								<NewBlog />
							</CheckUserPrivilege>
						}
					/>
					<Route path="/terms" element={<Terms />} />
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
		</>
	);
}

export default App;
