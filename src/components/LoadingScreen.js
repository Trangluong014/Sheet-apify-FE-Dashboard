import React from "react";
import "../components/LoadingScreen.css";

function LoadingScreen() {
  return (
    <div id="loading-wrapper">
      <div id="loading-text">LOADING</div>
      <div id="loading-content"></div>
    </div>
  );
}

export default LoadingScreen;
