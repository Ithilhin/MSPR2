import axios from "axios";
import { CONTACT_API } from "../config";

function postContactMessage(contact){
  return axios.post(
        CONTACT_API,
        contact      
      );
}

export default { postContactMessage };