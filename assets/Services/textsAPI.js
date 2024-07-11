import axios from "axios";
import Cache from "./cache";
import { TEXT_API } from "../config";

/**
 * Fetches the list of texts from the API or cache.
 * @returns {Promise<Array>} A promise that resolves to an array of texts.
 */
async function getTexts() {
  // Attempt to retrieve the texts list from cache first
  const cachedTexts = await Cache.get("texts");

  // If texts are found in cache, return them to avoid unnecessary API call
  if (cachedTexts) return cachedTexts;

  // If texts are not in cache, fetch them from the API
  return axios
    .get(TEXT_API) // Making a GET request to the TEXT_API endpoint
    .then((response) => {
      const texts = response.data["hydra:member"]; // Extracting texts data from the response
      Cache.set("texts", texts); // Storing the fetched texts in cache for future requests
      return texts; // Returning the fetched texts
    })
    .catch((error) => console.log(error.response)); // Logging any errors that occur during the fetch operation
}

export default { getTexts };
