import React, { useState } from "react"; // Import React and the useState hook
import authAPI from "../Services/authAPI"; // Import the authentication service
import { useNavigate } from "react-router-dom";
import Fields from "../Components/forms/Fields";

// Define the LoginPage component
export default function LoginPage({ onLogin}) {
  // Initialize state for credentials
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Initialize state for error messages
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Define the handleSubmit function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    try {
      // Attempt to authenticate with credentials
      await authAPI.authenticate(credentials);
      setError(""); // Reset error state on successful authentication
      onLogin(true); // Set isAuthenticated state to true
      // Redirect user to home page on successful authentication
      navigate("/admin",{replace:true});
    } catch (error) {
      // Set error state if authentication fails
      setError("Les informations fournies ne sont pas correctes");
    }
  };

  function handleChange (e, param) {
    setCredentials({ ...credentials, [param]: e.target.value })
  }

  // Render the component
  return (
    <>
      <form onSubmit={handleSubmit}> {/* Form element with onSubmit event handler */}
        <Fields 
          label="Adresse email" 
          name="username" 
          value={credentials.username} 
          onChange={(e) => handleChange (e, "username")} 
          placeholder="Adresse email de connexion" error={error}
        />
        
        <Fields 
          label="Mot de passe" 
          name="password" 
          value={credentials.password} 
          onChange={(e) => handleChange (e, "password")}
          placeholder="Mot de passe" error={error}
        />
        
        <div className="form-group"> {/* Form group for submit button */}
          <button type="submit" className="btn btn-success">
            Je me connecte {/* Button text */}
          </button>
        </div>
      </form>
    </>
  );
}