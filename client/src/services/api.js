import axios from "axios";

// Determine the base URL depending on the environment
let API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
if (API_URL && !API_URL.endsWith("/api")) {
  API_URL = API_URL.endsWith("/") ? `${API_URL}api` : `${API_URL}/api`;
}

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const gameService = {
  getTrending: async () => {
    const response = await api.get("/games/trending");
    return response.data;
  },
  getPopular: async () => {
    const response = await api.get("/games/popular");
    return response.data;
  },
  getNewReleases: async () => {
    const response = await api.get("/games/new");
    return response.data;
  },
  searchGames: async (query) => {
    const response = await api.get("/games/search", {
      params: { q: query },
    });
    return response.data;
  },
  getGameDetails: async (id) => {
    const response = await api.get(`/games/${id}`);
    return response.data;
  },
};

export const healthService = {
  checkHealth: async () => {
    const response = await api.get("/health");
    return response.data;
  },
};

export default api;
