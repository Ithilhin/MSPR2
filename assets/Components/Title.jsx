import React from "react";

export default function Title({texte}) {
  return (
    <>
      <img
        className="col-12 col-md-8 col-xl-6 mt-3"
        src="./image/logo-canopees.png"
        alt="logo Canopées"
      />
      <h2 className="text-center mt-4 mb-0 fw-bold">{texte}</h2>
    </>
  );
}
