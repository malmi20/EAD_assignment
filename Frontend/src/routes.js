import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import ProductManager from "./pages/ProductManager"
import OrderManagement from "./pages/OrderManagement.js"
import InventoryManagement from "./pages/InventoryManagement"
import VendorManagement from "./pages/VendorManagement.js"
import Home from "./pages/Home.js";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />

        {/* Home Elements */}
        <Route path={"/auth"} element={<Auth />} />
        <Route path={"/productManager"} element={<ProductManager />} />
        <Route path={"/OrderManagement"} element={<OrderManagement />} />
        <Route path={"/InventoryManagement"} element={<InventoryManagement />} />
        <Route path={"/VendorManagement"} element={<VendorManagement />} />
      </Route>
      <Route path="*" element={<Auth />} />
    </Routes>
  );
};

export default AppRoutes;
