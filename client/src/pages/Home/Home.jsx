import Hero from "../../components/Hero/Hero";
import GameSection from "../../components/GameSection/GameSection";
import { useTrendingGames, usePopularGames, useNewReleases } from "../../hooks/useGames";

const Home = () => {
  const { data: trendingResponse, isLoading: trendingLoading } = useTrendingGames();
  const { data: popularResponse, isLoading: popularLoading } = usePopularGames();
  const { data: newResponse, isLoading: newLoading } = useNewReleases();

  const trendingGames = trendingResponse?.data || [];
  const popularGames = popularResponse?.data || [];
  const newGames = newResponse?.data || [];

  const featuredGame = trendingGames.length > 0 ? trendingGames[0] : null;

  return (
    <div className="w-full">
      <Hero featuredGame={featuredGame} loading={trendingLoading} />
      <div className="py-8">
        <GameSection 
          title="Trending Now" 
          subtitle="The most played games this week"
          games={trendingGames.slice(1, 6)}
          loading={trendingLoading}
          viewAllLink="/trending"
        />
        
        <GameSection 
          title="Popular Games" 
          subtitle="Highest rated by the community"
          games={popularGames.slice(0, 5)}
          loading={popularLoading}
          viewAllLink="/popular"
        />

        <GameSection 
          title="New Releases" 
          subtitle="Fresh out of the oven"
          games={newGames.slice(0, 5)}
          loading={newLoading}
        />
      </div>
    </div>
  );
};

export default Home;
