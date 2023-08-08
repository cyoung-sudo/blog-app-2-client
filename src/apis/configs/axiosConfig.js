import axios from "axios";

// Initialize axios instance with custom configs
export const api = axios.create({
  withCredentials: true,
  headers: { "Custom-Language": "en" }
});

// Alternative to proxying
export const baseURL = "https://blog-app-2-server.onrender.com";
// export const baseURL = "";