import React from "react";

export default function Prestations() {
  return (
    <div>
      <div
        className="container-fluid row g-0 m-0 mt-5 mb-lg-5"
        style={{ overflow: "hidden" }}
      >
        <div className="col-lg col-8 position-relative m-auto h-400">
          <p className="fw-bold vertical-text mt-4">CONCEPTION/REALISATION</p>
          <div
            className="darkBackground animatedBackground h-100 bg-dark"
            style={{ opacity: "0.5" }}
            id="prestation1"
          ></div>
          <img
            className="object-fit-cover w-100 h-100"
            src="./image/presta1.jpg"
            alt=""
          />
        </div>
        <div className="col-lg col-8 position-relative m-auto h-400">
          <p className="fw-bold vertical-text mt-4">ENTRETIEN</p>
          <div
            className="darkBackground animatedBackground h-100 bg-dark"
            style={{ opacity: "0.5" }}
            id="prestation2"
          ></div>
          <img
            className="object-fit-cover w-100 h-100"
            src="./image/presta2.jpeg"
            alt=""
          />
        </div>
        <div className="col-lg col-8 position-relative m-auto h-400">
          <p className="fw-bold vertical-text mt-4">TAILLE</p>
          <div
            className="darkBackground animatedBackground h-100 bg-dark"
            style={{ opacity: "0.5" }}
            id="prestation3"
          ></div>
          <img
            className="object-fit-cover w-100 h-100"
            src="./image/presta3.jpg"
            alt=""
          />
        </div>
        <div className="col-lg col-8 position-relative m-auto h-400">
          <p className="e fw-bold vertical-text mt-4">ELAGAGE/ABBATAGE</p>
          <div
            className="darkBackground animatedBackground h-100 bg-dark"
            style={{ opacity: "0.5" }}
            id="prestation4"
          ></div>
          <img
            className="object-fit-cover w-100 h-100"
            src="./image/presta4.jpg"
            alt=""
          />
        </div>
        <div className="col-lg col-8 position-relative m-auto h-400">
          <p className="fw-bold vertical-text mt-4">VALORISATION</p>
          <div
            className="darkBackground h-100 bg-dark"
            style={{ opacity: "0.5" }}
            id="prestation5"
          ></div>
          <img
            className="object-fit-cover w-100 h-100"
            src="./image/presta5.jpg"
            alt=""
          />
        </div>
      </div>
      {/* TODO : add animation on darkbackground */}
      {/* TODO: create subcomponents */}
      {/* TODO: add modal */}
    </div>
  );
}
