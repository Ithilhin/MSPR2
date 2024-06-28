import React, { useEffect, useState } from "react";
import imagesForCarouselAPI from "../Services/imageForCarouselAPI";
import Carousel from "react-bootstrap/Carousel";
import CarouselImage from "./CarouselImage";

export default function CarouselDisplay() {
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

  const pairs = [];
  for (let i = 0; i < imagesForCarousel.length; i += 2) {
    pairs.push(imagesForCarousel.slice(i, i + 2));
  }

  return (
    <Carousel className="bg-custom-blue h-400">
      {pairs.map((pair, index) => (
        <Carousel.Item className="" key={index} interval={3000}>
          <div className="h-400 d-flex justify-content-around align-items-center">
            {pair.map((image, imageIndex) => (
              <CarouselImage
                src={`./image/${image.src}`}
                alt={`./image/${image.alt}`}
              />
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
