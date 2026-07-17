import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import Orders from "../pages/Orders";
import AdminDashboard from "../pages/admin/Dashboard";
import NotFound from "../pages/NotFound";
import Wishlist from "../pages/Wishlist";
import VendorDashboard from "../pages/vendor/Dashboard";
import VendorProducts from "../pages/vendor/Products";
import AddProduct from "../pages/vendor/AddProduct";
import EditProduct from "../pages/vendor/EditProduct";
import AdminUsers from "../pages/admin/Users";
import AdminVendors from "../pages/admin/Vendors";
import AdminProducts from "../pages/admin/Products";
import AdminOrders from "../pages/admin/Orders";
import VendorOrders from "../pages/vendor/Orders";
import MyOrders from "../pages/MyOrders";






export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/vendor" element={<VendorDashboard />} />

        <Route path="/vendor/products" element={<VendorProducts />} /> 

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/vendor/products/add" element={<AddProduct />} />

        <Route path="/vendor/products/edit/:id" element={<EditProduct />} />

        <Route path="/admin/users"  element={<AdminUsers />} />

        <Route path="/admin/vendors" element={<AdminVendors />} />

        <Route path="/admin/products" element={<AdminProducts />} />

        <Route path="/admin/orders" element={<AdminOrders />} />

        <Route path="/vendor/orders" element={<VendorOrders />} />

        <Route path="/my-orders" element={<MyOrders />} />

      </Routes>
    </BrowserRouter>
  );
}