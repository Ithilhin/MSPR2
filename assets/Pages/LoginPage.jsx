import React, { useState } from "react";
import authAPI from "../Services/authAPI";
import { useNavigate } from "react-router-dom";
import Fields from "../Components/forms/Fields";

export default function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authAPI.authenticate(credentials);
      // TODO notification flash success
      setError("");
      onLogin(true);
      navigate("/admin", { replace: true });
    } catch (error) {
      setError("Les informations fournies ne sont pas correctes");
      // TODO notification flash error
    }
  };

  function handleChange(e, param) {
    setCredentials({ ...credentials, [param]: e.target.value });
  }

  return (
    <>
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
    </>
  );
}
