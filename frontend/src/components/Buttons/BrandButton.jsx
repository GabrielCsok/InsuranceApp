// src/components/Buttons/BrandButton.jsx
import React from "react";

const BrandButton = ({ brand, icon, text }) => {
  return (
    <a href="#" className={`btn btn-${brand} btn-block`}>
      <i className={icon}></i> {text}
    </a>
  );
};

export default BrandButton;