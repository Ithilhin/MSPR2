import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/app.css";
import Navbar from "./Components/Navbar";
import Logout from "./Components/Logout";
import Homepage from "./Pages/Homepage";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import AboutUS from "./Pages/AboutUSPage";
import Prices from "./Pages/PricesPage";
import LoginPage from "./Pages/LoginPage";
import authAPI from "./Services/authAPI";
import AdminRedirect from "./Components/AdminRedirect";
import LogoutRedirect from "./Components/LogoutRedirect";
import ContactFormPage from "./Pages/ContactFormPage";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrestationsPage from "./Pages/PrestationsPage";
import Footer from "./Components/Footer";
import CGU from "./Pages/CGU";
import CGV from "./Pages/CGV";
import Legal from "./Pages/Legal";

authAPI.setup();
axios.defaults.headers["Content-Type"] = "application/ld+json ";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated()
  );

  return (
    <>
      <HashRouter>
        <div className="vh-100 d-flex flex-column">
          <Navbar
            isAuthenticated={isAuthenticated}
            onLogout={setIsAuthenticated}
          />
          <main className="">
            <Routes>
              <Route
                path="/login"
                element={<LoginPage onLogin={setIsAuthenticated} />}
              />
              <Route
                path="/logoutAdmin"
                element={
                   <LogoutRedirect />
                }
              />
              <Route
                path="/logout"
                element={<Logout onLogout={setIsAuthenticated} />}
              />

              <Route
                path="/admin"
                element={
                  isAuthenticated ? <AdminRedirect /> : <Navigate to="/login" />
                }
              />
              <Route path="/CGU" element={<CGU />} />
              <Route path="/CGV" element={<CGV />} />
              <Route path="/Legal" element={<Legal />} />
              <Route path="/aboutUs" element={<AboutUS />} />
              <Route path="/prestations" element={<PrestationsPage />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/contactForm" element={<ContactFormPage />} />
              <Route path="/" element={<Homepage />} />
            </Routes>
          </main>
          <Footer></Footer>
        </div>
      </HashRouter>

      <ToastContainer position="bottom-left" />
    </>
  );
}

const container = document.querySelector("#app");
const root = createRoot(container);
root.render(<App />);
