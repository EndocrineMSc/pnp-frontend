import { postRequest } from "./postRequest";

/**
 * Transforms form body to an object to send an api request to the backend.
 * ToDo: Will also upload image to cloudinary and save image url to the database instead
 * @param {event} event - The event that triggers the request
 * @param {string} uri - The uri for the request
 * @returns result of the api request
 */
export const formPostRequest = async (event, uri) => {
  event.preventDefault();
  const data = new FormData(event.target);
  data.delete("image");
  const dataObject = {};
  for (const [key, value] of data.entries()) {
    dataObject[key] = value;
  }
  const result = await postRequest(uri, dataObject);
  return result;
};
