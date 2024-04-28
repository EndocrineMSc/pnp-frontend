/**Send deletion request to cloudinary */
const cloudinaryRequest = async (formData) => {
  const cloudName =
    process.env.CLOUDINARY_NAME || import.meta.env.VITE_CLOUDINARY_NAME;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  let response = await fetch(url, { method: "POST", body: formData });
  const result = await response.json();
  return result;
};

export default cloudinaryRequest;
