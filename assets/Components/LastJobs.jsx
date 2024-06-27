import React from "react";

export default function LastJobs() {
  return (
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
                  <div className="col-1"></div>
                  <div className="col">
                    <div className="card h-100 border border-primary">
                      <img src="./image/rea1.jpg" className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          Jardin à murets et parement en pierre étagés
                        </h5>
                        <p className="card-text text-center">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-1"></div>
                  <div className="col">
                    <div className="card h-100 border border-primary">
                      <img src="./image/rea2.jpg" className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          Aménagement de jardin à Saint Amand Les Eaux
                        </h5>
                        <p className="card-text text-center">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-sm-block col-1"></div>
                  <div className="d-none d-sm-block col">
                    <div className="card h-100 border border-primary">
                      <img src="./image/rea3.jpg" className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          Rénovation : un jardin provencal se redéploie autour
                          de son mas
                        </h5>
                        <p className="card-text text-center">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="row g-0">
                  <div className="col-1"></div>
                  <div className="col">
                    <div className="card h-100border border-primary">
                      <img src="./image/rea2.jpg" className="card-img-top" />
                      <div className="card-body d-grow-1">
                        <h5 className="card-title text-center">
                          Jardin à murets et parement en pierre étagés
                        </h5>
                        <p className="card-text text-center">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-1"></div>
                  <div className="col">
                    <div className="card h-100 border border-primary">
                      <img src="./image/rea3.jpg" className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          Aménagement de jardin à Saint Amand Les Eaux
                        </h5>
                        <p className="card-text text-center">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-sm-block col-1"></div>
                  <div className="d-none d-sm-block col">
                    <div className="card h-100 border border-primary">
                      <img src="./image/rea1.jpg" className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          Rénovation : un jardin provencal se redéploie autour
                          de son mas
                        </h5>
                        <p className="card-text text-center">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-1"></div>
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
  );
}
