import React from "react";
import { useEffect, useState } from "react";
import PrestationsCards from "./PrestationsCards";
import PrestationsAPI from "../Services/PrestationsAPI";

export default function Prestations() {
  const [prestations, setPrestations] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    PrestationsAPI.getPrestations()
      .then((data) => setPrestations(data))
      .catch((error) => console.log(error.response));
    // setLoading(false);
  }, []);

  return (
    <div>
      {console.log(prestations)}
      
      <div
        className="container-fluid row g-0 m-0 mt-5 mb-lg-5"
        style={{ overflow: "hidden" }}
      >
        {prestations.map((prestation, index) => (
          <PrestationsCards title={prestation.title} index={index}/>
        ))}

      </div>
      {/* TODO : add animation on darkbackground */}
      {/* TODO: add modal */}
    </div>
  );
}
