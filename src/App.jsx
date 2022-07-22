import React, { useEffect, useState } from "react";
import "./App.css";
import "./output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiTestPage from "./components/api_tests/comp.jsx";
import AdminDashboard from "./components/admin_dashboard/comp.jsx";
import ChangeDataModal from "./components/change_data_modal/comp.jsx";
import CompanyInfo from "./components/company-info/comp.jsx";
import Login from "./components/login/comp.jsx";
import MainHeader from "./components/main_header/comp.jsx";
import NewSupportTicket from "./components/new_support_ticket/comp.jsx";
import Product from "./components/product/comp.jsx";
import Products from "./components/products/comp.jsx";
import Register from "./components/register/comp.jsx";
import Root from "./components/root/comp.jsx";
import SupportTicket from "./components/support_ticket/comp.jsx";
import SupprotTickets from "./components/support_tickets/comp.jsx";
import MainFooter from "./components/main_footer/comp.jsx";
import UpdateCompanyData from "./components/admin_dashboard/update_company_data/comp.jsx";
import context from "./global_context";
import NewProduct from "./components/new-product/comp";
import User from "./components/user/comp.jsx";
import NavBar from "./components/nav_bar/comp";
function App() {
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
          <Route
            path="/new-support-ticket"
            element={<NewSupportTicket />}
          ></Route>
          <Route
            path="/admin-dashboard/update_company_data"
            element={<UpdateCompanyData />}
          />

          <Route path="/product/:product_id" element={<Product />}></Route>
          <Route path="/user/:username" element={<User />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/new-product" element={<NewProduct />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Root />}></Route>
          <Route
            path="/support-ticket/:support_ticket_id"
            element={<SupportTicket />}
          ></Route>
          <Route path="/support-tickets" element={<SupprotTickets />}></Route>
        </Routes>
        <MainFooter />
      </BrowserRouter>
    </context.Provider>
  );
}

export default App;
