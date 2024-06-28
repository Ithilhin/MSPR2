import axios from "axios";
import Cache from "./cache";
import { CLIENT_API } from "../config";

async function getClients() {
  const cachedClients = await Cache.get("clients");
  if (cachedClients) return cachedClients;

  return axios
    .get(CLIENT_API)
    .then((response) => {
      const clients = response.data["hydra:member"];
      Cache.set("founders", clients);
      return clients;
    })
    .catch((error) => console.log(error.response));
}

export default { getClients };
