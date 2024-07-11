import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { LOGIN_CHECK_API } from "../config";

// Function to remove the authToken from localStorage and delete the Authorization header from axios
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

// Function to set the Authorization header in axios with the provided token
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

// Function to setup axios headers if a valid token exists in localStorage
function setup() {
  // 1. Check if a token exists in localStorage
  const token = window.localStorage.getItem("authToken");

  // 2. If a token exists, decode it to check its validity
  if (token) {
    const { exp: expiration } = jwtDecode(token); // Decoding the token to get its expiration
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token); // If the token is valid, set it in axios
    }
  }
}

// Function to check if the user is authenticated
function isAuthenticated() {
  const token = window.localStorage.getItem("authToken"); // Retrieve the token from localStorage

  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true; // If the token is valid, return true
    }
    return false; // If the token is expired, return false
  }
  return false; // If no token is found, return false
}

export default { authenticate, logout, setup, isAuthenticated };
