import React from "react";

export default function RealisationDisplayImages({ src, text, title }) {
  return (
    <>
      <div className="col-1"></div>
      <div className="col py-3">
        <div className="card border border-primary h-100">
          <img
            src={src}
            className="card-img-top"
          />
          <div className="card-body bg-white text-primary d-flex flex-column">
            <h5 className="card-title text-center">{title}</h5>
            <p className="card-text text-center flex-grow-1">{text}</p>
          </div>
        </div>
      </div>
    </>
  );
}
