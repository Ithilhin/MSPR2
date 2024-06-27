import axios from "axios";
import Cache from "./cache";
import {USER_API} from "../config";

async function getFounders() {
  const cachedFounders = await Cache.get("founders");
  
  if (cachedFounders) return cachedFounders;
  
  return axios
    .get(USER_API)
    .then((response) => {
      const founders = response.data["hydra:member"];
      Cache.set("founders", founders);
      
      return founders;
    })
    .catch((error) => console.log(error.response));
}

export default { getFounders };