import axios from "axios";
import Cache from "./cache"
import {PRICES_API} from "../config";


async function getPrices() {
    const cachedPrices = await Cache.get("prices");
    
    if (cachedPrices) return cachedPrices;
    
    return axios
    .get(PRICES_API)
    .then((response) => {
        const prices = response.data["hydra:member"];
        Cache.set("prices", prices);
        
        return prices;
    })
    .catch((error) => console.log(error.response));
}

export default  {getPrices};