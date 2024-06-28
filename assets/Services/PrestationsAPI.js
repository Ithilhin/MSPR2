import axios from "axios";
import Cache from "./cache";
import { PRESTATION_API } from "../config";

async function getPrestations() {
  const cachedPrestations = await Cache.get("prestations");
  if (cachedPrestations) return cachedPrestations;

  return axios
    .get(PRESTATION_API)
    .then((response) => {
      const prestations = response.data["hydra:member"];
      Cache.set("prestations", prestations);
      return prestations;
    })
    .catch((error) => console.log(error.response));
}

export default { getPrestations };
