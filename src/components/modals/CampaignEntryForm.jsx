import { useState, useEffect } from "react";
import { formPostRequest } from "../../apiRequests/formPostRequest";
import { useNavigate } from "react-router-dom";
import ImagePicker from "../basic-ui/ImagePicker";
import deleteImageByUrl from "../../utilityFunctions/deleteImageByUrl";
import PropTypes from "prop-types";
import { unescape } from "html-escaper";

/** Entry Form for campaigns.
 * @param {string} mode - "create" or "update" -> update shows previous Data as default values.
 * @param {function} onClose - toggle function for showing the form in the parent.
 * @param {object} [prevData] - previous campaign data, only needed in update mode.
 * @param {function} updateParent - function to trigger rerender of parent with new entry.
 */
const CampaignEntryForm = ({ mode, onClose, prevData, updateParent }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
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
      ? `https://pnp-backend.fly.dev/api/v1/${userId}/campaign/create`
      : `https://pnp-backend.fly.dev/api/v1/campaign/${prevData._id}/update`;

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
        ? navigate(`/campaigns`)
        : navigate(`/campaign/${prevData._id}`);
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
            defaultValue={prevData ? unescape(prevData.name) : ""}
            required
          />
        </div>
        <ImagePicker
          entryType="campaign"
          prevImageUrl={prevData.image}
          setImageUrl={handleUrlChange}
        />
        <label className="font-bold" htmlFor="description">
          Description
        </label>
        <textarea
          className="rounded bg-wgray-50 mb-10"
          rows="5"
          cols="100"
          id="description"
          name="description"
          defaultValue={prevData ? unescape(prevData.description) : ""}
        />
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

CampaignEntryForm.propTypes = {
  mode: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  prevData: PropTypes.object,
  updateParent: PropTypes.func.isRequired,
};

export default CampaignEntryForm;
