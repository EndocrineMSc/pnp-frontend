import { useEffect, useState } from "react";
import { formPostRequest } from "../../apiRequests/formPostRequest";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useCampaignId from "../../hooks/useCampaignId";
import ImagePicker from "../basic-ui/ImagePicker";
import deleteImageByUrl from "../../utilityFunctions/deleteImageByUrl";
import unescapeText from "../../utilityFunctions/unescapeText";

/** Update Form for Locations and Items. Characters and Campaigns are separate.
 * @param {string} type - "location"/"object" type of database entry that should be created/updated.
 * @param {string} mode - "create"/"update" type of CRUD action to be performed on entry.
 * @param {function} updateParent - function to rerender parent.
 * @param {function} onClose - parent function to close form.
 * @param {object} [prevData] - previously displayed entry data only needed in update action.
 */
const EntryForm = ({ type, mode, onClose, updateParent, prevData }) => {
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
    if (prevData.image && prevData.image !== imageUrl) {
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
      ? `https://pnp-backend.fly.dev/api/v1/${campaignId}/${type}/create`
      : `https://pnp-backend.fly.dev/api/v1/${type}/${prevData._id}/update`;

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
        ? navigate(`/${type}s`)
        : navigate(`/${type}/${prevData._id}`);
    }
  };

  return (
    <div className="flex justify-center items-start absolute left-0 top-0 w-full h-screen pt-5">
      <div
        className="absolute w-full h-full -mt-5"
        onClick={handleAbortClose}
      ></div>
      <form
        className="relative flex flex-wrap max-w-screen-sm gap-5 bg-wgray-300 p-5 rounded-xl"
        action=""
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
        <ImagePicker
          entryType={type}
          prevImageUrl={prevData.image}
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
              defaultValue={
                prevData ? unescapeText(prevData.short_description) : ""
              }
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
              defaultValue={
                prevData ? unescapeText(prevData.long_description) : ""
              }
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

EntryForm.propTypes = {
  type: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  updateParent: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  prevData: PropTypes.object,
};

export default EntryForm;
