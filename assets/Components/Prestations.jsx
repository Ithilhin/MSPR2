import React from "react";
import { useEffect, useState } from "react";
import PrestationsCards from "./PrestationsCards";
import PrestationsAPI from "../Services/PrestationsAPI";
import PrestationsModal from "./Modal/PrestationsModal";
import ImageLoaderBig from "./loaders/ImageLoaderBig";

export default function Prestations() {
  const [prestations, setPrestations] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch prestations data on component mount
  useEffect(() => {
    PrestationsAPI.getPrestations()
      .then((data) => {
        setPrestations(data);
        setLoading(false); // Set loading to false as data fetching is complete
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false); // Ensure loading is set to false even if there is an error
      });
  }, []);

  const [modalShow, setModalShow] = React.useState(false); // State to control the visibility of the modal
  const [prestation, setPrestation] = React.useState(""); // State to store the currently selected prestation for the modal

  return (
    <div>
      {/* Debugging: Log the prestations data to the console */}
      {console.log(prestations)}

      <div
        variant="primary"
        onClick={(e) => {
          setPrestation(e.target.id); // Set the selected prestation based on the clicked element's id
          setModalShow(true); // Show the modal
        }}
        className="container-fluid row g-0 m-0 mt-5 mb-lg-5"
        style={{ overflow: "hidden" }}
      >
        {/* Conditional rendering: Show prestations cards if data is loaded, otherwise show loader */}
        {(!loading &&
          prestations.map((prestation, index) => (
            <PrestationsCards
              key={index}
              title={prestation.title}
              index={index}
            />
          ))) || <ImageLoaderBig />}
      </div>
      {/* PrestationsModal component for displaying the details of a selected prestation */}
      <PrestationsModal
        show={modalShow} // Prop to control modal visibility
        onHide={() => setModalShow(false)} // Handler to hide the modal
        prestation={prestation} // Prop to pass the selected prestation to the modal
      />
    </div>
  );
}
