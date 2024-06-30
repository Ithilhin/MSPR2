import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {LOGIN_CHECK_API} from "../config";


function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token; // Setting Authorization header
}

// Function to authenticate user with given credentials
function authenticate(credentials) {
  // Sending a POST request to the login endpoint
  return (
    axios
      .post(LOGIN_CHECK_API, credentials)
      // Extracting the token from the response
      .then((response) => response.data.token)
      // Storing the token in localStorage and setting the Authorization header
      .then((token) => {
        window.localStorage.setItem("authToken", token); // Storing token in localStorage
        setAxiosToken(token); // Setting token in axios
      })
  );
}

function setup() {
  // 1 voir si on a un token

  const token = window.localStorage.getItem("authToken");

  // 2 si le token est valide

  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token); // Setting token in axios
      // console.log("Connexion établie avec le token");
    }
  }
}

function isAuthenticated(){
  
  const token = window.localStorage.getItem("authToken");
  
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}



// Exporting the authenticate function for use in other parts of the application
export default { authenticate, logout, setup, isAuthenticated };
