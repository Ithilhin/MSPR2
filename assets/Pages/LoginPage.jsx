import React, { useState } from "react";
import authAPI from "../Services/authAPI";
import { useNavigate } from "react-router-dom";
import Fields from "../Components/forms/Fields";
import { toast } from "react-toastify";
import Title from "../Components/Title";

// LoginPage component handles user login functionality
export default function LoginPage({ onLogin }) {
  // State for storing user credentials
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // State for storing any login error messages
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken"); // Retrieve auth token from local storage

  // Function to access admin space after successful login
  function accessAdminSpace() {
    const token = localStorage.getItem("authToken");
    fetch("/login", {
      // Attempt to fetch login endpoint
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Set Authorization header with token
        "Content-Type": "application/json",
      },
    }).catch((error) => console.error("Error:", error)); // Catch and log any errors
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authAPI.authenticate(credentials); // Attempt to authenticate with provided credentials
      toast.success(
        "Vous êtes désormais connecté, redirection vers l'espace administrateur, merci de patienter..." // Display success notification
      );
      setError("");
      onLogin(true); // Trigger login state change in parent component
      accessAdminSpace(); // Access admin space
      setTimeout(() => {
        navigate("/admin", { replace: true }); // Redirect to admin space after a delay
      }, 1000);
    } catch (error) {
      setError("Les informations fournies ne sont pas correctes"); // Set error message
      toast.error("Une erreur est survenue"); // Display error notification
    }
  };

  // Handle changes in form fields
  function handleChange(e, param) {
    setCredentials({ ...credentials, [param]: e.target.value }); // Update credentials state based on input
  }

  // Render the login form
  return (
    <div className="container d-flex flex-column">
      <Title text={"Connectez-vous pour accéder à l'espace administration"} />
      <form onSubmit={handleSubmit}>
        <Fields
          label="Adresse email"
          name="username"
          value={credentials.username}
          onChange={(e) => handleChange(e, "username")} // Update username in state on change
          placeholder="Adresse email de connexion" // Placeholder text
          error={error} // Display any errors related to this field
        />

        <Fields
          label="Mot de passe"
          name="password"
          value={credentials.password}
          onChange={(e) => handleChange(e, "password")}
          placeholder="Mot de passe"
          error={error}
        />

        <div className="form-group">
          {" "}
          <button type="submit" className="btn btn-success">
            Je me connecte
          </button>
        </div>
      </form>
    </div>
  );
}
