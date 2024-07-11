import axios from "axios";
import Cache from "./cache";
import { USER_API } from "../config";

/**
 * Fetches the list of founders from the API or cache.
 * @returns {Promise<Array>} A promise that resolves to an array of founders.
 */
async function getFounders() {
  // Attempt to retrieve the founders list from cache first
  const cachedFounders = await Cache.get("founders");

  // If founders are found in cache, return them to avoid unnecessary API call
  if (cachedFounders) return cachedFounders;

  // If founders are not in cache, fetch them from the API
  return axios
    .get(USER_API) // Making a GET request to the USER_API endpoint
    .then((response) => {
      const founders = response.data["hydra:member"]; // Extracting founders data from the response
      Cache.set("founders", founders); // Storing the fetched founders in cache for future requests
      return founders; // Returning the fetched founders
    })
    .catch((error) => console.log(error.response));
}

export default { getFounders };
