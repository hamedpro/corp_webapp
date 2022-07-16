import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
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

function App() {
  return (
    <BrowserRouter>
      <MainHeader />
      <Routes>
        <Route path="/api_test_page" element={<ApiTestPage />}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
        <Route path="/company-info" element={<CompanyInfo />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/new-support-ticket"
          element={<NewSupportTicket />}
        ></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/Root" element={<Root />}></Route>
        <Route path="/support-ticket" element={<SupportTicket />}></Route>
        <Route path="/support-tickets" element={<SupprotTickets />}></Route>
      </Routes>
      <MainFooter />
    </BrowserRouter>
  );
}

export default App;
