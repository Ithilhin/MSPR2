import axios from "axios";

function postContactMessage(){
    return axios.post(
        "http://localhost:8000/api/contacts",
        contact      
      );
}

export default { postContactMessage };