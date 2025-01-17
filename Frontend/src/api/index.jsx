import axios from "axios";
import { data } from "react-router-dom";

const API = axios.create({
    baseURL: 'http://127.0.0.1:5000' });
    maxRedirects: 0, // Disable redirects

// Add token to headers if it exists in localstorage
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if(token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    req.headers["Content-Type"] = "application/json"; // Explicitly set JSON header 
    return req;
});


export const registerUser =(data) => API.post('/auth/register', data);
export const loginUser = async (data) =>{
    try {
        const response = await API.post('/auth/login', data);
        return response.data; // Explicitly return the data object
    } catch (error) {
        console.error("Error during login:", error.response?.data || error.message);
        // You can throw an error or return a default response structure
        throw error.response?.data || { message: "Login failed" };
    }
};
export const fetchTransactions = async () => {
    try {
        return await API.get("/transactions");
    } catch (error) {
        throw error.response?.data || "Failed to fetch transactions";
    }
};
export const addTransaction = async (data) => {
    try {
        return await API.post("/transactions", data);
    } catch (error) {
        throw error.response?.data || "Failed to add transaction";
    }
};
export const updateTransaction = async (id, data) => {
    try {
        return await API.put(`/transactions/${id}`, data);
    } catch (error) {
        throw error.response?.data || "Failed to update transaction";
    }
};
export const deleteTransaction = async (id) => {
    try {
        return await API.delete(`/transactions/${id}`);
    } catch (error) {
        throw error.response?.data || "Failed to delete transaction";
    }
};
