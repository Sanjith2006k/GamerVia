import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { MessageSquare, Globe, Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/50 mt-auto">
      {/* Call to Action Section */}
      <div className="border-b border-white/10 py-16 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Still looking?</h2>
          <p className="text-gray-400 mb-8 text-lg">Discover more games you'll love.</p>
          <Link to="/search">
            <Button variant="primary" className="px-8 py-3 text-lg rounded-full">
              Browse More Games
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
        <Link to="/">
          <Logo className="mb-4 mx-auto" />
        </Link>
        
        <p className="text-text-muted max-w-sm mb-8">
          Your ultimate destination to discover, compare, and play the best games across all platforms.
        </p>

        <div className="flex gap-6 mb-8">
          <a href="#" className="text-text-muted hover:text-accent transition-colors"><MessageSquare size={24} /></a>
          <a href="#" className="text-text-muted hover:text-accent transition-colors"><Globe size={24} /></a>
          <a href="#" className="text-text-muted hover:text-accent transition-colors"><Gamepad2 size={24} /></a>
        </div>

        <ul className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <li><Link to="/games" className="text-text-muted hover:text-white transition-colors">Browse Games</Link></li>
          <li><Link to="/trending" className="text-text-muted hover:text-white transition-colors">Trending</Link></li>
          <li><Link to="/popular" className="text-text-muted hover:text-white transition-colors">Popular</Link></li>
        </ul>

        <div className="text-text-muted text-sm pt-8 border-t border-white/5 w-full max-w-lg">
          <p>&copy; {new Date().getFullYear()} GamerVia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
