// src/components/Buttons/SplitButton.jsx
import React from "react";

const SplitButton = ({ color, icon, text, size = "" }) => {
  return (
    <a href="#" className={`btn btn-${color} btn-icon-split ${size}`}>
      <span className="icon text-white-50">
        <i className={icon}></i>
      </span>
      <span className="text">{text}</span>
    </a>
  );
};

export default SplitButton;