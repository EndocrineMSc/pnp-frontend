import { apiRequest } from "./apiRequest";

/**
 * Transforms form body to an object to send an api request to the backend with authorization handling.
 * @param {event} event - The event that triggers the request
 * @param {string} uri - The uri for the request
 * @returns {object | Array} result of the api request
 */
export const formPostRequest = async (event, uri) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = {};
  for (const [key, value] of data.entries()) {
    dataObject[key] = value;
  }
  const result = await apiRequest("POST", uri, dataObject);
  return result;
};
