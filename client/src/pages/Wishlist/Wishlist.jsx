import { useAuth } from "../../context/AuthContext";
import GameSection from "../../components/GameSection/GameSection";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const Wishlist = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">You need to log in</h2>
        <p className="text-gray-400">Please sign in to view your wishlist.</p>
      </div>
    );
  }

  const wishlistGames = user.wishlist?.map(item => ({
    id: item.gameId,
    title: item.title,
    image: item.image,
  })) || [];

  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh]">
      <SectionTitle 
        title="Your Wishlist" 
        subtitle="Games you've saved for later."
      />
      
      {wishlistGames.length > 0 ? (
        <GameSection
          title=""
          games={wishlistGames}
          loading={false}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Your wishlist is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
