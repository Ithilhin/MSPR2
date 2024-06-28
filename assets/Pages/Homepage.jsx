import React from "react";
import Title from "../Components/Title";
import TextForDisplay from "../Components/TextForDisplay";
import ClientsDisplay from "../Components/clientsDisplay";
import RealisationDisplay from "../Components/RealisationDisplay";
import CarouselDisplay from "../Components/CarouselDisplay";

export default function Homepage() {
  const text =
    "Bienvenue sur le site de Canopées, votre partenaire privilégié pour la conception, la réalisation, et l'entretien d'espaces verts. Fondée en 2020 par Bob et Tom, deux passionnés de la nature, notre société s'engage à offrir des services de qualité pour embellir vos extérieurs, que vous soyez particuliers, professionnels ou collectivités territoriales. Chez Canopées, nous croyons fermement que chaque espace vert a le potentiel de devenir un petit coin de paradis. Nos services sont conçus pour transformer cette vision en réalité.<br /> Notre engagement envers l'environnement se reflète également dans notre charte graphique, inspirée de la valorisation des déchets verts. Nous pratiquons le compostage des déchets issus de nos activités, réduisant ainsi l'impact environnemental et enrichissant la terre que nous chérissons tant.<br /> Explorez notre site pour découvrir davantage sur nos services et comment nous pouvons vous aider à réaliser le jardin de vos rêves.  Chez Canopées, nous sommes dédiés à la beauté de vos espaces extérieurs et à la préservation de notre planète. Contactez-nous dès aujourd'hui pour faire le premier pas vers la création ou l'entretien de votre espace vert idéal.";
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
