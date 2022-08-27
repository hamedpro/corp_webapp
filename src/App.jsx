import React, { useState } from "react";
import "./App.css";
import "./output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { customAjax } from "../src/custom_ajax.js";
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
import { AppContext } from "./AppContext.js";
import { PG } from "./components/pg/pg";
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
	var [AppContextState, setAppContextState] = useState({
		language: "fa", // possible values right now = "fa" & "en"
	});
	return (
		<AppContext.Provider value={{ AppContextState, setAppContextState }}>
			<BrowserRouter>
				<div className="absolute w-full h-full overflow-x-hidden">
					<MainHeader />
					<NavBar />
					<Routes>
						<Route path="/api_test_page" element={<ApiTestPage />} />
						<Route path="/pg" element={<PG />} />
						<Route
							path="/products/:product_id/new-product-review"
							element={<NewProductReview />}
						/>
						<Route exact path="/users/:username/orders" element={<Orders />} />
						<Route exact path="/users/:username/orders/:order_id" element={<Order />} />
						<Route
							exact
							path="/users/:username/shopping-card"
							element={<ShoppingCardPage />}
						/>
						<Route path="/admin-dashboard" element={<AdminDashboard />} />
						<Route path="/company-info" element={<CompanyInfo />} />
						<Route path="/login" element={<Login />} />
						<Route path="/new-support-ticket" element={<NewSupportTicket />} />
						<Route
							path="/admin-dashboard/update-company-data"
							element={<UpdateCompanyData />}
						/>
						<Route exact path="/products/:product_id" element={<Product />} />
						<Route
							exact
							path="/products/:product_id/reviews"
							element={<ReviewsPage />}
						/>
						<Route exact path="/users/:username" element={<User />} />
						<Route exact path="/users" element={<Users />} />
						<Route exact path="/products" element={<Products />} />
						<Route path="/new-product" element={<NewProduct />} />
						<Route path="/register" element={<Register />} />
						<Route path="/" element={<Root />} />
						<Route
							path="/support-tickets/:support_ticket_id"
							element={<SupportTicket />}
							exact
						></Route>
						<Route exact path="/support-tickets" element={<SupprotTickets />} />
						<Route exact path="/blog-posts/:blog_id" element={<Blog />} />
						<Route exact path="/blog-posts" element={<Blogs />} />
						<Route path="/new-blog-post" element={<NewBlog />} />
						<Route path="/terms" element={<Terms />} />
						<Route path="/first-setup" element={<FirstSetup />} />
					</Routes>
					<MainFooter />
				</div>
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;
