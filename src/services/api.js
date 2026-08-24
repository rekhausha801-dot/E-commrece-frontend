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
// PRODUCT APIs
// -----------------------------------------------------
const PRODUCT_API = `${API_BASE_URL}/products`;
export const fetchProducts = () => axios.get(PRODUCT_API);
export const fetchProductById = (id) => axios.get(`${PRODUCT_API}/${id}`);
export const fetchProductsByCategory = (categoryId) => axios.get(`${PRODUCT_API}/category/${categoryId}`);
export const fetchNextSku = (categoryId) => axios.get(`${PRODUCT_API}/next-sku${categoryId ? `?category=${categoryId}` : ''}`);
export const createProductApi = (data) => axios.post(PRODUCT_API, data);
export const updateProductApi = (id, data) => axios.put(`${PRODUCT_API}/${id}`, data);
export const deleteProductApi = (id) => axios.delete(`${PRODUCT_API}/${id}`);
