import React from "react";

export default function RealisationDisplayImages({ src, text, title }) {
  return (
    <>
      <div className="col-1"></div>
      <div className="col">
        <div className="card h-100 border border-primary">
          <img
            src={src}
            className="card-img-top"
          />
          <div className="card-body bg-white text-primary">
            <h5 className="card-title text-center">{title}</h5>
            <p className="card-text text-center ">{text}</p>
          </div>
        </div>
      </div>
    </>
  );
}
