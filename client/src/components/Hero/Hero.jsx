import { motion } from "motion/react";
import { Play, Info } from "lucide-react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const Hero = ({ featuredGame, loading }) => {
  if (loading || !featuredGame) {
    return <LoadingSkeleton type="hero" />;
  }

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-start overflow-hidden">
      {/* Background Image & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src={featuredGame.image}
          alt={featuredGame.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent w-3/4"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-3 py-1 mb-4 border border-accent/30 bg-accent/10 text-accent rounded-full text-sm font-semibold tracking-wider">
            FEATURED
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 drop-shadow-lg leading-tight">
            {featuredGame.title}
          </h1>
          {featuredGame.description && (
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed drop-shadow-md">
              {featuredGame.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2">
              <Play size={20} fill="currentColor" /> Play Trailer
            </Button>
            <Link to={`/game/${featuredGame.id}`}>
              <Button variant="secondary" size="lg" className="gap-2">
                <Info size={20} /> More Info
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
