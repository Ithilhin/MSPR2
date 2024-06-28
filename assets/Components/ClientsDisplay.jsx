import React, { useEffect, useState } from "react";
import clientsAPI from "../Services/clientsAPI";

export default function ClientsDisplay() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientsAPI
      .getClients()
      .then((data) => {
        const filteredData = data.filter((client) => {
          return client.active;
        });
        return filteredData;
      })
      .then((data) => setClients(data))
      .catch((error) => console.log(error.response));
    setLoading(false);
  }, []);

  return (
    <div>
      <section id="Clients" className="bg-custom-blue">
        <p className="text-white h1 text-center pt-3">Découvrez nos clients</p>
        <div className="container mt-4">
          <div className="row d-flex justify-content-center">
            <div className="d-flex flex-column col-12 justify-content-around flex-lg-row align-items-center">
              {!loading &&
                clients.map((client, index) => (
                  <React.Fragment key={index}>
                    <div className="row col-8 col-lg d-flex flex-column h-100">
                      <div className="col-12 p-0 d-flex">
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
                      <p
                        className="col-12 bg-light rounded-bottom py-3 flex-grow-1}"
                        dangerouslySetInnerHTML={{ __html: client.description }}
                      ></p>
                    </div>
                    {index !== clients.length -1 && <div className="d-none d-lg-block col-lg-1"></div>}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
