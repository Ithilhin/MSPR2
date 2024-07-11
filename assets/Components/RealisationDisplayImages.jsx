import React from "react";

// Define a functional component to display images for realisations
export default function RealisationDisplayImages({ src, text, title }) {
  return (
    <>
      <div className="col-1"></div> {/* Empty column for spacing */}
      <div className="col my-3">
        <div className="card border border-primary h-100">
          <img
            src={src} // Image source passed as a prop
            className="card-img-top" // Bootstrap class for top image in a card
          />
          <div className="card-body bg-white text-primary d-flex flex-column">
            <h5 className="card-title text-center">{title}</h5>{" "}
            {/* Realisation title */}
            <p className="card-text text-center flex-grow-1">{text}</p>{" "}
            {/* Realisation description */}
          </div>
        </div>
      </div>
    </>
  );
}
