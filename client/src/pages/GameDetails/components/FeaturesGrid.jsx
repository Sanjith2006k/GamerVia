const FeaturesGrid = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  // Filter out irrelevant/spam tags to only show primary features
  const importantTags = [
    "Singleplayer", "Multiplayer", "Co-op", "Online Co-Op",
    "Cross-Platform Multiplayer", "Full controller support",
    "Steam Cloud", "Steam Achievements", "VR Support", "Mods"
  ];
  
  const displayTags = tags.filter(tag => importantTags.includes(tag)).slice(0, 8);
  
  // If no "important" tags, just show top 6 tags
  const fallbackTags = displayTags.length > 0 ? displayTags : tags.slice(0, 6);

  return (
    <div className="mb-12">
      <h3 className="text-xl font-heading font-semibold text-white mb-4">Features</h3>
      <div className="flex flex-wrap gap-2">
        {fallbackTags.map((tag, idx) => (
          <span 
            key={idx} 
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FeaturesGrid;
