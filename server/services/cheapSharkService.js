const axios = require("axios");

const CHEAPSHARK_API_URL = process.env.CHEAPSHARK_API_URL || "https://www.cheapshark.com/api/1.0";

const cheapSharkClient = axios.create({
  baseURL: CHEAPSHARK_API_URL,
});

let storeMapCache = null;

const getStores = async () => {
  if (storeMapCache) return storeMapCache;
  try {
    const response = await cheapSharkClient.get("/stores");
    storeMapCache = {};
    response.data.forEach(store => {
      storeMapCache[store.storeID] = store.storeName;
    });
    return storeMapCache;
  } catch (e) {
    console.error("Failed to fetch stores from CheapShark");
    return {};
  }
};

exports.searchDeals = async (title) => {
  const response = await cheapSharkClient.get("/games", {
    params: {
      title,
      limit: 5,
    },
  });
  return response.data;
};

exports.getGameDeals = async (gameId) => {
  const [response, storeMap] = await Promise.all([
    cheapSharkClient.get("/games", { params: { id: gameId } }),
    getStores()
  ]);
  
  const dealData = response.data;
  
  // Attach store names to deals
  if (dealData && dealData.deals) {
    dealData.deals = dealData.deals.map(deal => ({
      ...deal,
      storeName: storeMap[deal.storeID] || `Store #${deal.storeID}`
    }));
  }
  
  return dealData;
};
