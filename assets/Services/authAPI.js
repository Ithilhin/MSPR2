import axios from "axios";

// Function to authenticate user with given credentials
function authenticate(credentials) {
  // Sending a POST request to the login endpoint
  return axios
    .post("http://localhost:8000/api/login_check", credentials)
    // Extracting the token from the response
    .then((response) => response.data.token)
    // Storing the token in localStorage and setting the Authorization header
    .then((token) => {
      window.localStorage.setItem("authToken", token); // Storing token in localStorage

      axios.defaults.headers["Authorization"] = "Bearer " + token; // Setting Authorization header
    return true // Indicating successful authentication
    });
}

// Exporting the authenticate function for use in other parts of the application
export default { authenticate };