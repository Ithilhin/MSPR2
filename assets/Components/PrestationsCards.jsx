import React from 'react'
import Card from 'react-bootstrap/Card';

function PrestationsCards({ title, index}) {
  return (
    <div key={index} className="col-lg col-8 position-relative m-auto h-400">
            <p className="fw-bold vertical-text mt-4 ">{title}</p>
            <div
              className="darkBackground animatedBackground h-100 bg-dark"
              style={{ opacity: "0.5" }}
              id={title}
            ></div>
            <img
              className="object-fit-cover w-100 h-100"
              src={`./image/presta${index+1}.jpg`}
              alt=""
            />
          </div>
  );
}

export default PrestationsCards;