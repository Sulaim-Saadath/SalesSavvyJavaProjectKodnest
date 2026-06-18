import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import CustomerHome from "./CustomerHome";
import CartPage from "./CartPage";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/customerhome" element={<CustomerHome />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default AppRoutes;