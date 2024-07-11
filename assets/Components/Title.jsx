import React from "react";

// Title component: Displays a logo and a text title
export default function Title({ text }) {
  return (
    <div className="d-flex flex-column align-items-center pb-3">
      {/* Logo image */}
      <img
        className="col-12 col-md-8 col-xl-6 mt-3"
        src="./image/logo-canopees.png" // Path to the logo image
        alt="logo Canopées" // Alternative text for the logo
      />
      {/* Title text */}
      <h2 className="text-center mt-4 mb-0 fw-bold">{text}</h2>
    </div>
  );
}
