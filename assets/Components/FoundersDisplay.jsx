import React from "react";

export default function FoundersDisplay() {
  return (
    <div>
      <div className="container my-4">
        <div className="row g-0 d-flex justify-content-center">
          <div className="d-none d-xl-block col-xl-2"></div>
          <div className="col-7 col-xl-3 ">
            <div className="card h-100 border border-primary" >
              <img src="./image/bob.jpeg" className="card-img-top" />
              <div
                className="card-body d-flex flex-column justify-content-between bg-custom-violet text-white"
              >
                <h5 className="card-title text-center fs-4">
                  BOB - Directeur Scientifique
                </h5>
                <p className="card-text text-center fs-6">
                  Bob, co-fondateur de Canopées, est un biologiste passionné
                  avec une expertise en botanique. Son engagement pour la
                  biodiversité guide l'entreprise vers des pratiques
                  écologiques.
                </p>
              </div>
            </div>
          </div>
          <div className="d-none d-xl-block col-xl-2"></div>
          <div className="col-7 col-xl-3 mt-5 mt-xl-0">
            <div className="card h-100 border border-primary">
              <img src="./image/tom.jpeg" className="card-img-top" />
              <div
                className="card-body d-flex flex-column bg-custom-green text-white"
              >
                <h5 className="card-title text-center fs-4">
                  TOM - Directeur Créatif
                </h5>
                <p className="card-text text-center fs-6">
                  Tom, co-fondateur, possède un solide background en paysagisme.
                  Créatif et visionnaire, il transforme les espaces verts en
                  œuvres d'art vivantes.
                </p>
              </div>
            </div>
          </div>

          <div className="d-none d-xl-block col-xl-2"></div>
        </div>
      </div>
    </div>
  );
}
