import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
const REPORTS_API = `${API_BASE_URL}/admin/reports`;

export const getReports = (params) => axios.get(REPORTS_API, { params });
export const getSalesOverview = (params) => axios.get(`${REPORTS_API}/sales-overview`, { params });
export const getSalesByChannel = (params) => axios.get(`${REPORTS_API}/sales-by-channel`, { params });
export const getRevenueBreakdown = (params) => axios.get(`${REPORTS_API}/revenue-breakdown`, { params });
export const getProfitMargin = (params) => axios.get(`${REPORTS_API}/profit-margin`, { params });
export const getReturnsRefunds = (params) => axios.get(`${REPORTS_API}/returns-refunds`, { params });
export const getCouponPerformance = (params) => axios.get(`${REPORTS_API}/coupon-performance`, { params });
export const getPaymentMethods = (params) => axios.get(`${REPORTS_API}/payment-methods`, { params });
export const getLowStockOverview = (params) => axios.get(`${REPORTS_API}/low-stock`, { params });
export const getCustomerOverview = (params) => axios.get(`${REPORTS_API}/customer-overview`, { params });
export const getOrderStatusOverview = (params) => axios.get(`${REPORTS_API}/order-status`, { params });
export const exportReports = (params) => axios.get(`${REPORTS_API}/export`, { params, responseType: 'blob' });
