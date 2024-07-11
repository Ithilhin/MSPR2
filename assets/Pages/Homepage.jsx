import React from "react";
import Title from "../Components/Title";
import TextForDisplay from "../Components/TextForDisplay";
import ClientsDisplay from "../Components/ClientsDisplay";
import RealisationDisplay from "../Components/RealisationDisplay";
import CarouselDisplay from "../Components/CarouselDisplay";

export default function Homepage() {
  return (
    <div className="d-flex justify-content-center align-items-center row ">
      <CarouselDisplay />
      <div className="container col-10 d-flex flex-column align-items-center">
        <Title text={""} />
        <TextForDisplay page={"Accueil"} />
      </div>
      <ClientsDisplay />
      <RealisationDisplay />
    </div>
  );
}
