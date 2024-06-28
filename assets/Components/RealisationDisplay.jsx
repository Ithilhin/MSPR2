import React from "react";
import { useEffect, useState } from "react";
import realisationsAPI from "../Services/realisationsAPI";

export default function RealisationDisplay() {
  const [realisations, setRealisations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    realisationsAPI
      .getRealisations()
      .then((data) => {
        const filteredData = data.filter((realisation) => {
          return realisation.active;
        });
        return filteredData;
      })
      .then((data) => setRealisations(data))
      
      .catch((error) => console.log(error.response));
    setLoading(false);
  }, []);

  return (
    <div>
      <div>
        <section id="">
          <p className="text-dark h1 text-center pt-3">
            Nos dernières réalisations
          </p>
          <section className="my-4" id="CarrouselBottom">
            <div
              className="carousel slide h-100 d-flex align-items-center"
              id="carousel2"
              data-bs-ride="carousel"
              data-bs-interval="200000"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row g-0">
                    {!loading &&
                      realisations.map((realisation, index) => (
                        <React.Fragment key={index}>
                          <div className="col-1"></div>
                          <div className="col">
                            <div className="card h-100 border border-primary">
                              <img
                                src={`./image/${realisation.imageFileName}`}
                                className="card-img-top"
                              />
                              <div className="card-body">
                                <h5 className="card-title text-center">
                                  {realisation.title}
                                </h5>
                                <p className="card-text text-center">
                                    {realisation.text}
                                </p>
                              </div>
                            </div>
                          </div>
                          {index === realisations.length -1 && <div className="col-1"></div>}
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev justify-content-start p-4"
                type="button"
                data-bs-target="#carousel2"
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
                data-bs-target="#carousel2"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true">
                  <i className="fas fa-chevron-right text-dark fa-3x"></i>
                </span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
