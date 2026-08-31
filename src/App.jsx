import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import CustomerDashboard from "./pages/customer/Dashboard";
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

// ─── Route Guards ────────────────────────────────────────────────────────────

/** Only admins can access /dashboard — others get redirected to admin login */
const AdminRoute = ({ children }) => {
  const raw = localStorage.getItem('user');
  const user = raw ? (() => { try { return JSON.parse(raw); } catch { return null; } })() : null;
  const token = localStorage.getItem('token');
  if (!token || !user) return <Navigate to="/admin/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

/** If admin is logged in and tries to visit a customer page, redirect them to dashboard */
const CustomerRoute = ({ children }) => {
  const raw = localStorage.getItem('user');
  const user = raw ? (() => { try { return JSON.parse(raw); } catch { return null; } })() : null;
  const token = localStorage.getItem('token');
  if (token && user && user.role === 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

// ─────────────────────────────────────────────────────────────────────────────

const AppContent = () => {
  const location = useLocation();
  const isDashboard =
    location.pathname.toLowerCase().startsWith('/dashboard') ||
    location.pathname.toLowerCase().startsWith('/admin/login');

  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        {/* ── Public auth ── */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── Admin only ── */}
        <Route path="/Dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />

        {/* ── Customer pages ── */}
        <Route path="/" element={<CustomerRoute><Home /></CustomerRoute>} />
        <Route path="/collection" element={<CustomerRoute><Collection /></CustomerRoute>} />
        <Route path="/western" element={<CustomerRoute><WesternCollection /></CustomerRoute>} />
        <Route path="/category/:categoryId" element={<CustomerRoute><CategoryPage /></CustomerRoute>} />
        <Route path="/product/:productId" element={<CustomerRoute><ProductDetail /></CustomerRoute>} />
        <Route path="/customize/:productId" element={<CustomerRoute><CustomizeTShirt /></CustomerRoute>} />
        <Route path="/search" element={<CustomerRoute><SearchResults /></CustomerRoute>} />
        <Route path="/wishlist" element={<CustomerRoute><Wishlist /></CustomerRoute>} />
        <Route path="/cart" element={<CustomerRoute><Cart /></CustomerRoute>} />
        <Route path="/shop" element={<CustomerRoute><h1 style={{ padding: "120px 20px", textAlign: "center" }}>Shop Page - Coming Soon!</h1></CustomerRoute>} />
        <Route path="/address" element={<CustomerRoute><Address /></CustomerRoute>} />
        <Route path="/payment" element={<CustomerRoute><Payment /></CustomerRoute>} />
        <Route path="/order-confirmed/:orderId" element={<CustomerRoute><OrderConfirmed /></CustomerRoute>} />
        <Route path="/coupons" element={<CustomerRoute><Coupons /></CustomerRoute>} />
        <Route path="/account/my-orders" element={<CustomerRoute><MyOrders /></CustomerRoute>} />
        <Route path="/account" element={<CustomerRoute><AccountLayout /></CustomerRoute>}>
          <Route path="dashboard" element={<AccountPlaceholder />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="add-address" element={<AddAddress />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="addresses" element={<SavedAddresses />} />
          <Route path="payment-methods" element={<PaymentMethods />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="returns" element={<ReturnRefund />} />
          <Route path="recently-viewed" element={<AccountPlaceholder />} />
          <Route path="support" element={<Support />} />
          <Route path="faqs" element={<AccountPlaceholder />} />
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
