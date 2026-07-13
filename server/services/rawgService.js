const axios = require("axios");

const RAWG_API_URL = process.env.RAWG_API_URL || "https://api.rawg.io/api";
const RAWG_API_KEY = process.env.RAWG_API_KEY;

const rawgClient = axios.create({
  baseURL: RAWG_API_URL,
  params: {
    key: RAWG_API_KEY,
  },
});

exports.getTrendingGames = async () => {
  // Discover popular games released recently
  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);

  const dates = `${lastYear.toISOString().split("T")[0]},${today.toISOString().split("T")[0]}`;

  const response = await rawgClient.get("/games", {
    params: {
      dates,
      ordering: "-added",
      page_size: 10,
    },
  });
  return response.data;
};

exports.getPopularGames = async () => {
  const response = await rawgClient.get("/games", {
    params: {
      ordering: "-rating",
      page_size: 10,
    },
  });
  return response.data;
};

exports.getNewReleases = async () => {
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  const dates = `${today.toISOString().split("T")[0]},${nextMonth.toISOString().split("T")[0]}`;

  const response = await rawgClient.get("/games", {
    params: {
      dates,
      ordering: "-added",
      page_size: 10,
    },
  });
  return response.data;
};

exports.searchGames = async (query) => {
  const response = await rawgClient.get("/games", {
    params: {
      search: query,
      page_size: 20,
    },
  });
  return response.data;
};

exports.getGameDetails = async (id) => {
  const response = await rawgClient.get(`/games/${id}`);
  return response.data;
};

exports.getGameScreenshots = async (id) => {
  const response = await rawgClient.get(`/games/${id}/screenshots`);
  return response.data;
};

exports.getGameMovies = async (id) => {
  const response = await rawgClient.get(`/games/${id}/movies`);
  return response.data;
};

exports.getSimilarGames = async (id) => {
  const response = await rawgClient.get(`/games/${id}/game-series`); // Using game-series for similar vibe
  return response.data;
};

exports.getGameAdditions = async (id) => {
  const response = await rawgClient.get(`/games/${id}/additions`);
  return response.data;
};
