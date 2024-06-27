import React from "react";
import Title from "../Components/Title";
import Prestations from "../Components/Prestations";

export default function PrestationsPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center row m-auto">
      <Title texte={"Nos Prestations"}/>
      <Prestations />
    </div>
  );
}
