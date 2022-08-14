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
	Users,
	Modal,
} from "./components";
import ReviewsPage from "./components/product/reviews_page";
import {AppContext} from "./AppContext.js"
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
	var [AppContextState,setAppContextState] = useState({
		is_modal_visible : false,
		modal_content : (<></>)
	})
	return (
		<AppContext.Provider value={{AppContextState,setAppContextState}}>
			<BrowserRouter>
				<Modal is_visible={AppContextState.is_modal_visible}>{AppContextState.modal_content}</Modal>
				<MainHeader />
				<NavBar />
				<Routes>
					<Route path="/api_test_page" element={<ApiTestPage />} />
					<Route path="/admin-dashboard" element={<AdminDashboard />} />
					<Route path="/company-info" element={<CompanyInfo />} />
					<Route path="/login" element={<Login />} />
					<Route path="/new-support-ticket" element={<NewSupportTicket />} />
					<Route
						path="/admin-dashboard/update_company_data"
						element={<UpdateCompanyData />}
					/>
					<Route exact path="/products/:product_id" element={<Product />} />
					<Route exact path="/products/:product_id/reviews" element={<ReviewsPage />} />
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
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;
