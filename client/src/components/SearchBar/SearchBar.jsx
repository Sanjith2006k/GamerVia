import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchGames } from "../../hooks/useGames";
import { motion, AnimatePresence } from "motion/react";

const SearchBar = ({ className = "" }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // Use a debounced query for the API call to avoid spamming
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: searchResponse, isLoading } = useSearchGames(debouncedQuery);
  const searchResults = searchResponse?.data || [];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setFocused(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSelectGame = (gameId) => {
    setFocused(false);
    setQuery("");
    navigate(`/game/${gameId}`);
  };

  const showDropdown = focused && query.trim().length > 1;

  return (
    <div ref={wrapperRef} className={`relative group ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted group-focus-within:text-accent transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search for games..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="w-full bg-surface-hover/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white placeholder-text-muted focus:outline-none focus:border-primary focus:bg-surface-hover transition-all duration-300"
        />
      </form>

      {/* Autocomplete Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            {isLoading ? (
              <div className="p-4 text-center text-text-muted text-sm">Searching...</div>
            ) : searchResults.length > 0 ? (
              <div className="flex flex-col">
                {searchResults.slice(0, 5).map((game) => (
                  <button
                    key={game.id}
                    onClick={() => handleSelectGame(game.id)}
                    className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors text-left"
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-12 h-12 object-cover rounded bg-white/5"
                    />
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-sm font-semibold text-white truncate">{game.title}</h4>
                      <p className="text-xs text-text-muted truncate">
                        {game.platforms?.slice(0, 3).join(", ")}
                      </p>
                    </div>
                  </button>
                ))}
                <button
                  onClick={handleSearch}
                  className="p-3 text-center text-sm text-accent hover:bg-white/5 transition-colors border-t border-white/5"
                >
                  View all results
                </button>
              </div>
            ) : (
              <div className="p-4 text-center text-text-muted text-sm">No games found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
