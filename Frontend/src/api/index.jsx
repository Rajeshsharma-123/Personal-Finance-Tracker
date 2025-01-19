import axios from "axios";

const API = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    maxRedirects: 0, // Disable redirects
});

// Add token to headers if it exists in localstorage
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    req.headers["Content-Type"] = "application/json"; // Explicitly set JSON header
    return req;
});

export const registerUser = async (data) => {
    try {
        const response = await API.post('/auth/register', data);
        console.log("Register response:", response.data);


        return response.data; // Return the entire response data
    } catch (error) {
        console.error("Error during registration:", error.response?.data || error.message);
        throw error.response?.data || { message: "Registration failed" }; // Throw error with appropriate message
    }
};

export const loginUser = async (data) => {
    try {
        const response = await API.post('/auth/login', data);
        console.log("Login response:", response.data);
        const token = response.data.access_token; // Extract the token from the response

        if (token) {
             localStorage.setItem('auth_token', token);
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
        console.log("I am response:", response);
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
