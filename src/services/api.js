import axios from "axios";

// Add a request interceptor to include the token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Base URL configuration (You can switch this to env variables later)
const API_BASE_URL = "http://localhost:5000/api";

// Add a request interceptor for authentication
axios.interceptors.request.use(
  (config) => {
    // Only add token if the request goes to our API
    if (config.url.startsWith(API_BASE_URL)) {
      // Check for userInfo in localStorage (used by Auth/Admin login)
      const userInfoStr = localStorage.getItem('userInfo');
      if (userInfoStr) {
        try {
          const userInfo = JSON.parse(userInfoStr);
          if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
          }
        } catch (e) {
          console.error("Error parsing userInfo from localStorage", e);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
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
// PRODUCT APIs (Add here later)
// -----------------------------------------------------
const PRODUCT_API = `${API_BASE_URL}/products`;
// export const getProducts = () => axios.get(PRODUCT_API);

// -----------------------------------------------------
// OFFER/COUPON APIs
// -----------------------------------------------------
const OFFER_API = `${API_BASE_URL}/offers`;

export const getOffers = (params) => axios.get(OFFER_API, { params });
export const getOfferById = (id) => axios.get(`${OFFER_API}/${id}`);
export const createOffer = (data) => axios.post(OFFER_API, data);
export const updateOffer = (id, data) => axios.put(`${OFFER_API}/${id}`, data);
export const deleteOffer = (id) => axios.delete(`${OFFER_API}/${id}`);

// -----------------------------------------------------
// BANNER APIs
// -----------------------------------------------------
const BANNER_API = `${API_BASE_URL}/banners`;

export const getBanners = () => axios.get(BANNER_API);
export const getActiveBanners = () => axios.get(`${BANNER_API}/active`);
export const createBanner = (data) => axios.post(BANNER_API, data);
export const updateBanner = (id, data) => axios.put(`${BANNER_API}/${id}`, data);
export const deleteBanner = (id) => axios.delete(`${BANNER_API}/${id}`);
export const toggleBannerStatus = (id) => axios.patch(`${BANNER_API}/${id}/status`);
