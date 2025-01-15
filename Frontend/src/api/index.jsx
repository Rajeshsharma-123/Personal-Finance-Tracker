import axios from "axios";
import { data } from "react-router-dom";

const API = axios.create({ baseURL: 'http://127.0.0.1:5000'});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if(token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const registerUser =(data) => API.post('auth', data);
export const loginUser = (data) => API.post('/auth', data);
export const fetchTransactions = () => API.get('/transactions');
export const addTransaction = (data) => API.post('/transactions', data);
export const updateTransaction = (id, data) => API.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
