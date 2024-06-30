import React from "react";
import { useEffect, useState } from "react";
import realisationsAPI from "../Services/realisationsAPI";
import Carousel from "react-bootstrap/Carousel";
import RealisationDisplayImages from "./RealisationDisplayImages";

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

  const trios = [];
  for (let i = 0; i < realisations.length; i += 3) {
    trios.push(realisations.slice(i, i + 3));
  }

  return (
    <div>
      <p className="text-dark h1 text-center pt-3">
        Nos dernières réalisations
      </p>
      <Carousel
        className="mb-5 pb-5 px-5"
        data-bs-theme="dark"
      >
        {trios.map((trio, index) => (
          <Carousel.Item className="row d-flex g-0" key={index}>
            {!loading && trio.map((realisation, realisationIndex) => (
              <RealisationDisplayImages
                key={realisationIndex}
                text={realisation.text}
                src={`./uploads/images/${realisation.imageFileName}`}
                title={realisation.title}
              />
            )) || <p>Chargement...</p>}
            <div className="col-1"></div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
