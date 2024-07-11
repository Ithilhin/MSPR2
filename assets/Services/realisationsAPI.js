import axios from "axios";
import Cache from "./cache";
import { REALISATION_API } from "../config";

/**
 * Fetches the list of realisations from the API or cache.
 * @returns {Promise<Array>} A promise that resolves to an array of realisations.
 */
async function getRealisations() {
  // Attempt to retrieve the realisations list from cache first
  const cachedRealisations = await Cache.get("realisations");
  // If realisations are found in cache, return them to avoid unnecessary API call
  if (cachedRealisations) return cachedRealisations;

  // If realisations are not in cache, fetch them from the API
  return axios
    .get(REALISATION_API) // Making a GET request to the REALISATION_API endpoint
    .then((response) => {
      const realisations = response.data["hydra:member"]; // Extracting realisations data from the response
      Cache.set("realisations", realisations); // Storing the fetched realisations in cache for future requests
      return realisations; // Returning the fetched realisations
    })
    .catch((error) => console.log(error.response)); // Logging any errors that occur during the fetch operation
}

export default { getRealisations };
