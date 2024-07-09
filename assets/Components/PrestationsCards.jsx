import React, { useEffect, useState } from "react";
import imagesAPI from "../Services/imageAPI";

function PrestationsCards({ title, index }) {
  const [imagesPrestationActives, setImagesPrestationActives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    imagesAPI
      .getImages()
      .then((data) => {
        const filteredData = data.filter((image) => {
          return image.prestation.title === title && image.active;
        });
        return filteredData;
      })
      .then((data) => setImagesPrestationActives(data))
      .catch((error) => console.log(error.response));
    setLoading(false);
  }, [title]);

  const randomIndex =
    imagesPrestationActives.length > 0
      ? Math.floor(Math.random() * imagesPrestationActives.length)
      : 0;
  const imageSrc =
    imagesPrestationActives.length > 0
      ? `./uploads/images/${imagesPrestationActives[randomIndex].src}`
      : "";

  return (
    console.log("src de l'image", imagesPrestationActives[0]),
    (
      <div key={index} className="col-lg col-8 position-relative m-auto h-400">
        <p className="fw-bold vertical-text mt-4 ">{title}</p>
        <div
          className="darkBackground animatedBackground h-100 bg-dark"
          style={{ opacity: "0.5" }}
          id={title}
        ></div>
        <img className="object-fit-cover w-100 h-100" src={imageSrc} alt="" />
      </div>
    )
  );
}

export default PrestationsCards;
