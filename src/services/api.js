import axios from "axios";

// Base URL configuration (You can switch this to env variables later)
const API_BASE_URL = "http://localhost:5000/api";

// Global timeout: 15 seconds — prevents requests from hanging indefinitely
axios.defaults.timeout = 15000;

// Add a response interceptor to handle 401 and timeout errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED' || error.message?.toLowerCase().includes('timeout')) {
      // Graceful timeout — do not redirect, just reject with user-friendly message
      return Promise.reject(new Error('Request timed out. Please check your connection and try again.'));
    }
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login" && window.location.pathname !== "/admin/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Add a single request interceptor for authentication
axios.interceptors.request.use(
  (config) => {
    // Only add token if the request goes to our API
    if (config.url && config.url.startsWith(API_BASE_URL)) {
      // Determine if this request is for an admin action
      // E.g. we might check if the current page is an admin page, or check the URL route.
      // Easiest is to check the current window location pathname
      const isAdminContext = window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/dashboard');
      
      let token;
      if (isAdminContext) {
        token = localStorage.getItem("adminToken");
      } else {
        token = localStorage.getItem("token"); // Used by customer login
      }

      if (token) {
        if (config.headers.set) {
            config.headers.set('Authorization', `Bearer ${token}`);
        } else {
            config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -----------------------------------------------------
// AUTH APIs
// -----------------------------------------------------
const AUTH_API = `${API_BASE_URL}/auth`;
export const registerUser = (data) => axios.post(`${AUTH_API}/register`, data);
export const loginUser = (data) => axios.post(`${AUTH_API}/login`, data);
export const googleLoginApi = (data) => axios.post(`${AUTH_API}/google`, data);
export const adminLoginApi = (data) => axios.post(`${AUTH_API}/admin/login`, data);
export const getUserProfile = () => axios.get(`${AUTH_API}/profile`);
export const updateUserProfile = (data) => axios.put(`${AUTH_API}/profile`, data);
export const updatePassword = (data) => axios.put(`${AUTH_API}/password`, data);
export const updateSecuritySettings = (data) => axios.put(`${AUTH_API}/security`, data);
export const getActiveSessions = () => axios.get(`${AUTH_API}/sessions`);
export const revokeSession = (sessionId) => axios.delete(`${AUTH_API}/sessions/${sessionId}`);
export const revokeAllSessions = () => axios.delete(`${AUTH_API}/sessions/all`);

// -----------------------------------------------------
// CATEGORY APIs
// -----------------------------------------------------
const CATEGORY_API = `${API_BASE_URL}/categories`;

export const getCategories = () => axios.get(CATEGORY_API);
export const fetchCategories = () => axios.get(CATEGORY_API);
export const createCategory = (data) => axios.post(CATEGORY_API, data, { timeout: 60000 });
export const updateCategory = (id, data) => axios.put(`${CATEGORY_API}/${id}`, data, { timeout: 60000 });
export const updateCategoryStatus = (id, status) => axios.patch(`${CATEGORY_API}/${id}/status`, { status });
export const deleteCategory = (id) => axios.delete(`${CATEGORY_API}/${id}`);

// -----------------------------------------------------
// SUBCATEGORY APIs
// -----------------------------------------------------
const SUBCATEGORY_API = `${API_BASE_URL}/subcategories`;
export const getSubcategories = () => axios.get(SUBCATEGORY_API);
export const createSubcategory = (data) => axios.post(SUBCATEGORY_API, data, { timeout: 60000 });
export const updateSubcategory = (id, data) => axios.put(`${SUBCATEGORY_API}/${id}`, data, { timeout: 60000 });
export const updateSubcategoryStatus = (id, status) => axios.patch(`${SUBCATEGORY_API}/${id}/status`, { status });
export const deleteSubcategory = (id) => axios.delete(`${SUBCATEGORY_API}/${id}`);

// -----------------------------------------------------
// BRAND APIs
// -----------------------------------------------------
const BRAND_API = `${API_BASE_URL}/brands`;

export const getBrands = () => axios.get(BRAND_API);
export const createBrand = (data) => axios.post(BRAND_API, data);
export const updateBrand = (id, data) => axios.put(`${BRAND_API}/${id}`, data);
export const updateBrandStatus = (id, status) => axios.patch(`${BRAND_API}/${id}/status`, { status });
export const deleteBrand = (id) => axios.delete(`${BRAND_API}/${id}`);

// -----------------------------------------------------
// CUSTOMER APIs
// -----------------------------------------------------
const CUSTOMER_API = `${API_BASE_URL}/customers`;

export const getCustomers = (params) => axios.get(CUSTOMER_API, { params });
export const getCustomerStats = () => axios.get(`${CUSTOMER_API}/stats`);
export const getCustomerById = (id) => axios.get(`${CUSTOMER_API}/${id}`);
export const createCustomer = (data) => axios.post(CUSTOMER_API, data);
export const updateCustomer = (id, data) => axios.put(`${CUSTOMER_API}/${id}`, data);
export const updateCustomerStatus = (id, status) => axios.patch(`${CUSTOMER_API}/${id}/status`, { status });
export const deleteCustomer = (id) => axios.delete(`${CUSTOMER_API}/${id}`);
export const sendMessageToCustomerApi = (id, data) => axios.post(`${CUSTOMER_API}/${id}/message`, data);


const PRODUCT_API = `${API_BASE_URL}/products`;

export const fetchProducts = () => axios.get(PRODUCT_API);
// Product detail fetches the full document (designs, faqs, specs, etc.) — allow more time
export const fetchProductById = (id) => axios.get(`${PRODUCT_API}/${id}`, { timeout: 30000 });
export const fetchProductsByCategory = (categoryId) => axios.get(`${PRODUCT_API}/category/${categoryId}`);
export const fetchNextSku = (category, subCategory) => axios.get(`${PRODUCT_API}/next-sku`, { params: { category, subCategory } });
// Product create/update involve Cloudinary image uploads — allow up to 60 seconds
export const createProductApi = (data) => axios.post(PRODUCT_API, data, { timeout: 60000 });
export const updateProductApi = (id, data) => axios.put(`${PRODUCT_API}/${id}`, data, { timeout: 60000 });
export const deleteProductApi = (id) => axios.delete(`${PRODUCT_API}/${id}`);



const OFFER_API = `${API_BASE_URL}/offers`;
export const getOffers = () => axios.get(OFFER_API);
export const createOffer = (data) => axios.post(OFFER_API, data);
export const updateOffer = (id, data) => axios.put(`${OFFER_API}/${id}`, data);
export const deleteOffer = (id) => axios.delete(`${OFFER_API}/${id}`);


export const checkCouponUsageApi = (data) => axios.post(`${API_BASE_URL}/coupons/check-usage`, data);

const BANNER_API = `${API_BASE_URL}/banners`;
export const getBanners = () => axios.get(BANNER_API);
export const createBanner = (data) => axios.post(BANNER_API, data);
export const updateBanner = (id, data) => axios.put(`${BANNER_API}/${id}`, data);
export const deleteBanner = (id) => axios.delete(`${BANNER_API}/${id}`);
export const toggleBannerStatus = (id, status) => axios.patch(`${BANNER_API}/${id}/status`, { status });
export const getActiveBanners = () => axios.get(`${BANNER_API}/active`);


const PAYMENT_API = `${API_BASE_URL}/payments`;
export const processPaymentApi = (data) => axios.post(`${PAYMENT_API}/process`, data);


const ORDER_API = `${API_BASE_URL}/orders`;
export const getOrders = (params) => axios.get(ORDER_API, { params, timeout: 60000 });
export const getMyOrders = () => axios.get(`${ORDER_API}/myorders`);
export const getOrderStats = () => axios.get(`${ORDER_API}/stats`);
export const getOrderById = (id) => axios.get(`${ORDER_API}/${id}`);
export const createOrderApi = (data) => axios.post(ORDER_API, data);
export const updateOrderStatus = (id, status) => axios.patch(`${ORDER_API}/${id}/status`, { orderStatus: status });
export const cancelOrder = (id, data) => axios.patch(`${ORDER_API}/${id}/cancel`, data);
export const returnOrder = (id, data) => axios.patch(`${ORDER_API}/${id}/return`, data);
export const reviewReturn = (id, data) => axios.post(`${ORDER_API}/${id}/return/review`, data);
export const processRefund = (id) => axios.post(`${ORDER_API}/${id}/refund`);
export const getExportOrdersUrl = () => `${ORDER_API}/export`;


const REVIEW_API = `${API_BASE_URL}/reviews`;
const ADMIN_REVIEW_API = `${API_BASE_URL}/admin/reviews`;

export const createReviewApi = (data) => axios.post(REVIEW_API, data);
export const getProductReviewsApi = (productId) => axios.get(`${REVIEW_API}/product/${productId}?_t=${Date.now()}`);
export const getProductRatingSummaryApi = (productId) => axios.get(`${REVIEW_API}/product/${productId}/summary`);
export const markReviewHelpfulApi = (id) => axios.put(`${REVIEW_API}/${id}/helpful`);
export const deleteCustomerReviewApi = (id) => axios.delete(`${REVIEW_API}/${id}`);

export const getAdminReviewsApi = (params) => axios.get(ADMIN_REVIEW_API, { params });
export const getAdminReviewStatsApi = () => axios.get(`${ADMIN_REVIEW_API}/stats`);
export const updateReviewStatusApi = (id, status) => axios.patch(`${ADMIN_REVIEW_API}/${id}/status`, { status });
export const deleteReviewApi = (id) => axios.delete(`${ADMIN_REVIEW_API}/${id}`);
export const replyToReviewApi = (id, adminReply) => axios.post(`${ADMIN_REVIEW_API}/${id}/reply`, { adminReply });

export const getShippingFeeApi = () => axios.get(`${API_BASE_URL}/checkout/shipping-fee`);


const NOTIFICATION_API = `${API_BASE_URL}/notifications`;

export const getAdminNotificationsApi = () => axios.get(NOTIFICATION_API);
export const markNotificationAsReadApi = (id) => axios.patch(`${NOTIFICATION_API}/${id}/read`);
export const markAllNotificationsAsReadApi = () => axios.patch(`${NOTIFICATION_API}/read-all`);
export const deleteAdminNotificationApi = (id) => axios.delete(`${NOTIFICATION_API}/${id}`);

// Customer Notifications
const CUSTOMER_NOTIFICATION_API = `${API_BASE_URL}/customer/notifications`;
export const getCustomerNotificationsApi = () => axios.get(CUSTOMER_NOTIFICATION_API);
export const markCustomerNotificationAsReadApi = (id) => axios.patch(`${CUSTOMER_NOTIFICATION_API}/${id}/read`);
export const markAllCustomerNotificationsAsReadApi = () => axios.patch(`${CUSTOMER_NOTIFICATION_API}/read-all`);


const SETTINGS_API = `${API_BASE_URL}/settings`;
export const getSettingsApi = () => axios.get(SETTINGS_API);
export const updateSettingsApi = (data) => axios.put(SETTINGS_API, data);

const PREFERENCES_API = `${API_BASE_URL}/admin/settings/preferences`;
export const getPreferencesApi = () => axios.get(PREFERENCES_API);
export const updatePreferencesApi = (data) => axios.put(PREFERENCES_API, data);

const ANALYTICS_API = `${API_BASE_URL}/analytics`;
// Analytics are aggregate queries on Atlas — allow 30 seconds
export const getDashboardAnalyticsApi = (params) => axios.get(`${ANALYTICS_API}/dashboard`, { params, timeout: 30000 });
export const getRatingAnalyticsApi = () => axios.get(`${ANALYTICS_API}/ratings`, { timeout: 30000 });
export const getCustomerAnalyticsApi = () => axios.get(`${API_BASE_URL}/customer/analytics`, { timeout: 30000 });
export const getReports = (params) => axios.get(`${API_BASE_URL}/admin/reports`, { params });
export const exportReports = (params) => axios.get(`${API_BASE_URL}/admin/reports/export`, { params, responseType: 'blob' });

// -----------------------------------------------------
// SUPPORT & TICKETS APIs
// -----------------------------------------------------
const FAQ_API = `${API_BASE_URL}/support/faqs`;
const ADMIN_FAQ_API = `${API_BASE_URL}/admin/faqs`;
const ADMIN_TICKET_API = `${API_BASE_URL}/admin/support/tickets`;
const CUSTOMER_TICKET_API = `${API_BASE_URL}/support/tickets`;

export const getFAQs = () => axios.get(FAQ_API);
export const createFAQ = (data) => axios.post(ADMIN_FAQ_API, data);
export const updateFAQ = (id, data) => axios.put(`${ADMIN_FAQ_API}/${id}`, data);
export const deleteFAQ = (id) => axios.delete(`${ADMIN_FAQ_API}/${id}`);

export const getAdminTickets = () => axios.get(ADMIN_TICKET_API);
export const resolveTicket = (id, data) => axios.post(`${ADMIN_TICKET_API}/${id}/resolve`, data);
export const updateTicketStatus = (id, status) => axios.put(`${ADMIN_TICKET_API}/${id}/status`, { status });

export const getCustomerTickets = () => axios.get(CUSTOMER_TICKET_API);
export const contactSupport = (data) => axios.post(`${CUSTOMER_TICKET_API}/contact`, data);

export const searchProductsApi = (queryStr) => axios.get("${API_BASE_URL}/products/search?${queryStr}");
