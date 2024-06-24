import React from 'react';


export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav m-auto">
                    <li className="nav-item">
                    {/* TODO: inserer logo Canopées */}
                    <a className="nav-link active" href="#">IMG CANOPEES
                        <span className="visually-hidden">(current)</span>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Qui sommes-nous?</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Prestations</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Tarifs</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Contact</a>
                    </li>
                </ul>
                {/* TODO: aligner les bouttons */}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link">Inscription</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-success">Connexion</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-danger">Deconnexion</a>
                    </li>
                </ul>
            </div>
        </div>
</nav>
    </>
  )
}

