import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import CustomerHome from "./CustomerHome";
import CartPage from "./CartPage";
import OrdersPage from "./OrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/customerhome" element={<CustomerHome />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;