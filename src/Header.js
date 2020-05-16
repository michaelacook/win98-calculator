import React from "react";
import icon from "./icon.png";

const Header = () => {
  return (
    <div className="title-bar">
      <div className="title-bar-text">
        <img id="icon" src={icon} alt="icon" />
        React Calculator
      </div>
      <div className="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
  );
};

export default Header;
