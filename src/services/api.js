import axios from "axios";

// Base URL configuration (You can switch this to env variables later)
const API_BASE_URL = "http://localhost:5000/api";

// Add a response interceptor to handle 401 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
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
      let token = localStorage.getItem("token"); // Used by customer login
      
      // Check for userInfo in localStorage (used by Auth/Admin login)
      if (!token) {
        const userInfoStr = localStorage.getItem('userInfo');
        if (userInfoStr) {
          try {
            const userInfo = JSON.parse(userInfoStr);
            if (userInfo && userInfo.token) {
              token = userInfo.token;
            }
          } catch (e) {
            console.error("Error parsing userInfo from localStorage", e);
          }
        }
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
export const createCategory = (data) => axios.post(CATEGORY_API, data);
export const updateCategory = (id, data) => axios.put(`${CATEGORY_API}/${id}`, data);
export const updateCategoryStatus = (id, status) => axios.patch(`${CATEGORY_API}/${id}/status`, { status });
export const deleteCategory = (id) => axios.delete(`${CATEGORY_API}/${id}`);

// -----------------------------------------------------
// SUBCATEGORY APIs (Add here later)
// -----------------------------------------------------
const SUBCATEGORY_API = `${API_BASE_URL}/subcategories`;
// export const getSubcategories = () => axios.get(SUBCATEGORY_API);

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

// -----------------------------------------------------
// PRODUCT APIs
// -----------------------------------------------------
const PRODUCT_API = `${API_BASE_URL}/products`;

export const fetchProducts = () => axios.get(PRODUCT_API);
export const fetchProductById = (id) => axios.get(`${PRODUCT_API}/${id}`);
export const fetchProductsByCategory = (categoryId) => axios.get(`${PRODUCT_API}/category/${categoryId}`);
export const fetchNextSku = () => axios.get(`${PRODUCT_API}/next-sku`);
export const createProductApi = (data) => axios.post(PRODUCT_API, data);
export const updateProductApi = (id, data) => axios.put(`${PRODUCT_API}/${id}`, data);
export const deleteProductApi = (id) => axios.delete(`${PRODUCT_API}/${id}`);



// -----------------------------------------------------
// OFFER APIs
// -----------------------------------------------------
const OFFER_API = `${API_BASE_URL}/offers`;
export const getOffers = () => axios.get(OFFER_API);
export const createOffer = (data) => axios.post(OFFER_API, data);
export const updateOffer = (id, data) => axios.put(`${OFFER_API}/${id}`, data);
export const deleteOffer = (id) => axios.delete(`${OFFER_API}/${id}`);

// -----------------------------------------------------
// BANNER APIs
// -----------------------------------------------------
const BANNER_API = `${API_BASE_URL}/banners`;
export const getBanners = () => axios.get(BANNER_API);
export const createBanner = (data) => axios.post(BANNER_API, data);
export const updateBanner = (id, data) => axios.put(`${BANNER_API}/${id}`, data);
export const deleteBanner = (id) => axios.delete(`${BANNER_API}/${id}`);
export const toggleBannerStatus = (id, status) => axios.patch(`${BANNER_API}/${id}/status`, { status });
export const getActiveBanners = () => axios.get(`${BANNER_API}/active`);

// -----------------------------------------------------
// PAYMENT APIs
// -----------------------------------------------------
const PAYMENT_API = `${API_BASE_URL}/payments`;
export const processPaymentApi = (data) => axios.post(`${PAYMENT_API}/process`, data);

// -----------------------------------------------------
// ORDER APIs
// -----------------------------------------------------
const ORDER_API = `${API_BASE_URL}/orders`;
export const getOrders = (params) => axios.get(ORDER_API, { params });
export const getOrderStats = () => axios.get(`${ORDER_API}/stats`);
export const getOrderById = (id) => axios.get(`${ORDER_API}/${id}`);
export const createOrderApi = (data) => axios.post(ORDER_API, data);
export const updateOrderStatus = (id, status) => axios.patch(`${ORDER_API}/${id}/status`, { orderStatus: status });
export const cancelOrder = (id, data) => axios.patch(`${ORDER_API}/${id}/cancel`, data);
export const reviewReturn = (id, data) => axios.post(`${ORDER_API}/${id}/return/review`, data);
export const processRefund = (id) => axios.post(`${ORDER_API}/${id}/refund`);
export const getExportOrdersUrl = () => `${ORDER_API}/export`;


const REVIEW_API = `${API_BASE_URL}/reviews`;
const ADMIN_REVIEW_API = `${API_BASE_URL}/admin/reviews`;

export const createReviewApi = (data) => axios.post(REVIEW_API, data);
export const getProductReviewsApi = (productId) => axios.get(`${REVIEW_API}/product/${productId}`);
export const getProductRatingSummaryApi = (productId) => axios.get(`${REVIEW_API}/product/${productId}/summary`);
export const markReviewHelpfulApi = (id) => axios.put(`${REVIEW_API}/${id}/helpful`);
export const deleteCustomerReviewApi = (id) => axios.delete(`${REVIEW_API}/${id}`);

export const getAdminReviewsApi = (params) => axios.get(ADMIN_REVIEW_API, { params });
export const updateReviewStatusApi = (id, status) => axios.patch(`${ADMIN_REVIEW_API}/${id}/status`, { status });
export const deleteReviewApi = (id) => axios.delete(`${ADMIN_REVIEW_API}/${id}`);
export const replyToReviewApi = (id, adminReply) => axios.post(`${ADMIN_REVIEW_API}/${id}/reply`, { adminReply });

export const getShippingFeeApi = () => axios.get(`${API_BASE_URL}/checkout/shipping-fee`);

// -----------------------------------------------------
// NOTIFICATION APIs
// -----------------------------------------------------
const NOTIFICATION_API = `${API_BASE_URL}/notifications`;

export const getAdminNotificationsApi = () => axios.get(NOTIFICATION_API);
export const markNotificationAsReadApi = (id) => axios.patch(`${NOTIFICATION_API}/${id}/read`);
export const markAllNotificationsAsReadApi = () => axios.patch(`${NOTIFICATION_API}/read-all`);
export const deleteAdminNotificationApi = (id) => axios.delete(`${NOTIFICATION_API}/${id}`);


const SETTINGS_API = `${API_BASE_URL}/settings`;
export const getSettingsApi = () => axios.get(SETTINGS_API);
export const updateSettingsApi = (data) => axios.put(SETTINGS_API, data);

const PREFERENCES_API = `${API_BASE_URL}/admin/settings/preferences`;
export const getPreferencesApi = () => axios.get(PREFERENCES_API);
export const updatePreferencesApi = (data) => axios.put(PREFERENCES_API, data);

// -----------------------------------------------------
// ANALYTICS APIs
// -----------------------------------------------------
const ANALYTICS_API = `${API_BASE_URL}/analytics`;
export const getDashboardAnalyticsApi = () => axios.get(`${ANALYTICS_API}/dashboard`);
export const getRatingAnalyticsApi = () => axios.get(`${ANALYTICS_API}/ratings`);
