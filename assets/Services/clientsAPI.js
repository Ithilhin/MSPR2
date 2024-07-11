import axios from "axios";
import Cache from "./cache";
import { CLIENT_API } from "../config";

/**
 * Fetches the list of clients from the API or cache.
 * @returns {Promise<Array>} A promise that resolves to an array of clients.
 */
async function getClients() {
  // Attempt to retrieve the clients list from cache first
  const cachedClients = await Cache.get("clients");
  // If clients are found in cache, return them to avoid unnecessary API call
  if (cachedClients) return cachedClients;

  // If clients are not in cache, fetch them from the API
  return axios
    .get(CLIENT_API) // Making a GET request to the CLIENT_API endpoint
    .then((response) => {
      const clients = response.data["hydra:member"]; // Extracting clients data from the response
      Cache.set("clients", clients); // Storing the fetched clients in cache for future requests
      return clients; // Returning the fetched clients
    })
    .catch((error) => console.log(error.response));
}

export default { getClients };
