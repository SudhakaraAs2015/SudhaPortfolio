// src/axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://sudhaportfolio.onrender.com/api/sudhaportfolio', 
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

// You can add interceptors for requests and responses here if needed
axiosInstance.interceptors.response.use(
  (response) => response, // If response is successful, return it
  (error) => {
    // You can handle global error logic here
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
