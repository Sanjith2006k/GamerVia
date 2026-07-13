import { useSearchParams } from "react-router-dom";
import { useSearchGames } from "../../hooks/useGames";
import GameSection from "../../components/GameSection/GameSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: searchResponse, isLoading } = useSearchGames(query);
  const searchResults = searchResponse?.data || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto mb-12">
        <SectionTitle 
          title="Search Games" 
          subtitle="Find your next favorite game across all platforms and stores."
          className="text-center"
        />
        <SearchBar className="w-full text-lg" />
      </div>

      {query && (
        <GameSection
          title={`Results for "${query}"`}
          games={searchResults}
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default Search;
