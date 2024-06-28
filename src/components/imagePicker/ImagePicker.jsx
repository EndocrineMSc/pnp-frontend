import { useState, useRef, useEffect } from "react";
import useDefaultImage from "../../utility/hooks/useDefaultImage";
import PropTypes from "prop-types";
import Icon from "@mdi/react";

/**Allows for uploading and image to cloudinary,
 * hidden input will hold the returned cloudinary url as its value
 * @param {String} prevImageUrl
 * @param {String} entryType - "campaign", "character", "location", "object"
 * @param {function} setImageUrl - parent state setter for image id
 */
const ImagePicker = ({ prevImageUrl, entryType, setImageUrl }) => {
  const [imagePath, setImagePath] = useState(prevImageUrl);

  const defaultImage = useDefaultImage(entryType);

  const widgetRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName:
          process.env.CLOUDINARY_NAME || import.meta.env.VITE_CLOUDINARY_NAME,
        uploadPreset:
          process.env.CLOUDINARY_IMAGE_PRESET ||
          import.meta.env.VITE_CLOUDINARY_IMAGE_PRESET,
      },
      function (error, result) {
        if (error) console.error(error);
        if (result.info.secure_url) {
          setImageUrl(result.info.secure_url);
          setImagePath(result.info.secure_url);
          inputRef.current.value = result.info.secure_url;
        }
      },
    );

    return () => widgetRef.current.destroy();
  }, [setImageUrl]);

  return (
    <div className="flex flex-col justify-start gap-1">
      <div className="font-bold">Image (200x200px png/jpeg/gif)</div>
      {imagePath ? (
        <div
          style={{
            backgroundImage: `url(${imagePath})`,
          }}
          className="w-card-image h-card-image hover:bg-wgray-600 hover:opacity-60 rounded bg-no-repeat bg-center"
          aria-label={`${entryType} image`}
          onClick={() => widgetRef.current.open()}
        />
      ) : (
        <Icon
          className="w-card-image h-card-image hover:bg-wgray-600 hover:opacity-60 rounded bg-no-repeat bg-center"
          path={defaultImage}
          aria-label={`${entryType} image`}
          onClick={() => widgetRef.current.open()}
        />
      )}

      <input
        type="text"
        id="image"
        name="image"
        className="hidden"
        ref={inputRef}
      />
    </div>
  );
};

ImagePicker.propTypes = {
  prevImageUrl: PropTypes.string,
  entryType: PropTypes.string.isRequired,
  setImageUrl: PropTypes.func.isRequired,
};

export default ImagePicker;
