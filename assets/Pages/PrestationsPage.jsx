import React from "react";
import Title from "../Components/Title";
import Prestations from "../Components/Prestations";
import TextForDisplay from "../Components/TextForDisplay";

export default function PrestationsPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center row m-auto">
      <Title text={"Nos Prestations"}/>
      <Prestations />
      <TextForDisplay page={"Prestations"}/>
    </div>
  );
}
