import axios from 'axios';

const API_BASE = 'https://reqres.in/api';

// Create an Axios instance with the default headers
const apiInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1',  // Add your API key here
  },
});

// Use the created instance to define the API calls
export const loginApi = (credentials) => apiInstance.post('/login', credentials);

export const getUsersApi = (page = 1) => apiInstance.get(`/users?page=${page}`);

export const createUserApi = (user) => apiInstance.post('/users', user);

export const updateUserApi = (id, user) => apiInstance.put(`/users/${id}`, user);

export const deleteUserApi = (id) => apiInstance.delete(`/users/${id}`);
