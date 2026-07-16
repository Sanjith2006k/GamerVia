import React from "react";
import Logo from "../Logo/Logo";
import "./ServerLoadingScreen.css";

const ServerLoadingScreen = () => {
  return (
    <div className="server-loading-overlay">
      <div className="server-loading-content">
        <Logo className="server-loading-logo" />
        <h2 className="server-loading-title">Waking up the server...</h2>
        <p className="server-loading-subtitle">
          Since GamerVia uses a free hosting service, the backend goes to sleep after inactivity. It might take up to 30-50 seconds to wake up on the first load. Thank you for your patience!
        </p>
        <div className="server-loading-spinner">
          <div className="spinner-circle"></div>
        </div>
      </div>
    </div>
  );
};

export default ServerLoadingScreen;
