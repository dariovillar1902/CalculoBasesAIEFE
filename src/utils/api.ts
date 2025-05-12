import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7129/api/", // Adjust API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
