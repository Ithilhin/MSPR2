import React from "react";
import authAPI from "../Services/authAPI";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const handleLogout = () => {
    authAPI.logout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                {/* TODO: inserer logo Canopées */}
                <NavLink className="nav-link active" to="/">
                  IMG CANOPEES
                  <span className="visually-hidden">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutUs">
                  Qui sommes-nous?
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Prestations">
                  Prestations
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="prices">
                  Tarifs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="ContactForm">
                  Contact
                </NavLink>
              </li>
            </ul>
            {/* TODO: aligner les bouttons */}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Inscription
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="btn btn-success">
                  Connexion
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-danger"
                >
                  Deconnexion
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
