import axios from "axios";
import Cache from "./cache";
import { IMAGE_FOR_CAROUSEL_API } from "../config";

/**
 * Fetches the list of images for the carousel from the API or cache.
 * @returns {Promise<Array>} A promise that resolves to an array of images for the carousel.
 */
async function getImagesForCarousel() {
  // Attempt to retrieve the images for the carousel from cache first
  const cachedImagesForCarousel = await Cache.get("imagesForCarousel");
  // If images are found in cache, return them to avoid unnecessary API call
  if (cachedImagesForCarousel) return cachedImagesForCarousel;

  // If images are not in cache, fetch them from the API
  return axios
    .get(IMAGE_FOR_CAROUSEL_API) // Making a GET request to the IMAGE_FOR_CAROUSEL_API endpoint
    .then((response) => {
      const imagesForCarousel = response.data["hydra:member"]; // Extracting images for carousel data from the response
      Cache.set("imagesForCarousel", imagesForCarousel); // Storing the fetched images in cache for future requests
      return imagesForCarousel; // Returning the fetched images for the carousel
    })
    .catch((error) => console.log(error.response)); // Logging any errors that occur during the fetch operation
}

export default { getImagesForCarousel };
