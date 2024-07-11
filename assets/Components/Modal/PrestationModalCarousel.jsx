import React, { useEffect, useState } from "react";
import imagesAPI from "../../Services/imageAPI";
import Carousel from "react-bootstrap/Carousel";
import PrestationModalCarouselImages from "./PrestationModalCarouselImages";

export default function PrestaionModalCarousel({ prestation}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    imagesAPI
      .getImages()
      .then((data) => {
        const filteredData = data.filter((image) => {
            
            console.log("ia", image.active);
            return  ((prestation === image.prestation.title) && (image.active));
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
      {!loading && images.map((image, index) => (
        <Carousel.Item key={index} className="text-primary" interval={2000}>
          <div className="h-400 d-flex justify-content-around align-items-center">
            <PrestationModalCarouselImages
              src={`./uploads/images/${image.src}`}
              alt={image.alt}
            />
          </div>
        </Carousel.Item>
      )) || <p>Chargement...</p>}
    </Carousel>
  );
}
