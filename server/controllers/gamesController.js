const rawgService = require("../services/rawgService");
const cheapSharkService = require("../services/cheapSharkService");

// Map RAWG game object to our frontend expected format
const mapRawgToGame = (game) => {
  return {
    id: game.id,
    title: game.name,
    image: game.background_image,
    platforms: game.platforms?.map((p) => p.platform.name) || [],
    price: null, // Default to null, since price is not fetched in bulk
    rating: game.rating,
    released: game.released,
  };
};

exports.getTrendingGames = async (req, res, next) => {
  try {
    const data = await rawgService.getTrendingGames();
    const games = data.results.map(mapRawgToGame);
    res.json({ success: true, data: games });
  } catch (error) {
    next(error);
  }
};

exports.getPopularGames = async (req, res, next) => {
  try {
    const data = await rawgService.getPopularGames();
    const games = data.results.map(mapRawgToGame);
    res.json({ success: true, data: games });
  } catch (error) {
    next(error);
  }
};

exports.getNewReleases = async (req, res, next) => {
  try {
    const data = await rawgService.getNewReleases();
    const games = data.results.map(mapRawgToGame);
    res.json({ success: true, data: games });
  } catch (error) {
    next(error);
  }
};

exports.searchGames = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: "Query parameter 'q' is required" });
    }

    const data = await rawgService.searchGames(q);
    
    // We can also concurrently search CheapShark to get prices, 
    // but to avoid massive API delays, we just map the initial RAWG data.
    const games = data.results.map(mapRawgToGame);
    
    res.json({ success: true, data: games });
  } catch (error) {
    next(error);
  }
};

exports.getGameDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Concurrently fetch all data for premium profile
    const [rawgData, screenshots, movies, similarGames, additions] = await Promise.all([
      rawgService.getGameDetails(id).catch(e => null),
      rawgService.getGameScreenshots(id).catch(e => ({ results: [] })),
      rawgService.getGameMovies(id).catch(e => ({ results: [] })),
      rawgService.getSimilarGames(id).catch(e => ({ results: [] })),
      rawgService.getGameAdditions(id).catch(e => ({ results: [] }))
    ]);

    if (!rawgData) {
      return res.status(404).json({ success: false, message: "Game not found" });
    }

    // Attempt to fetch price from cheapshark
    let cheapSharkDeals = null;
    try {
      const searchRes = await cheapSharkService.searchDeals(rawgData.name);
      if (searchRes && searchRes.length > 0) {
        // Just take the first match for simplicity
        const dealData = await cheapSharkService.getGameDeals(searchRes[0].gameID);
        cheapSharkDeals = dealData;
      }
    } catch (e) {
      console.warn("Failed to fetch CheapShark data for", rawgData.name);
    }

    const gameDetails = {
      id: rawgData.id,
      title: rawgData.name,
      description: rawgData.description_raw || rawgData.description,
      image: rawgData.background_image,
      image_additional: rawgData.background_image_additional,
      platforms: rawgData.platforms?.map((p) => p.platform.name) || [],
      genres: rawgData.genres?.map((g) => g.name) || [],
      developers: rawgData.developers?.map((d) => d.name) || [],
      publishers: rawgData.publishers?.map((p) => p.name) || [],
      rating: rawgData.rating,
      released: rawgData.released,
      website: rawgData.website,
      deals: cheapSharkDeals,
      metacritic: rawgData.metacritic,
      playtime: rawgData.playtime,
      esrb_rating: rawgData.esrb_rating?.name || "Not Rated",
      tags: rawgData.tags?.map((t) => t.name) || [],
      achievements_count: rawgData.achievements_count,
      reddit_url: rawgData.reddit_url,
      stores: rawgData.stores?.map(s => s.store.name) || [],
      
      // Extended media
      screenshots: screenshots.results.map(s => s.image),
      movies: movies.results.map(m => ({ name: m.name, preview: m.preview, data: m.data })),
      
      // Relations
      similarGames: similarGames.results.slice(0, 5).map(mapRawgToGame),
      additions: additions.results.slice(0, 5).map(mapRawgToGame)
    };

    res.json({ success: true, data: gameDetails });
  } catch (error) {
    next(error);
  }
};
