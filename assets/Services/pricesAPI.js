import axios from "axios";


function getPrices() {
    return axios
    .get("http://localhost:8000/api/pricess")
    .then((response) => response.data["hydra:member"])
    .catch((error) => console.log(error.response));
}

export default  {getPrices};