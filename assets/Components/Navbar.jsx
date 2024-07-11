import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Define the Navbar functional component with props for authentication status and logout handler
export default function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  // Function to handle logout process
  const handleLogout = () => {
    navigate("/logoutAdmin", { replace: true }); // Navigate to the logout page, replacing the current entry in the history stack
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          {/* Button for toggling the navbar on small screens */}
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
          {/* Navbar content that will be collapsed on small screens */}
          <div
            className="collapse navbar-collapse align-items-center"
            id="navbarColor01"
          >
            <ul className="navbar-nav m-auto align-items-center">
              {/* Navigation link to the home page */}
              <li className="nav-item mx-0 mx-lg-3">
                <NavLink className="nav-link" to="/">
                  <img
                    className="rounded-circle logo"
                    src="./image/logo.png"
                    alt="logo canopée"
                  />
                </NavLink>
              </li>
              {/* Navigation link to the about us page */}
              <li className="nav-item mx-0 mx-lg-3">
                <NavLink className="nav-link" to="aboutUs">
                  Qui sommes-nous?
                </NavLink>
              </li>
              {/* Navigation link to the services page */}
              <li className="nav-item mx-0 mx-lg-3">
                <NavLink className="nav-link" to="prestations">
                  Prestations
                </NavLink>
              </li>
              {/* Navigation link to the pricing page */}
              <li className="nav-item mx-0 mx-lg-3">
                <NavLink className="nav-link" to="prices">
                  Tarifs
                </NavLink>
              </li>
              {/* Navigation link to the contact form */}
              <li className="nav-item mx-0 mx-lg-3">
                <NavLink className="nav-link" to="ContactForm">
                  Contact
                </NavLink>
              </li>
              {/* Conditional rendering of the administration link based on authentication status */}
              {isAuthenticated && (
                <li className="nav-item mx-0 mx-lg-3">
                  <NavLink className="nav-link" to="admin">
                    Administration
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav m-auto">
              {!isAuthenticated && (
                // If the user is not authenticated, show the login button
                <li className="nav-item mt-3 m-auto m-lg-0">
                  <NavLink to="/login" className="btn btn-success">
                    Connexion
                  </NavLink>
                </li>
              )}
              {isAuthenticated && (
                // If the user is authenticated, show the logout button
                <li className="nav-item mt-3 m-auto m-lg-0">
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
