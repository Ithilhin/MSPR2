import React, { useEffect, useState } from "react";
import imagesForCarouselAPI from "../Services/imageForCarouselAPI";
import Carousel from "react-bootstrap/Carousel";
import CarouselDisplayImages from "./CarouselDisplayImages";

export default function CarouselDisplay() {
  const [imagesForCarousel, setImagesForCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

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
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderCarouselItems = () => {
    if (isLargeScreen) {
      // Logic for large screens (display pairs)
      const pairs = [];
      for (let i = 0; i < imagesForCarousel.length; i += 2) {
        pairs.push(imagesForCarousel.slice(i, i + 2));
      }

      return pairs.map((pair, index) => (
        <Carousel.Item key={index} interval={3000}>
          <div className="h-400 d-flex justify-content-around align-items-center">
            {pair.map((image, imageIndex) => (
              <CarouselDisplayImages
                key={imageIndex}
                src={`./uploads/images/${image.src}`}
                alt={image.alt}
              />
            ))}
          </div>
        </Carousel.Item>
      ));
    } else {
      // Logic for small screens (display single images)
      return imagesForCarousel.map((image, imageIndex) => (
        <Carousel.Item key={imageIndex} interval={3000}>
          <div className="h-400 d-flex justify-content-around align-items-center">
          <CarouselDisplayImages
            src={`./uploads/images/${image.src}`}
            alt={image.alt}
          />
          </div>
        </Carousel.Item>
      ));
    }
  };

  // return (
  //   <Carousel className="bg-custom-blue h-400" data-bs-theme="dark">
  //     {/* {(!loading &&
  //       pairs.map((pair, index) => (
  //         <Carousel.Item className="" key={index} interval={3000}>
  //           <div className="h-400 d-flex justify-content-around align-items-center">
  //             {pair.map((image, imageIndex) => (
  //               <CarouselDisplayImages
  //                 key={imageIndex}
  //                 src={`./uploads/images/${image.src}`}
  //                 alt={image.alt}
  //               />
  //             ))}
  //           </div>
  //         </Carousel.Item>
  //       ))) || <p>Chargement...</p>} */}
  //     {!loading &&
  //       imagesForCarousel.map((image, imageIndex2) => (
  //         <Carousel.Item className="" key={imageIndex2} interval={3000}>
  //           <CarouselDisplayImages
  //             src={`./uploads/images/${image.src}`}
  //             alt={image.alt}
  //           />
  //         </Carousel.Item>
  //       ))}
  //   </Carousel>
  // );

  return (
    <Carousel className="bg-custom-blue h-400" data-bs-theme="dark">
      {renderCarouselItems()}
    </Carousel>
  );

}
