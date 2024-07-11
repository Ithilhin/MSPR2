import React, { useState } from "react";
import authAPI from "../Services/authAPI";
import { useNavigate } from "react-router-dom";
import Fields from "../Components/forms/Fields";
import { toast } from "react-toastify";
import Title from "../Components/Title";

export default function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  console.log("token at start", token);

  function accessAdminSpace() {
    const token = localStorage.getItem("authToken");
    console.log("token inside function", token);
    fetch("/login", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).catch((error) => console.error("Error:", error));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authAPI.authenticate(credentials);
      console.log("response", response);
      toast.success("Vous êtes désormais connecté, redirection vers l'espace administrateur, merci de patienter...");
      setError("");
      onLogin(true);
      console.log("token inside try", token);
      accessAdminSpace();
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 1000); 
    } catch (error) {
      setError("Les informations fournies ne sont pas correctes");
      toast.error("Une erreur est survenue");
    }
  };

  function handleChange(e, param) {
    setCredentials({ ...credentials, [param]: e.target.value });
  }

  return (
    <div className="container d-flex flex-column">
      <Title text={"Connectez-vous pour accéder à l'espace administration"} />
      <form onSubmit={handleSubmit}>
        <Fields
          label="Adresse email"
          name="username"
          value={credentials.username}
          onChange={(e) => handleChange(e, "username")}
          placeholder="Adresse email de connexion"
          error={error}
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
