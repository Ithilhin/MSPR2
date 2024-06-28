import React, { useEffect, useState } from "react";
import imagesForCarouselAPI from "../Services/imageForCarouselAPI";

export default function Carousel() {
  const [imagesForCarousel, setImagesForCarousel] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    imagesForCarouselAPI
      .getImagesForCarousel()
      .then((data) => {
        const filteredData = data.filter((image) => {
          return image.active;
        });
        console.log("from useEffect in Carousel: filtered data", filteredData);
        return filteredData;
      })
      .then((data) => setImagesForCarousel(data))
      .catch((error) => console.log(error.response));
    // setLoading(false);
  }, []);

  return (
    <div>
      <section
        className="bg-custom-blue"
        style={{ height: "400px" }}
        id="Carrousel"
      >
        <div
          className="carousel slide h-100 d-flex align-items-center"
          id="carousel"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-inner">
            {imagesForCarousel.map((image, index) => (
              <React.Fragment key={index}>
                <div key={index} className="carousel-item active">
                  <div className="row g-0">
                    <div className="col-md-1 col-2"></div>
                    <div className="col-md-4 col-8">
                      <img
                        src={`./image/${image.src}`}
                        className="d-block w-100 carousel-image rounded"
                        alt={`./image/${image.alt}`}
                      />
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                      <img
                        src={`./image/${image.src}`}
                        className="d-block w-100 carousel-image rounded"
                        alt={`./image/${image.alt}`}
                      />
                    </div>
                  </div>
                </div>
                ;
              </React.Fragment>
            ))}
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
