import { useParams } from "react-router-dom";
import { useGameDetails } from "../../hooks/useGames";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import { Building2, Layers } from "lucide-react";

import GameHero from "./components/GameHero";
import QuickStats from "./components/QuickStats";
import PriceComparison from "./components/PriceComparison";
import MediaGallery from "./components/MediaGallery";
import SystemReqs from "./components/SystemReqs";
import FeaturesGrid from "./components/FeaturesGrid";
import RelatedGames from "./components/RelatedGames";

const GameDetails = () => {
  const { id } = useParams();
  const { data: response, isLoading } = useGameDetails(id);
  const game = response?.data;

  if (isLoading) {
    return (
      <div className="w-full">
        <LoadingSkeleton type="hero" />
        <div className="container mx-auto px-4 py-8">
          <LoadingSkeleton type="card" count={3} />
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white">Game not found.</h2>
      </div>
    );
  }

  return (
    <div className="w-full pb-16">
      <GameHero game={game} />

      <div className="container mx-auto px-4 mt-8">
        <QuickStats game={game} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2">
            
            <PriceComparison deals={game.deals} />
            
            <MediaGallery screenshots={game.screenshots} movies={game.movies} />
            
            <section className="mb-12">
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">About</h3>
              <div 
                className="text-gray-300 leading-relaxed space-y-4 text-lg prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: game.description }}
              />
            </section>
            
            <SystemReqs rawgData={game} />
            
            <FeaturesGrid tags={game.tags} />
            
            <RelatedGames games={game.additions} title="DLC & Expansions" />
            <RelatedGames games={game.similarGames} title="Similar Games" />

          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-8">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-heading font-semibold text-white mb-6">Game Info</h3>
              
              <div className="space-y-6">
                <div>
                  <span className="flex items-center gap-2 text-text-muted mb-2 text-sm uppercase tracking-wider font-semibold">
                    <Layers size={16} /> Platforms
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms?.map((p, i) => (
                      <span key={i} className="text-sm bg-white/5 px-2 py-1 rounded border border-white/5 text-gray-300">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="flex items-center gap-2 text-text-muted mb-1 text-sm uppercase tracking-wider font-semibold">
                    <Building2 size={16} /> Developers
                  </span>
                  <p className="text-white">{game.developers?.join(", ") || "N/A"}</p>
                </div>

                <div>
                  <span className="flex items-center gap-2 text-text-muted mb-1 text-sm uppercase tracking-wider font-semibold">
                    <Building2 size={16} /> Publishers
                  </span>
                  <p className="text-white">{game.publishers?.join(", ") || "N/A"}</p>
                </div>

                <div>
                  <span className="text-text-muted block text-sm uppercase tracking-wider font-semibold mb-1">
                    Stores
                  </span>
                  <p className="text-white">{game.stores?.join(", ") || "N/A"}</p>
                </div>

                <div>
                  <span className="text-text-muted block text-sm uppercase tracking-wider font-semibold mb-1">
                    Achievements
                  </span>
                  <p className="text-white">{game.achievements_count || 0} Trophies</p>
                </div>
              </div>
            </div>
            
            {game.reddit_url && (
              <a href={game.reddit_url} target="_blank" rel="noreferrer" className="block">
                <div className="glass p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                  <p className="text-sm text-gray-400">Join the discussion on Reddit</p>
                </div>
              </a>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
