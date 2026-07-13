import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Heart, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import Button from "../Button/Button";
import { useAuth } from "../../context/AuthContext";

const links = [
  { name: "Home", path: "/" },
  { name: "Trending", path: "/trending" },
  { name: "Popular", path: "/popular" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-white/10 shadow-lg" : "bg-transparent py-2"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-accent" : "text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Search & Actions */}
        <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
          <SearchBar className="max-w-xs w-full" />
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/wishlist" className="text-white hover:text-accent transition-colors">
                <Heart size={20} />
              </Link>
              <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                <LogOut size={16} /> Logout
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-accent transition-colors focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <SearchBar className="w-full" />
              <nav className="flex flex-col gap-2">
                {links.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? "bg-primary/20 text-accent" : "text-white hover:bg-white/5"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
                {user && (
                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? "bg-primary/20 text-accent" : "text-white hover:bg-white/5"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Wishlist
                  </NavLink>
                )}
              </nav>
              {user ? (
                <Button variant="outline" className="w-full mt-2" onClick={() => { logout(); setMenuOpen(false); }}>
                  Logout
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" className="w-full mt-2">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
