import axios from "axios";
import Cache from "./cache"
import {PRICES_API} from "../config";


async function getPrices() {
    const cachedPrices = await Cache.get("prices");
    console.log("from cache", cachedPrices);
    if (cachedPrices) return cachedPrices;
    
    return axios
    .get(PRICES_API)
    .then((response) => {
        const prices = response.data["hydra:member"];
        Cache.set("prices", prices);
        console.log("from API", prices);
        return prices;
    })
    .catch((error) => console.log(error.response));
}

export default  {getPrices};