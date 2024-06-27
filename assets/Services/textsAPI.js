import axios from "axios";
import {TEXT_API} from "../config";

async function getTexts() {
  return axios
    .get(TEXT_API)
    .then((response) => {
      const texts = response.data["hydra:member"];
      console.log("from API", texts);
      return texts;
    })
    .catch((error) => console.log(error.response));
}

export default { getTexts };
