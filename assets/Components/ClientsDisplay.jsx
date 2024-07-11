import React, { useEffect, useState } from "react";
import clientsAPI from "../Services/clientsAPI";
import CardLoader from "./loaders/CardLoader";

export default function ClientsDisplay() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch clients data on component mount
  useEffect(() => {
    clientsAPI
      .getClients()
      .then((data) => {
        // Filter the data to include only active clients
        const filteredData = data.filter((client) => {
          return client.active;
        });
        return filteredData;
      })
      .then((data) => setClients(data))
      .catch((error) => console.log(error.response))
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <section id="Clients" className="bg-custom-blue">
        {/* Title for the clients section */}
        <p className="text-white h1 text-center pt-3">Découvrez nos clients</p>
        <div className="container mt-4">
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column col-12 align-items-center flex-lg-row align-items-lg-stretch justify-content-lg-around">
              {/* Check if data is still loading */}
              {(!loading &&
                // Map through the clients and display each one
                clients.map((client, index) => (
                  <React.Fragment key={index}>
                    <div className="row col-8 col-lg d-flex flex-column">
                      <div className="col-12 p-0 d-flex">
                        {/* Display the client type with conditional styling */}
                        <div className="col-2 h-35"></div>
                        <h3
                          className={`col-10 bg-light mb-0 rounded-top text-center ${
                            client.type === "particulier"
                              ? "text-custom-green"
                              : client.type === "professionnel"
                              ? "text-custom-red"
                              : "text-custom-violet"
                          }`}
                        >
                          {client.type}
                        </h3>
                      </div>
                      {/* Display the client description */}
                      <p
                        className="col-12 bg-light rounded-bottom py-3 flex-grow-1"
                        dangerouslySetInnerHTML={{ __html: client.description }}
                      ></p>
                    </div>
                    {/* Add spacing between client cards on large screens */}
                    {index !== clients.length - 1 && (
                      <div className="d-none d-lg-block col-lg-1"></div>
                    )}
                  </React.Fragment>
                ))) || (
                <p className="d-flex justify-content-center mt-3">
                  <CardLoader />
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
