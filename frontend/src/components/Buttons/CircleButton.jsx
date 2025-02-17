// src/components/Buttons/CircleButton.jsx
import React from "react";

const CircleButton = ({ color, icon, size = "" }) => {
  return (
    <a href="#" className={`btn btn-${color} btn-circle ${size}`}>
      <i className={icon}></i>
    </a>
  );
};

export default CircleButton;