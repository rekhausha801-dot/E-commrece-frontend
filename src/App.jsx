import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/customer/Home";
import Collection from "./components/Collection";
import WesternCollection from "./components/westren";
import CategoryPage from "./components/CategoryPage";
import ProductDetail from "./components/ProductDetail";
import CustomizeTShirt from "./components/CustomizeTShirt";
import SearchResults from "./pages/customer/SearchResults";

import Wishlist from "./pages/customer/Wishlist";
import Cart from "./pages/customer/Cart";
import Address from "./pages/customer/Address";
import Payment from "./pages/customer/Payment";
import OrderConfirmed from "./pages/customer/OrderConfirmed";
import MyOrders from "./pages/customer/MyOrders";
import AccountLayout from "./pages/customer/AccountLayout";
import AccountPlaceholder from "./pages/customer/AccountPlaceholder";
import Profile from "./pages/customer/Profile";
import AccountSettings from "./pages/customer/AccountSettings";
import AddAddress from "./pages/customer/AddAddress";
import SavedAddresses from "./pages/customer/SavedAddresses";
import PaymentMethods from "./pages/customer/PaymentMethods";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ProductProvider } from "./context/ProductContext";
import { SettingsProvider } from "./context/SettingsContext";
import ReturnRefund from "./pages/customer/ReturnRefund";
import Coupons from "./pages/customer/Coupons";
import Register from "./pages/customer/Register";
import Login from "./pages/customer/Login";
import Notifications from "./pages/customer/Notifications";
import Support from "./pages/customer/Support";
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.toLowerCase().startsWith('/dashboard') || location.pathname.toLowerCase().startsWith('/admin/login');

  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/western" element={<WesternCollection />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/customize/:productId" element={<CustomizeTShirt />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<h1 style={{ padding: "120px 20px", textAlign: "center" }}>Shop Page - Coming Soon!</h1>} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmed/:orderId" element={<OrderConfirmed />} />
        <Route path="/coupons" element={<Coupons />} />

        <Route path="/account/my-orders" element={<MyOrders />} />
        <Route path="/account" element={<AccountLayout />}>
          <Route path="dashboard" element={<AccountPlaceholder />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="add-address" element={<AddAddress />} />
          <Route path="orders" element={<AccountPlaceholder />} />
          <Route path="addresses" element={<SavedAddresses />} />
          <Route path="payment-methods" element={<PaymentMethods />} />
          <Route path="coupons" element={<AccountPlaceholder />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="returns" element={<ReturnRefund />} />
          <Route path="recently-viewed" element={<AccountPlaceholder />} />
          <Route path="support" element={<Support />} />
          <Route path="faqs" element={<AccountPlaceholder />} />
          <Route path="settings" element={<AccountPlaceholder />} />
        </Route>
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
};

function App() {
  return (
    <SettingsProvider>
      <ProductProvider>
        <NotificationProvider>
          <CartProvider>
            <OrderProvider>
              <WishlistProvider>
                <BrowserRouter>
                  <AppContent />
                </BrowserRouter>
              </WishlistProvider>
            </OrderProvider>
          </CartProvider>
        </NotificationProvider>
      </ProductProvider>
    </SettingsProvider>
  );
}

export default App;
