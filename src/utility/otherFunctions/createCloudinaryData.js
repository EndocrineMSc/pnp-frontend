import { SHA1 } from "crypto-js";

export default function createCloudinaryData(imageId) {
  const data = new FormData();
  const timestamp = Date.now();

  data.append("public_id", imageId);

  const secret =
    process.env.CLOUDINARY_SECRET || import.meta.env.VITE_CLOUDINARY_SECRET;

  const unencodedSignature = `public_id=${imageId}&timestamp=${timestamp}${secret}`;
  const hash = SHA1(unencodedSignature).toString();
  data.append("signature", hash);

  data.append(
    "api_key",
    process.env.CLOUDINARY_KEY || import.meta.env.VITE_CLOUDINARY_KEY,
  );
  data.append("timestamp", timestamp);
  return data;
}
