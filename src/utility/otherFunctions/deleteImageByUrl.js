import cloudinaryRequest from "../apiRequests/cloudinaryRequest";
import createCloudinaryData from "./createCloudinaryData";

/**Delete image saved on cloudinary by its url */
export default function deleteImageByUrl(url) {
  const imageId = url.split("/").pop().split(".")[0];
  const formData = createCloudinaryData(imageId);
  cloudinaryRequest(formData);
}
