import React from "react";
import Title from "../Components/Title";
import FoundersDisplay from "../Components/FoundersDisplay";
import TextForDisplay from "../Components/TextForDisplay";

// AboutUS functional component for the "About Us" page
export default function AboutUS() {
  return (
    <div className="container d-flex justify-content-center align-items-center row m-auto">
      <Title text={"Qui Sommes-Nous?"}/>
      <FoundersDisplay />
      <TextForDisplay page={"Qui-sommes-nous"}/>
    </div>
  );
}
