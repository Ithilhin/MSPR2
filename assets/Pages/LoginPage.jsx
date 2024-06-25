import axios from "axios"; // Import axios for making HTTP requests
import React, { useState } from "react"; // Import React and the useState hook
import authAPI from "../Services/authAPI"; // Import the authentication service

// Define the LoginPage component
export default function LoginPage({ onLogin}) {
  // Initialize state for credentials
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Initialize state for error messages
  const [error, setError] = useState("");

  // Define the handleSubmit function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Attempt to authenticate with credentials
      await authAPI.authenticate(credentials);
      setError(""); // Reset error state on successful authentication
      onLogin(true); // Set isAuthenticated state to true
    } catch (error) {
      // Set error state if authentication fails
      setError("Les informations fournies ne sont pas correctes");
    }
  };

  // Render the component
  return (
    <>
      <form onSubmit={handleSubmit}> {/* Form element with onSubmit event handler */}
        <div className="form-group"> {/* Form group for email */}
          <label htmlFor="username">Adresse email</label> {/* Label for email input */}
          <input
            value={credentials.username} // Controlled input for username
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value }) // Update state on input change
            }
            type="email" // Specify input type
            placeholder="Adresse email de connexion" // Input placeholder
            name="username" // Input name
            className={"form-control" + (error && " is-invalid")} // Conditional class for input validation
          />
          {error && <p className="invalid-feedback">{error}</p>} {/* Display error message if any */}
        </div>
        <div className="form-group"> {/* Form group for password */}
          <label htmlFor="_password">Mot de passe</label> {/* Label for password input */}
          <input
            value={credentials.password} // Controlled input for password
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value }) // Update state on input change
            }
            type="password" // Specify input type
            placeholder="Mot de passe" // Input placeholder
            name="password" // Input name
            className="form-control" // Class for styling
          />
        </div>
        <div className="form-group"> {/* Form group for submit button */}
          <button type="submit" className="btn btn-success">
            Je me connecte {/* Button text */}
          </button>
        </div>
      </form>
    </>
  );
}