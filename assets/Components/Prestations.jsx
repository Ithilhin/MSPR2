import React from "react";
import { useEffect, useState } from "react";
import PrestationsCards from "./PrestationsCards";
import PrestationsAPI from "../Services/PrestationsAPI";
import PrestationsModal from "./Modal/PrestationsModal";

export default function Prestations() {
  const [prestations, setPrestations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PrestationsAPI.getPrestations()
      .then((data) => setPrestations(data))
      .catch((error) => console.log(error.response));
    setLoading(false);
  }, []);

  const [modalShow, setModalShow] = React.useState(false);
  const [prestation, setPrestation] = React.useState("");

  return (
    <div>
      {console.log(prestations)}

      <div
        variant="primary"
        onClick={(e) => {
          setPrestation(e.target.id);
          setModalShow(true);
        }}
        className="container-fluid row g-0 m-0 mt-5 mb-lg-5"
        style={{ overflow: "hidden" }}
      >
        {!loading && prestations.map((prestation, index) => (
          <PrestationsCards key={index} title={prestation.title} index={index} />
        )) || <p>Chargement...</p>}
      </div>
      <PrestationsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        prestation={prestation}
      />
    </div>
  );
}
