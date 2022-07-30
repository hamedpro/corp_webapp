import React, { useEffect, useState } from "react";
import "./App.css";
import "./output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import context from "./global_context";
import { customAjax } from "../common-codes/custom_api_system/dev/custom_ajax";
import {
	ApiTestPage,
	AdminDashboard,
	ChangeDataModal,
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
} from "./components";

function App() {
	if (window.localStorage.getItem("username") !== null) {
		customAjax({
			params: {
				task_name: "is_username_available",
				username: window.localStorage.getItem("username"),
			},
		}).then((data) => {
			if (data.result) {
				window.localStorage.removeItem("username");
			}
		});
	}

	return (
		<context.Provider value={{}}>
			<BrowserRouter>
				<MainHeader />
				<NavBar />
				<Routes>
					<Route path="/api_test_page" element={<ApiTestPage />}></Route>
					<Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
					<Route path="/company-info" element={<CompanyInfo />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/new-support-ticket" element={<NewSupportTicket />}></Route>
					<Route
						path="/admin-dashboard/update_company_data"
						element={<UpdateCompanyData />}
					/>
					<Route exact path="/products/:product_id" element={<Product />}></Route>
					<Route path="/user/:username" element={<User />}></Route>
					<Route exact path="/products" element={<Products />}></Route>
					<Route path="/new-product" element={<NewProduct />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/" element={<Root />}></Route>
					<Route
						path="/support-tickets/:support_ticket_id"
						element={<SupportTicket />}
						exact
					></Route>
					<Route exact path="/support-tickets" element={<SupprotTickets />}></Route>
					<Route exact path="/blogs/:blog_id" element={<Blog />} />
					<Route exact path="/blogs" element={<Blogs />} />
					<Route path="/new-blog" element={<NewBlog />} />
				</Routes>
				<MainFooter />
			</BrowserRouter>
		</context.Provider>
	);
}

export default App;
