import { motion } from "motion/react";
import { Star, Heart } from "lucide-react";
import Button from "../../../components/Button/Button";
import { useAuth } from "../../../context/AuthContext";

const GameHero = ({ game }) => {
  const { user, toggleWishlist } = useAuth();
  
  const inWishlist = user?.wishlist?.some(item => item.gameId === game.id);

  const handleWishlist = async () => {
    if (!user) {
      alert("Please log in to add to your wishlist");
      return;
    }
    await toggleWishlist(game.id, game.title, game.image);
  };

  const getStatusColor = (rating) => {
    if (rating >= 80) return "text-green-400 border-green-400";
    if (rating >= 50) return "text-yellow-400 border-yellow-400";
    return "text-red-400 border-red-400";
  };

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] flex items-end">
      {/* Background Cover */}
      <div className="absolute inset-0 z-0">
        <img
          src={game.image_additional || game.image}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        {/* Dark gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent w-full md:w-3/4"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative pb-12 flex flex-col md:flex-row items-end gap-12">
        {/* Box Art */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          src={game.image}
          alt={`${game.title} cover`}
          className="w-48 md:w-64 rounded-xl shadow-2xl border border-white/10 hidden md:block aspect-[3/4] object-cover"
        />
        
        {/* Title and Metadata */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-primary/20 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-accent/20">
              {game.released ? "Released" : "Upcoming"}
            </span>
            {game.esrb_rating && game.esrb_rating !== "Not Rated" && (
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                {game.esrb_rating}
              </span>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-6 drop-shadow-md leading-tight"
          >
            {game.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-300">
            {game.metacritic && (
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 font-bold text-lg ${getStatusColor(game.metacritic)} bg-background/50 backdrop-blur`}>
                {game.metacritic}
              </div>
            )}
            
            <div className="flex flex-col">
              <span className="text-text-muted text-xs uppercase tracking-wider">Developer</span>
              <span className="font-medium text-white">{game.developers?.[0] || "Unknown"}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-text-muted text-xs uppercase tracking-wider">Publisher</span>
              <span className="font-medium text-white">{game.publishers?.[0] || "Unknown"}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {game.deals?.deals?.length > 0 ? (
               <a href={`https://www.cheapshark.com/redirect?dealID=${game.deals.deals[0].dealID}`} target="_blank" rel="noreferrer">
                 <Button variant="primary" className="px-8 py-3 text-lg font-bold">
                   Buy for ${game.deals.deals[0].price}
                 </Button>
               </a>
            ) : game.website ? (
               <a href={game.website} target="_blank" rel="noreferrer">
                 <Button variant="primary" className="px-8 py-3 text-lg font-bold">
                   Official Website
                 </Button>
               </a>
            ) : null}
            
            <Button 
              onClick={handleWishlist}
              variant={inWishlist ? "secondary" : "outline"}
              className="gap-2 px-6"
            >
              <Heart size={20} fill={inWishlist ? "currentColor" : "none"} /> 
              {inWishlist ? "Wishlisted" : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHero;
