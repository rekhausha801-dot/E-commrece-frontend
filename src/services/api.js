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
      window.location.href = "/login";
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
export const getUserProfile = () => axios.get(`${AUTH_API}/profile`);
export const updateUserProfile = (data) => axios.put(`${AUTH_API}/profile`, data);

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
// FAQ APIs
// -----------------------------------------------------
const ADMIN_FAQ_API = `${API_BASE_URL}/admin/faqs`;
const FAQ_API = `${API_BASE_URL}/support/faqs`;

export const getFAQs = () => axios.get(FAQ_API);
export const createFAQ = (data) => axios.post(ADMIN_FAQ_API, data);
export const updateFAQ = (id, data) => axios.put(`${ADMIN_FAQ_API}/${id}`, data);
export const deleteFAQ = (id) => axios.delete(`${ADMIN_FAQ_API}/${id}`);

// -----------------------------------------------------
// SUPPORT TICKET APIs
// -----------------------------------------------------
const ADMIN_TICKET_API = `${API_BASE_URL}/admin/support/tickets`;

export const getAdminTickets = () => axios.get(ADMIN_TICKET_API);
export const getAdminTicketById = (id) => axios.get(`${ADMIN_TICKET_API}/${id}`);
export const updateTicketStatus = (id, status) => axios.put(`${ADMIN_TICKET_API}/${id}/status`, { status });
export const updateTicketPriority = (id, priority) => axios.put(`${ADMIN_TICKET_API}/${id}/priority`, { priority });
export const assignTicket = (id, assignedTo) => axios.put(`${ADMIN_TICKET_API}/${id}/assign`, { assignedTo });
export const resolveTicket = (id, data) => axios.post(`${ADMIN_TICKET_API}/${id}/resolve`, data);
export const escalateTicket = (id) => axios.post(`${ADMIN_TICKET_API}/${id}/escalate`);

const CUSTOMER_TICKET_API = `${API_BASE_URL}/support/tickets`;
export const getCustomerTickets = (params) => axios.get(CUSTOMER_TICKET_API, { params });
export const getCustomerTicketById = (id) => axios.get(`${CUSTOMER_TICKET_API}/${id}`);
export const contactSupport = (data) => axios.post(`${CUSTOMER_TICKET_API}/contact`, data);
export const getSupportDashboardStats = () => axios.get(`${API_BASE_URL}/support/dashboard/dashboard`);
