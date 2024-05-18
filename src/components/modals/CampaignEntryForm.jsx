import ImagePicker from "../basic-ui/ImagePicker";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import formErrorMessages from "../../globalConstants/formErrorMessages";
import unescapeText from "../../utilityFunctions/unescapeText";

/** Entry Form for campaigns.
 * @param {function} handleAbortClose
 * @param {function} handleFormSubmission
 * @param {function} handleUrlChange
 * @param {object} [prevData] - previously displayed entry data only needed in update action.
 */
const CampaignEntryForm = ({
  handleAbortClose,
  handleFormSubmission,
  handleUrlChange,
  prevData,
}) => {
  const [name, setName] = useState(prevData ? unescapeText(prevData.name) : "");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    let nError = "";
    if (name === "") {
      nError = formErrorMessages.requiredField;
    } else if (name.length === 50) {
      nError = formErrorMessages.maxLengthReached;
    }
    setNameError(nError);
  }, [name]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="flex justify-center items-start absolute left-0 top-0 w-full h-screen pt-5">
      <div
        className="absolute w-full h-full bg-wgray-950/80 -mt-5"
        onClick={handleAbortClose}
      ></div>
      <form
        className="entry-form"
        action=""
        method="POST"
        onSubmit={handleFormSubmission}
      >
        <div className="flex flex-col justify-start gap-1">
          <label className="font-bold" htmlFor="name">
            Name&#42;
          </label>
          <div className="relative">
            <input
              className={`input-base h-8 ${nameError !== "" ? "input-error" : ""}`}
              type="text"
              id="name"
              name="name"
              onChange={handleNameChange}
              maxLength={50}
              defaultValue={prevData ? unescapeText(prevData.name) : ""}
              required
            />
            <div className="error-message">{nameError ? nameError : ""}</div>
          </div>
        </div>
        <ImagePicker
          entryType="campaign"
          prevImageUrl={prevData && prevData.image ? prevData.image : ""}
          setImageUrl={handleUrlChange}
        />
        <label className="font-bold" htmlFor="description">
          Description
        </label>
        <textarea
          className="input-base mb-10 w-full"
          rows="5"
          cols="100"
          id="description"
          name="description"
          defaultValue={prevData ? unescapeText(prevData.description) : ""}
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
  handleAbortClose: PropTypes.func.isRequired,
  handleFormSubmission: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  prevData: PropTypes.object,
};

export default CampaignEntryForm;
