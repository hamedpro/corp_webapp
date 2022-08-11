import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import "./output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { customAjax } from "../src/custom_ajax.js";
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
	Terms,
	FirstSetup,
} from "./components";
import ReviewsPage from "./components/product/reviews_page";
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
				<Route exact path="/products/:product_id/reviews" element={<ReviewsPage />}></Route>
				<Route exact path="/users/:username" element={<User />}></Route>
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
				<Route exact path="/blog-posts/:blog_id" element={<Blog />} />
				<Route exact path="/blog-posts" element={<Blogs />} />
				<Route path="/new-blog-post" element={<NewBlog />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/first-setup" element={<FirstSetup />} />
			</Routes>
			<MainFooter />
		</BrowserRouter>
	);
}

export default App;
