import axios from "axios";

const API = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    maxRedirects: 0, // Disable redirects
});

// Add token to headers if it exists in localstorage
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    req.headers["Content-Type"] = "application/json"; // Explicitly set JSON header
    return req;
});

export const registerUser = (data) => API.post('/auth/register', data);

export const loginUser = async (data) => {
    try {
        const response = await API.post('/auth/login', data);
        console.log("Login response:", response.data);
        const token = response.data.access_token; // Extract the token from the response

        if (token) {
            
            console.log("Token value before setting in localStorage:", token);
            localStorage.setItem('token', token);
            console.log("Token in localStorage after setting:", localStorage.getItem('token'));

        }
        else{
            console.error("Token is missing in the response.");
        }
        return response.data;
        
    } catch (error) {
        console.error("Error during login:", error.response?.data || error.message);
        throw error.response?.data || { message: "Login failed" };
    }
};

export const fetchTransactions = async () => {
    try {
        const response = await API.get("/transactions/"); // Ensure consistent trailing slash
        return response.data; // Explicitly return data
    } catch (error) {
        throw error.response?.data || "Failed to fetch transactions";
    }
};

export const addTransaction = async (data) => {
    try {
        const response = await API.post("/transactions/", data); // Ensure consistent trailing slash
        return response.data; // Explicitly return data
    } catch (error) {
        throw error.response?.data || "Failed to add transaction";
    }
};

export const updateTransaction = async (id, data) => {
    try {
        const response = await API.put(`/transactions/${id}/`, data); // Ensure consistent trailing slash
        return response.data; // Explicitly return data
    } catch (error) {
        throw error.response?.data || "Failed to update transaction";
    }
};

export const deleteTransaction = async (id) => {
    try {
        const response = await API.delete(`/transactions/${id}/`); // Ensure consistent trailing slash
        return response.data; // Explicitly return data
    } catch (error) {
        throw error.response?.data || "Failed to delete transaction";
    }
};
