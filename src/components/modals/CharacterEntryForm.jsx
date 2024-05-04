import { useEffect, useState } from "react";
import { formPostRequest } from "../../apiRequests/formPostRequest";
import { useNavigate } from "react-router-dom";
import deleteImageByUrl from "../../utilityFunctions/deleteImageByUrl";
import PropTypes from "prop-types";
import useCampaignId from "../../hooks/useCampaignId";
import ImagePicker from "../basic-ui/ImagePicker";
import unescapeText from "../../utilityFunctions/unescapeText";

/** Entry Form for characters.
 * @param {string} mode - "create" or "update" -> update shows previous Data as default values.
 * @param {function} onClose - toggle function for showing the form in the parent.
 * @param {object} [prevData] - previous character data, only needed in update mode.
 * @param {function} updateParent - function to trigger rerender of parent with new entry.
 */
const CharacterEntryForm = ({ mode, onClose, prevData, updateParent }) => {
  const campaignId = useCampaignId()[0];
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [prevRenderUrl, setPrevRenderUrl] = useState("");

  const handleUrlChange = (url) => {
    if (!prevRenderUrl) {
      setPrevRenderUrl(url);
    } else if (url !== prevRenderUrl) {
      deleteImageByUrl(prevRenderUrl);
      setPrevRenderUrl(url);
    }

    setImageUrl(url);
  };

  const handleSubmissionClose = () => {
    if (prevData && prevData.image && prevData.image !== imageUrl) {
      onClose(prevData.image);
    } else {
      onClose();
    }
  };

  const handleAbortClose = () => {
    imageUrl ? onClose(imageUrl) : onClose();
  };

  const uri =
    mode === "create"
      ? `https://pnp-backend.fly.dev/api/v1/${campaignId}/character/create`
      : `https://pnp-backend.fly.dev/api/v1/character/${prevData._id}/update`;

  useEffect(() => {
    const closeForm = (event) => {
      if (event.key === "Escape") {
        imageUrl ? onClose(imageUrl) : onClose();
      }
    };
    window.addEventListener("keydown", closeForm);

    return () => {
      window.removeEventListener("keydown", closeForm);
    };
  }, [imageUrl, onClose]);

  const handleFormSubmission = async (event) => {
    const result = await formPostRequest(event, uri);

    if (result[0]) {
      console.error(result[0].msg);
    } else {
      updateParent(result);
      handleSubmissionClose();
      mode === "create"
        ? navigate(`/characters`)
        : navigate(`/character/${prevData._id}`);
    }
  };

  return (
    <div className="flex justify-center items-start absolute left-0 top-0 w-full h-screen pt-5">
      <div
        className="absolute w-full h-full bg-wgray-950/80 -mt-5"
        onClick={handleAbortClose}
      ></div>
      <form
        className="relative flex flex-wrap max-w-screen-sm gap-5 bg-wgray-300 p-5 rounded-xl"
        action=""
        method="POST"
        onSubmit={handleFormSubmission}
      >
        <div className="flex flex-col justify-start gap-1">
          <label className="font-bold" htmlFor="name">
            Name&#42;
          </label>
          <input
            className="rounded bg-wgray-50 h-8"
            type="text"
            id="name"
            name="name"
            defaultValue={prevData ? unescapeText(prevData.name) : ""}
            required
          />
        </div>
        <div className="flex flex-col justify-start gap-1">
          <label className="font-bold" htmlFor="occupation">
            Occupation
          </label>
          <input
            className="rounded bg-wgray-50 h-8"
            type="text"
            id="occupation"
            name="occupation"
            defaultValue={prevData ? unescapeText(prevData.occupation) : ""}
          />
        </div>
        <div className="flex flex-col justify-start gap-1">
          <label className="font-bold" htmlFor="occupation">
            Location
          </label>
          <input
            className="rounded bg-wgray-50 h-8"
            type="text"
            id="location"
            name="location"
            defaultValue={prevData ? prevData.location : ""}
          />
        </div>
        <ImagePicker
          entryType="character"
          prevImageUrl={prevData ? unescapeText(prevData.image) : ""}
          setImageUrl={handleUrlChange}
        />
        <div className="flex flex-col mb-10 w-full gap-3">
          <div className="flex flex-col justify-start gap-1">
            <label className="font-bold" htmlFor="short_description">
              Short Description (max. 500 characters)
            </label>
            <textarea
              className="rounded bg-wgray-50"
              rows="5"
              cols="100"
              id="short_description"
              name="short_description"
              defaultValue={prevData ? prevData.short_description : ""}
            />
          </div>
          <div className="flex flex-col justify-start gap-1">
            <label className="font-bold" htmlFor="long_description">
              Long Description
            </label>
            <textarea
              className="rounded bg-wgray-50"
              rows="10"
              cols="100"
              id="long_description"
              name="long_description"
              defaultValue={prevData ? prevData.long_description : ""}
            />
          </div>
        </div>
        <button
          className="absolute right-2 bottom-2 rounded bg-wgray-500 w-20 h-8 shadow-md"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

CharacterEntryForm.propTypes = {
  mode: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  prevData: PropTypes.object,
  updateParent: PropTypes.func.isRequired,
};

export default CharacterEntryForm;
