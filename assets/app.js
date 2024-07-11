import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/app.css";
import Navbar from "./Components/Navbar";
import LogoutFromEasyAdmin from "./Components/LogoutFromEasyAdmin";
import Homepage from "./Pages/Homepage";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import AboutUS from "./Pages/AboutUSPage";
import Prices from "./Pages/PricesPage";
import LoginPage from "./Pages/LoginPage";
import authAPI from "./Services/authAPI";
import AdminRedirect from "./Components/AdminRedirect";

import ContactFormPage from "./Pages/ContactFormPage";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrestationsPage from "./Pages/PrestationsPage";
import Footer from "./Components/Footer";
import CGU from "./Pages/CGU";
import CGV from "./Pages/CGV";
import Legal from "./Pages/Legal";
import LogoutToEasyAdmin from "./Components/LogoutToEasyAdmin";

// Setup authentication API and default axios headers
authAPI.setup();
axios.defaults.headers["Content-Type"] = "application/ld+json ";

export default function App() {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated()
  );

  return (
    <>
      {/* HashRouter for client-side routing */}
      <HashRouter>
        <div className="vh-100 d-flex flex-column">
          {/* Navbar component, passing isAuthenticated state and setter */}
          <Navbar
            isAuthenticated={isAuthenticated}
            onLogout={setIsAuthenticated}
          />
          <main className="">
            {/* Routes define the navigation and component mapping */}
            <Routes>
              {/* Login page route */}
              <Route
                path="/login"
                element={<LoginPage onLogin={setIsAuthenticated} />}
              />
              {/* Logout route for admin */}
              <Route path="/logoutAdmin" element={<LogoutToEasyAdmin />} />
              {/* Logout route */}
              <Route
                path="/logout"
                element={<LogoutFromEasyAdmin onLogout={setIsAuthenticated} />}
              />
              {/* Admin area route, redirects to login if not authenticated */}
              <Route
                path="/admin"
                element={
                  isAuthenticated ? <AdminRedirect /> : <Navigate to="/login" />
                }
              />
              {/* Static pages routes */}
              <Route path="/CGU" element={<CGU />} />
              <Route path="/CGV" element={<CGV />} />
              <Route path="/Legal" element={<Legal />} />
              {/* Additional routes for site navigation */}
              <Route path="/aboutUs" element={<AboutUS />} />
              <Route path="/prestations" element={<PrestationsPage />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/contactForm" element={<ContactFormPage />} />
              {/* Homepage route */}
              <Route path="/" element={<Homepage />} />
            </Routes>
          </main>
          {/* Footer component */}
          <Footer></Footer>
        </div>
      </HashRouter>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer position="bottom-left" />
    </>
  );
}

// Mounting the App component to the DOM
const container = document.querySelector("#app");
const root = createRoot(container);
root.render(<App />);
