import axios from "axios";
import Cache from "./cache";
import { IMAGE_FOR_CAROUSEL_API } from "../config";

async function getImagesForCarousel() {
  const cachedImagesForCarousel = await Cache.get("imagesForCarousel");
  if (cachedImagesForCarousel) return cachedImagesForCarousel;

  return axios
    .get(IMAGE_FOR_CAROUSEL_API)
    .then((response) => {
      const imagesForCarousel = response.data["hydra:member"];
      Cache.set("imagesForCarousel", imagesForCarousel );
      return imagesForCarousel ;
    })
    .catch((error) => console.log(error.response));
}

export default { getImagesForCarousel };