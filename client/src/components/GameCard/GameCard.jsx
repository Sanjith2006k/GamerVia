import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const GameCard = ({ game }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass rounded-xl overflow-hidden group cursor-pointer h-full flex flex-col transition-all duration-300 hover:glow-purple"
    >
      <Link to={`/game/${game.id}`} className="block relative aspect-video overflow-hidden">
        <motion.img
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex gap-2">
            {game.platforms?.map((platform, idx) => (
              <span
                key={idx}
                className="text-xs bg-white/20 backdrop-blur px-2 py-1 rounded text-white"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/game/${game.id}`}>
          <h3 className="font-heading font-semibold text-lg text-white group-hover:text-accent transition-colors line-clamp-1">
            {game.title}
          </h3>
        </Link>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-bold text-lg">
            {game.price === 0 ? "Free" : `$${game.price}`}
          </span>
          <button className="bg-surface-hover hover:bg-primary transition-colors p-2 rounded-lg group/btn text-white">
            <Plus size={18} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
