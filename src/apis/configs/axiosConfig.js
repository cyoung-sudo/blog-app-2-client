import axios from "axios";

// Initialize axios instance with custom configs
const api = axios.create({
  withCredentials: true,
  headers: { "Custom-Language": "en" }
});

export default api;