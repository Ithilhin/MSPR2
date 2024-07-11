import React, { useEffect, useState } from "react";
import imagesAPI from "../Services/imageAPI";
import ImageLoader from "./loaders/ImageLoader";

// Define the PrestationsCards component that displays a card for a specific prestation
function PrestationsCards({ title, index }) {
  const [imagesPrestationActives, setImagesPrestationActives] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch images on component mount
  useEffect(() => {
    imagesAPI
      .getImages()
      .then((data) => {
        // Filter the fetched images data to include only those related to this prestation and are marked as active
        const filteredData = data.filter(
          (image) => image.prestation.title === title && image.active
        );
        setImagesPrestationActives(filteredData);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        setLoading(false); // Set loading to false as data fetching is complete or failed
      });
  }, []);

  // Calculate a random index to display a random active image for the prestation
  const randomIndex =
    imagesPrestationActives.length > 0
      ? Math.floor(Math.random() * imagesPrestationActives.length)
      : 0;
  // Determine the source path of the image to display
  const imageSrc =
    imagesPrestationActives.length > 0
      ? `./uploads/images/${imagesPrestationActives[randomIndex].src}`
      : "";

  // Render the ImageLoader component while images are loading
  if (loading) {
    return (
      <div className="col-lg col-8 position-relative my-3 mx-auto h-400">
        <ImageLoader />
      </div>
    );
  }

  // Render the prestation card with the selected image and title
  return (
    <div
      key={index}
      className="col-lg col-8 position-relative my-3 mx-auto h-400"
    >
      <p className="fw-bold vertical-text mt-4">{title}</p>
      <div
        className="darkBackground animatedBackground h-100 bg-dark"
        style={{ opacity: "0.5" }}
        id={title}
      ></div>
      <img className="object-fit-cover w-100 h-100" src={imageSrc} alt="" />
    </div>
  );
}

export default PrestationsCards;
