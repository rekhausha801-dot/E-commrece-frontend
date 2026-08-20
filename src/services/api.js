import axios from "axios";

// Base URL configuration (You can switch this to env variables later)
const API_BASE_URL = "http://localhost:5000/api";

// -----------------------------------------------------
// AUTH APIs
// -----------------------------------------------------
const AUTH_API = `${API_BASE_URL}/auth`;
export const registerUser = (data) => axios.post(`${AUTH_API}/register`, data);
export const loginUser = (data) => axios.post(`${AUTH_API}/login`, data);

// -----------------------------------------------------
// CATEGORY APIs
// -----------------------------------------------------
const CATEGORY_API = `${API_BASE_URL}/categories`;

export const getCategories = () => axios.get(CATEGORY_API);
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
// PRODUCT APIs (Add here later)
// -----------------------------------------------------
const PRODUCT_API = `${API_BASE_URL}/products`;
// export const getProducts = () => axios.get(PRODUCT_API);
