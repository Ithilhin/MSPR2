import axios from "axios";
import Cache from "./cache";
import { TEXT_API } from "../config";

async function getTexts() {
  const cachedTexts = await Cache.get("texts");
  
  if (cachedTexts) return cachedTexts;

  return axios
    .get(TEXT_API)
    .then((response) => {
      const texts = response.data["hydra:member"];
      Cache.set("texts", texts);
      
      return texts;
    })
    .catch((error) => console.log(error.response));
}

export default { getTexts };
