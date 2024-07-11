import axios from "axios";
import Cache from "./cache";
import { PRESTATION_API } from "../config";

/**
 * Fetches the list of prestations from the API or cache.
 * @returns {Promise<Array>} A promise that resolves to an array of prestations.
 */
async function getPrestations() {
  // Attempt to retrieve the prestations list from cache first
  const cachedPrestations = await Cache.get("prestations");
  // If prestations are found in cache, return them to avoid unnecessary API call
  if (cachedPrestations) return cachedPrestations;

  // If prestations are not in cache, fetch them from the API
  return axios
    .get(PRESTATION_API) // Making a GET request to the PRESTATION_API endpoint
    .then((response) => {
      const prestations = response.data["hydra:member"]; // Extracting prestations data from the response
      Cache.set("prestations", prestations); // Storing the fetched prestations in cache for future requests
      return prestations; // Returning the fetched prestations
    })
    .catch((error) => console.log(error.response)); // Logging any errors that occur during the fetch operation
}

export default { getPrestations };
