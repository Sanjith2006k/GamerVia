import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const RelatedGames = ({ games, title = "Similar Games" }) => {
  if (!games || games.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-heading font-semibold text-white mb-6">{title}</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {games.map(game => (
          <Link 
            key={game.id} 
            to={`/game/${game.id}`}
            className="flex-none w-48 md:w-56 glass rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 snap-start"
          >
            <div className="aspect-[3/4] relative">
              <img 
                src={game.image} 
                alt={game.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                <Star size={12} className="text-yellow-400" />
                {game.rating > 0 ? game.rating : "-"}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-white text-sm truncate">{game.title}</h4>
              <span className="text-xs text-text-muted">{game.released?.split("-")[0] || "TBA"}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedGames;
