import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Collection from "./components/Collection";
import ShopBanner from "./components/ShopBanner";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ProductProvider } from "./context/ProductContext";
import { SettingsProvider } from "./context/SettingsContext";
import { CategoryProvider } from "./context/CategoryContext";

const Home = React.lazy(() => import("./pages/customer/Home"));
const WesternCollection = React.lazy(() => import("./components/westren"));
const CategoryPage = React.lazy(() => import("./components/CategoryPage"));
const ProductDetail = React.lazy(() => import("./components/ProductDetail"));
const CustomizeTShirt = React.lazy(() => import("./components/CustomizeTShirt"));
const SearchResults = React.lazy(() => import("./pages/customer/SearchResults"));
const Wishlist = React.lazy(() => import("./pages/customer/Wishlist"));
const Cart = React.lazy(() => import("./pages/customer/Cart"));
const Address = React.lazy(() => import("./pages/customer/Address"));
const Payment = React.lazy(() => import("./pages/customer/Payment"));
const OrderConfirmed = React.lazy(() => import("./pages/customer/OrderConfirmed"));
const MyOrders = React.lazy(() => import("./pages/customer/MyOrders"));
const AccountLayout = React.lazy(() => import("./pages/customer/AccountLayout"));
const AccountPlaceholder = React.lazy(() => import("./pages/customer/AccountPlaceholder"));
const CustomerDashboard = React.lazy(() => import("./pages/customer/Dashboard"));
const Profile = React.lazy(() => import("./pages/customer/Profile"));
const AccountSettings = React.lazy(() => import("./pages/customer/AccountSettings"));
const AddAddress = React.lazy(() => import("./pages/customer/AddAddress"));
const SavedAddresses = React.lazy(() => import("./pages/customer/SavedAddresses"));
const PaymentMethods = React.lazy(() => import("./pages/customer/PaymentMethods"));
const ReturnRefund = React.lazy(() => import("./pages/customer/ReturnRefund"));
const Coupons = React.lazy(() => import("./pages/customer/Coupons"));
const Register = React.lazy(() => import("./pages/customer/Register"));
const Login = React.lazy(() => import("./pages/customer/Login"));
const Notifications = React.lazy(() => import("./pages/customer/Notifications"));
const Support = React.lazy(() => import("./pages/customer/Support"));
const ShippingPolicy = React.lazy(() => import("./pages/customer/ShippingPolicy"));
const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));

// ─── Route Guards ────────────────────────────────────────────────────────────

/** Only admins can access /dashboard — others get redirected to admin login */
const AdminRoute = ({ children }) => {
  const raw = localStorage.getItem('adminUser');
  const user = raw ? (() => { try { return JSON.parse(raw); } catch { return null; } })() : null;
  const token = localStorage.getItem('adminToken');
  if (!token || !user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

const CustomerRoute = ({ children }) => {
  // Public customer route
  return children;
};

const ProtectedCustomerRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


const AppContent = () => {
  const location = useLocation();
  const hideLayout =
    location.pathname.toLowerCase().startsWith('/dashboard') ||
    location.pathname.toLowerCase().startsWith('/admin/login') ||
    location.pathname.toLowerCase() === '/login' ||
    location.pathname.toLowerCase() === '/register';

  return (
    <>
      {!hideLayout && <Navbar />}
      <Suspense fallback={<div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>Loading...</div>}>
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
        <Route path="/shop" element={<CustomerRoute><Collection BannerComponent={ShopBanner} title="Shop" /></CustomerRoute>} />
        <Route path="/cart" element={<CustomerRoute><Cart /></CustomerRoute>} />
        <Route path="/support" element={<CustomerRoute><Support /></CustomerRoute>} />
        <Route path="/shipping-policy" element={<CustomerRoute><ShippingPolicy /></CustomerRoute>} />
        <Route path="/about-us" element={<CustomerRoute><AboutUs /></CustomerRoute>} />
        
        {/* ── Protected Customer pages ── */}
        <Route path="/wishlist" element={<ProtectedCustomerRoute><Wishlist /></ProtectedCustomerRoute>} />
        <Route path="/address" element={<ProtectedCustomerRoute><Address /></ProtectedCustomerRoute>} />
        <Route path="/payment" element={<ProtectedCustomerRoute><Payment /></ProtectedCustomerRoute>} />
        <Route path="/order-confirmed/:orderId" element={<ProtectedCustomerRoute><OrderConfirmed /></ProtectedCustomerRoute>} />
        <Route path="/coupons" element={<ProtectedCustomerRoute><Coupons /></ProtectedCustomerRoute>} />
        <Route path="/account/my-orders" element={<ProtectedCustomerRoute><MyOrders /></ProtectedCustomerRoute>} />
        <Route path="/account" element={<ProtectedCustomerRoute><AccountLayout /></ProtectedCustomerRoute>}>
          <Route index element={<Navigate to="profile" replace />} />
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
        </Suspense>
      {!hideLayout && <Footer />}
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
                <CategoryProvider>
                  <BrowserRouter>
                    <AppContent />
                  </BrowserRouter>
                </CategoryProvider>
              </WishlistProvider>
            </OrderProvider>
          </CartProvider>
        </NotificationProvider>
      </ProductProvider>
    </SettingsProvider>
  );
}

export default App;
