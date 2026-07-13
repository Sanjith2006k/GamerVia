const QuickStats = ({ game }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <div className="glass p-4 rounded-xl text-center">
        <span className="block text-xs uppercase tracking-wider text-text-muted mb-1">Release Date</span>
        <span className="font-semibold text-white">{game.released || "TBA"}</span>
      </div>
      
      <div className="glass p-4 rounded-xl text-center">
        <span className="block text-xs uppercase tracking-wider text-text-muted mb-1">Average Playtime</span>
        <span className="font-semibold text-white">{game.playtime ? `${game.playtime} Hours` : "Unknown"}</span>
      </div>
      
      <div className="glass p-4 rounded-xl text-center">
        <span className="block text-xs uppercase tracking-wider text-text-muted mb-1">Age Rating</span>
        <span className="font-semibold text-white">{game.esrb_rating}</span>
      </div>

      <div className="glass p-4 rounded-xl text-center">
        <span className="block text-xs uppercase tracking-wider text-text-muted mb-1">Genres</span>
        <span className="font-semibold text-white truncate block">{game.genres?.join(", ") || "N/A"}</span>
      </div>
    </div>
  );
};

export default QuickStats;
