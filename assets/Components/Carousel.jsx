import React from "react";

export default function Carousel() {
  return (
    <div>
      <section className="bg-custom-blue" style={{height: "400px"}} id="Carrousel">
        <div
          className="carousel slide h-100 d-flex align-items-center"
          id="carousel"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row g-0">
                <div className="col-md-1 col-2"></div>
                <div className="col-md-4 col-8">
                  <img
                    src="./image/carousel1.jpg"
                    className="d-block w-100 carousel-image rounded"
                    alt="Image carousel elagage"
                  />
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-4">
                  <img
                    src="./image/carousel2.jpg"
                    className="d-block w-100 carousel-image rounded"
                    alt="Image carousel elagage"
                  />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row g-0">
                <div className="col-md-1 col-2"></div>
                <div className="col-md-4 col-8">
                  <img
                    src="./image/carousel3.jpg"
                    className="d-block w-100 carousel-image rounded"
                    alt="Image carousel elagage"
                  />
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-4">
                  <img
                    src="./image/carousel4.jpg"
                    className="d-block w-100 carousel-image rounded"
                    alt="Image carousel elagage"
                  />
                </div>
              </div>
            </div>
            <div className="d-none">
              <div className="row g-0">
                <div className="col-md-1 col-2"></div>
                <div className="col-md-4 col-8">
                  <img
                    src="./image/carousel2.jpg"
                    className="d-block w-100 carousel-image rounded"
                    alt="Image carousel elagage"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev justify-content-start p-4"
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true">
              <i className="fas fa-chevron-left text-dark fa-3x"></i>
            </span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next justify-content-end p-4"
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true">
              <i className="fas fa-chevron-right text-dark fa-3x"></i>
            </span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    </div>
  );
}
