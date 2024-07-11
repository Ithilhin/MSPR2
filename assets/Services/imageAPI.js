import axios from "axios";
import Cache from "./cache";
import { IMAGE_API } from "../config";

/**
 * Fetches the list of images from the API or cache.
 * @returns {Promise<Array>} A promise that resolves to an array of images.
 */
async function getImages() {
  // Attempt to retrieve the images list from cache first
  const cachedImages = await Cache.get("images");

  // If images are found in cache, return them to avoid unnecessary API call
  if (cachedImages) return cachedImages;

  // If images are not in cache, fetch them from the API
  return axios
    .get(IMAGE_API) // Making a GET request to the IMAGE_API endpoint
    .then((response) => {
      const images = response.data["hydra:member"]; // Extracting images data from the response
      console.log("i", images); // Logging the fetched images for debugging
      Cache.set("images", images); // Storing the fetched images in cache for future requests
      return images; // Returning the fetched images
    })
    .catch((error) => console.log(error.response));
}

export default { getImages };
