import { motion } from "motion/react";
import GameCard from "../GameCard/GameCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GameSection = ({ title, subtitle, games, loading = false, viewAllLink }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionTitle title={title} subtitle={subtitle} className="mb-0" />
          {viewAllLink && (
            <Link 
              to={viewAllLink} 
              className="group flex items-center gap-2 text-accent hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider"
            >
              View All 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading ? (
            <LoadingSkeleton type="card" count={5} />
          ) : games?.length > 0 ? (
            games.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <GameCard game={game} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center py-12 text-text-muted">
              No games found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GameSection;
