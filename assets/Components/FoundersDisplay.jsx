import React, { useEffect, useState } from "react";
import foundersAPI from "../Services/foundersAPI";
import ImageLoaderBig from "./loaders/ImageLoaderBig";

export default function FoundersDisplay() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch founders data on component mount
  useEffect(() => {
    foundersAPI
      .getFounders()
      .then((data) => {
        const filteredData = data.filter((user) => {
          return user.title; // Filter data to include only users with a title
        });
        return filteredData;
      })
      .then((data) => setFounders(data))
      .catch((error) => console.log(error.response))
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <div className="container my-4">
        <div className="row g-0 d-flex justify-content-center align-items-center">
          {loading ? (
            // Display the loader component while data is loading
            <p className="d-flex justify-content-center align-items-center">
              <ImageLoaderBig />
            </p>
          ) : (
            // Map through the founders data and display each founder
            founders.map((founder, index) => (
              <React.Fragment key={index}>
                <div className="d-none d-lg-block col-lg-2"></div>
                <div className="col-7 my-3 col-lg-3 ">
                  <div className="card h-100 border border-primary">
                    <img
                      src={`./uploads/images/${founder.pictureFileName}`} // Founder image
                      className="card-img-top"
                    />
                    <div
                      className={`card-body d-flex flex-column justify-content-between ${
                        founder.title === "TOM - Directeur Créatif"
                          ? "bg-custom-violet" // Custom background color for specific title
                          : "bg-custom-green"
                      } text-white`}
                    >
                      <h5 className="card-title text-center fs-4">
                        {founder.title}
                      </h5>
                      <p className="card-text text-center fs-6">
                        {founder.description}
                      </p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))
          )}
          <div className="d-none d-lg-block col-lg-2"></div>
        </div>
      </div>
    </div>
  );
}
