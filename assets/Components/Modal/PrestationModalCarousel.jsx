import React, { useEffect, useState } from "react";
import imagesAPI from "../../Services/imageAPI";
import Carousel from "react-bootstrap/Carousel";
import PrestationModalCarouselImages from "./PrestationModalCarouselImages";

// PrestaionModalCarousel dynamically displays a carousel of images related to a specific prestation.
// Utilizes react-bootstrap Carousel for UI, with images fetched from a custom API.
// Filters images based on prestation title and active status, ensuring relevance and visibility.
// Implements loading state management to enhance UX during data fetching.
// Carousel items are populated with images and configured for automatic transition.
export default function PrestaionModalCarousel({ prestation }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    imagesAPI
      .getImages()
      .then((data) => {
        const filteredData = data.filter((image) => {
          console.log("ia", image.active);
          return prestation === image.prestation.title && image.active;
        });
        return filteredData;
      })
      .then((data) => setImages(data))
      .catch((error) => console.log(error.response))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Carousel className="h-400" data-bs-theme="dark">
      {(!loading &&
        images.map((image, index) => (
          <Carousel.Item key={index} className="text-primary" interval={2000}>
            <div className="h-400 d-flex justify-content-around align-items-center">
              <PrestationModalCarouselImages
                src={`./uploads/images/${image.src}`}
                alt={image.alt}
              />
            </div>
          </Carousel.Item>
        ))) || <p>Chargement...</p>}
    </Carousel>
  );
}
