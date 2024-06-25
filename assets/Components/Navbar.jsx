import React from "react";
import authAPI from "../Services/authAPI";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    authAPI.logout();
    onLogout(false);
    navigate("/login",{replace:true});
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
                <NavLink className="nav-link" to="aboutUs">
                  Qui sommes-nous?
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="prestations">
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
              <li className="nav-item">
                <NavLink className="nav-link" to="admin">
                  Administration
                </NavLink>
              </li>

            </ul>
            {/* TODO: aligner les bouttons */}
            <ul className="navbar-nav ml-auto">
              {!isAuthenticated && (
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-success">
                    Administration
                  </NavLink>
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger">
                    Deconnexion
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
