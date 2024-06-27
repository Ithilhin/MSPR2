import React from "react";

export default function OurClients() {
  return (
    <div>
      <section id="Clients" className="bg-custom-blue">
        <p className="text-white h1 text-center pt-3">Découvrez nos clients</p>
        <div className="container mt-4">
          <div className="row d-flex justify-content-center">
            <div className="d-flex flex-column col-12 justify-content-around flex-lg-row align-items-center">
              <div className="row col-8 col-lg d-flex flex-column h-100">
                <div className="col-12 p-0 d-flex">
                  <div className="col-2 h-35"></div>
                  <h3 className="col-10 bg-light mb-0 rounded-top text-center text-custom-green">
                    Particuliers
                  </h3>
                </div>
                <p className="col-12 bg-light rounded-bottom py-3 flex-grow-1">
                  Le client type de Canopées est un
                  <span className="text-custom-green fw-bold mx-1">particulier</span>
                  passionné par la nature et soucieux de l'esthétique et de la
                  santé de son espace extérieur.
                  <br />
                  Souvent propriétaire d'une maison avec jardin, ce client
                  valorise un espace vert bien entretenu qui non seulement
                  embellit sa propriété mais crée aussi un havre de paix pour sa
                  famille et lui.
                  <br />
                  Il est conscient de l'importance de l'environnement et cherche
                  des solutions écologiques pour l'entretien de son jardin.
                </p>
              </div>
              <div className="d-none d-lg-block col-lg-1"></div>
              <div className="row col-8 col-lg d-flex flex-column h-100">
                <div className="col-12 p-0 d-flex">
                  <div className="col-2 h-35"></div>
                  <h3 className="col-10 bg-light mb-0 rounded-top text-center text-custom-red">
                    Professionnels
                  </h3>
                </div>
                <p className="col-12 bg-light rounded-bottom py-3 flex-grow-1">
                  Les clients
                  <span className="text-custom-red fw-bold mx-1">
                    professionnels
                  </span>{" "}
                  de Canopées, soucieux de leur image, investissent dans des
                  espaces verts pour renforcer leur prestige. Ils exigent des
                  solutions durables qui allient esthétique et écologie. <br />
                  Ces responsables recherchent des services sur mesure,
                  prioritaires pour l'accueil et le bien-être de leur clientèle.
                  <br />
                  Ils valorisent l'écoresponsabilité, choisissant Canopées pour
                  son engagement en faveur de la valorisation des déchets verts
                  et de la préservation environnementale.
                </p>
              </div>
              <div className="d-none d-lg-block col-lg-1"></div>
              <div className="row col-8 col-lg d-flex flex-column h-lg-100">
                <div className="col-12 p-0 d-flex">
                  <div className="col-2 h-35"></div>
                  <h3 className="col-10 bg-light mb-0 rounded-top text-center text-custom-violet">
                    Collectivités
                  </h3>
                </div>
                <p className="col-12 bg-light rounded-bottom text-custom-violet py-3 flex-grow-1">
                  Les
                  <span className="text-custom-violet fw-bold mx-1">
                    collectivités territoriales
                  </span>
                    partenaires de Canopées visent à embellir les espaces publics,
                  améliorant ainsi la qualité de vie des citoyens. Elles
                  privilégient des projets verts durables. <br />
                  Ces administrations s'engagent dans des initiatives
                  écologiques, cherchant à réduire l'empreinte environnementale
                  à travers des pratiques de gestion durable des espaces verts.
                  <br />
                  Elles valorisent la collaboration avec Canopées pour son
                  expertise et son engagement envers des solutions respectueuses
                  de l'environnement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
