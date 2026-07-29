import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/customer/Home";
import Collection from "./components/Collection";
import WesternCollection from "./components/westren";
import CategoryPage from "./components/CategoryPage";
import ProductDetail from "./components/ProductDetail";
import Wishlist from "./pages/customer/Wishlist";
import Cart from "./pages/customer/Cart";
import Address from "./pages/customer/Address";
import Payment from "./pages/customer/Payment";
import Summary from "./pages/customer/Summary";
import OrderConfirmed from "./pages/customer/OrderConfirmed";
import AccountLayout from "./pages/customer/AccountLayout";
import AccountPlaceholder from "./pages/customer/AccountPlaceholder";
import { WishlistProvider } from "./context/WishlistContext";

export default function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        {/* <Cards /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/western" element={<WesternCollection />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<h1 style={{ padding: "120px 20px", textAlign: "center" }}>Shop Page - Coming Soon!</h1>} />
          <Route path="/address" element={<Address />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />


          <Route path="/account" element={<AccountLayout />}>
            <Route path="dashboard" element={<AccountPlaceholder />} />
            <Route path="profile" element={<AccountPlaceholder />} />
            <Route path="orders" element={<AccountPlaceholder />} />
            <Route path="addresses" element={<AccountPlaceholder />} />
            <Route path="payment-methods" element={<AccountPlaceholder />} />
            <Route path="coupons" element={<AccountPlaceholder />} />
            <Route path="notifications" element={<AccountPlaceholder />} />
            <Route path="returns" element={<AccountPlaceholder />} />
            <Route path="reviews" element={<AccountPlaceholder />} />
            <Route path="recently-viewed" element={<AccountPlaceholder />} />
            <Route path="support" element={<AccountPlaceholder />} />
            <Route path="faqs" element={<AccountPlaceholder />} />
            <Route path="settings" element={<AccountPlaceholder />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </WishlistProvider>
  );
}
