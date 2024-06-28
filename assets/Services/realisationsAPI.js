import axios from "axios";
import Cache from "./cache";
import { REALISATION_API } from "../config";

async function getRealisations() {
  const cachedRealisations = await Cache.get("realisations");
  if (cachedRealisations) return cachedRealisations;

  return axios
    .get(REALISATION_API)
    .then((response) => {
      const realisations = response.data["hydra:member"];
      Cache.set("realisations", realisations);
      return realisations;
    })
    .catch((error) => console.log(error.response));
}

export default { getRealisations };