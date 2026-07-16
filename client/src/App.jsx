import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import GameDetails from "./pages/GameDetails/GameDetails";
import AuthPage from "./pages/Auth/AuthPage";
import Wishlist from "./pages/Wishlist/Wishlist";
import { healthService } from "./services/api";
import ServerLoadingScreen from "./components/ServerLoadingScreen/ServerLoadingScreen";

export default function App() {
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Set a timeout to show the loading screen if the backend takes longer than 800ms
    const timer = setTimeout(() => setShowLoading(true), 800);

    const checkBackend = async () => {
      try {
        await healthService.checkHealth();
      } catch (error) {
        console.error("Backend health check failed, but continuing:", error);
      } finally {
        clearTimeout(timer);
        setIsBackendReady(true);
      }
    };

    checkBackend();
  }, []);

  if (!isBackendReady) {
    return showLoading ? <ServerLoadingScreen /> : null;
  }

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
