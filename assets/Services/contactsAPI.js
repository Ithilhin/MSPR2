import axios from "axios";
import { CONTACT_API } from "../config";

/**
 * Sends a contact message to the server.
 * @param {Object} contact - The contact message object to be sent.
 * @returns {Promise} A promise that resolves with the response of the POST request.
 */
function postContactMessage(contact) {
  // Use axios to send a POST request to the CONTACT_API endpoint with the contact object as the payload
  return axios.post(CONTACT_API, contact);
}

export default { postContactMessage };
