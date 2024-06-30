import axios from "axios";
import Cache from "./cache";
import { IMAGE_API } from "../config";

async function getImages() {
  const cachedImages = await Cache.get("images");
  if (cachedImages) return cachedImages;

  return axios
    .get(IMAGE_API)
    .then((response) => {
      const images = response.data["hydra:member"];
      console.log("i", images);
      Cache.set("images", images );
      return images ;
    })
    .catch((error) => console.log(error.response));
}

export default { getImages };