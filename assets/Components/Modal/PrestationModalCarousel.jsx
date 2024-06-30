import React, { useEffect, useState } from "react";
import imagesForCarouselAPI from "../../Services/imageForCarouselAPI";
import Carousel from "react-bootstrap/Carousel";
import PrestationModalCarouselImages from "./PrestationModalCarouselImages";

export default function PrestaionModalCarousel() {
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
    <Carousel className="h-400">
    {imagesForCarousel.map((image, index) => (
      <Carousel.Item className="" interval={2000}>
        <div className="h-400 d-flex justify-content-around align-items-center">
                      <PrestationModalCarouselImages
              key={index}
              src={`./image/${image.src}`}
              alt={`./image/${image.alt}`}
            />
        </div>
        
      </Carousel.Item>
    ))}
    </Carousel>
  );
}
