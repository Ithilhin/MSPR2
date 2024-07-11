import React from "react";
import { useEffect, useState } from "react";
import realisationsAPI from "../Services/realisationsAPI";
import Carousel from "react-bootstrap/Carousel";
import RealisationDisplayImages from "./RealisationDisplayImages";
import RealisationLoader from "./loaders/RealisationsLoader";

export default function RealisationDisplay() {
  const [realisations, setRealisations] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch realisations data on component mount
  useEffect(() => {
    realisationsAPI
      .getRealisations()
      .then((data) => {
        // Filter the fetched data to include only active realisations
        const filteredData = data.filter((realisation) => {
          return realisation.active;
        });
        return filteredData;
      })
      .then((data) => {
        setRealisations(data);
        setLoading(false); // Set loading state to false as data fetching is complete
      })

      .catch((error) => {
        console.log(error.response);
        setLoading(false); // Ensure loading state is set to false in case of error
      });
  }, []);

  // Prepare data for carousel: group realisations into trios for display
  const trios = [];
  for (let i = 0; i < realisations.length; i += 3) {
    trios.push(realisations.slice(i, i + 3)); // Slice realisations into groups of three
  }

  return (
    <div>
      <p className="text-dark h1 text-center pt-3">
        Nos dernières réalisations
      </p>
      <Carousel className="mb-5 pb-5 px-5" data-bs-theme="dark" interval={null}>
        {/* Conditional rendering: Show carousel items if not loading, otherwise show loader */}
        {(!loading &&
          trios.map((trio, index) => (
            <Carousel.Item className="" key={index}>
              <div className="d-flex flex-column col-12 align-items-center px-5 flex-lg-row align-items-lg-stretch justify-content-lg-around px-lg-0">
                {/* Map each trio to display realisation images */}
                {trio.map((realisation, realisationIndex) => (
                  <RealisationDisplayImages
                    key={realisationIndex}
                    text={realisation.text}
                    src={`./uploads/images/${realisation.imageFileName}`}
                    title={realisation.title}
                  />
                ))}
                <div className="d-none d-lg-block col-lg-1"></div>{" "}
                {/* Spacer div for layout */}
              </div>
            </Carousel.Item>
          ))) || (
          <p className="d-flex justify-content-center">
            <RealisationLoader />
          </p>
        )}
      </Carousel>
    </div>
  );
}
