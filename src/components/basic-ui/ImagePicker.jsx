import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**Allows for uploading and image to cloudinary,
 * hidden input will hold the returned cloudinary url as its value
 * @param {String} prevImageUrl
 * @param {String} entryType - "campaign", "character", "location", "object"
 */
const ImagePicker = ({ prevImageUrl, entryType }) => {
  const [imagePath, setImagePath] = useState(
    prevImageUrl ? prevImageUrl : `/${entryType}.svg`,
  );

  const widgetRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.CLOUDINARY_NAME,
        uploadPreset: process.env.CLOUDINARY_IMAGE_PRESET,
      },
      function (error, result) {
        if (error) console.error(error);
        if (result.info.secure_url) {
          console.log(result);
          setImagePath(result.info.secure_url);
          inputRef.current.value = result.info.secure_url;
        }
      },
    );
  }, []);

  return (
    <div className="flex flex-col justify-start gap-1">
      <div className="font-bold">Image (150x150px png/jpeg/gif)</div>
      <div
        style={{
          backgroundImage: `url(${imagePath})`,
        }}
        className="w-[150px] h-[150px] hover:bg-wgray-600 hover:opacity-60 rounded bg-no-repeat bg-center"
        aria-label={`${entryType} image`}
        onClick={() => widgetRef.current.open()}
      />
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
};

export default ImagePicker;
