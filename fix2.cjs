const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

const lazyImportsStr = 
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
;

if (!content.includes('const Home = React.lazy')) {
    content = content.replace(/\/\/ ─── Route Guards/, lazyImportsStr + '\n\n// ─── Route Guards');
    fs.writeFileSync(filePath, content);
    console.log('Fixed lazy imports!');
}
