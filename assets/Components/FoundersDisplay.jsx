import React, { useEffect, useState } from "react";
import foundersAPI from "../Services/foundersAPI";

export default function FoundersDisplay() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    foundersAPI
      .getFounders()
      .then((data) => {
        const filteredData = data.filter((user) => {
          return user.title;
        });
        return filteredData;
      })
      .then((data) => setFounders(data))
      .catch((error) => console.log(error.response));
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="container my-4">
        <div className="row g-0 d-flex justify-content-center">
          {loading ? (
            <p>Chargement...</p>
          ) : (
            founders.map((founder, index) => (
              <React.Fragment key={index}>
                <div className="d-none d-xl-block col-xl-2"></div>
                <div className="col-7 col-xl-3 ">
                  <div className="card h-100 border border-primary">
                    <img
                      src={`./image/${founder.pictureFileName}`}
                      className="card-img-top"
                    />
                    <div
                      className={`card-body d-flex flex-column justify-content-between ${
                        founder.title === "TOM - Directeur Créatif"
                          ? "bg-custom-violet"
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
          <div className="d-none d-xl-block col-xl-2"></div>
        </div>
      </div>
    </div>
  );
}
