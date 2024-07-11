import axios from "axios";
import Cache from "./cache";
import { PRICES_API } from "../config";

/**
 * Fetches the list of prices from the API or cache.
 * @returns {Promise<Array>} A promise that resolves to an array of prices.
 */
async function getPrices() {
  // Attempt to retrieve the prices list from cache first
  const cachedPrices = await Cache.get("prices");

  // If prices are found in cache, return them to avoid unnecessary API call
  if (cachedPrices) return cachedPrices;

  // If prices are not in cache, fetch them from the API
  return axios
    .get(PRICES_API) // Making a GET request to the PRICES_API endpoint
    .then((response) => {
      const prices = response.data["hydra:member"]; // Extracting prices data from the response
      Cache.set("prices", prices); // Storing the fetched prices in cache for future requests

      return prices; // Returning the fetched prices
    })
    .catch((error) => console.log(error.response)); // Logging any errors that occur during the fetch operation
}

export default { getPrices };
