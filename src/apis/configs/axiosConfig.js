import axios from "axios";

// Initialize axios instance with custom configs
const api = axios.create({
  headers: { "Custom-Language": "en" },
  baseURL: "https://blog-app-2-server.onrender.com"
});

export default api;