import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import GameDetails from "./pages/GameDetails/GameDetails";
import AuthPage from "./pages/Auth/AuthPage";
import Wishlist from "./pages/Wishlist/Wishlist";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="game/:id" element={<GameDetails />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
