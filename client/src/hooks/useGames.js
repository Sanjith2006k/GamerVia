import { useQuery } from "@tanstack/react-query";
import { gameService } from "../services/api";

export const useTrendingGames = () => {
  return useQuery({
    queryKey: ["games", "trending"],
    queryFn: gameService.getTrending,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};

export const usePopularGames = () => {
  return useQuery({
    queryKey: ["games", "popular"],
    queryFn: gameService.getPopular,
    staleTime: 1000 * 60 * 15,
  });
};

export const useNewReleases = () => {
  return useQuery({
    queryKey: ["games", "new"],
    queryFn: gameService.getNewReleases,
    staleTime: 1000 * 60 * 15,
  });
};

export const useSearchGames = (query) => {
  return useQuery({
    queryKey: ["games", "search", query],
    queryFn: () => gameService.searchGames(query),
    enabled: !!query, // Only run the query if a search term exists
    staleTime: 1000 * 60 * 5,
  });
};

export const useGameDetails = (id) => {
  return useQuery({
    queryKey: ["game", id],
    queryFn: () => gameService.getGameDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30, // Game details don't change often
  });
};
