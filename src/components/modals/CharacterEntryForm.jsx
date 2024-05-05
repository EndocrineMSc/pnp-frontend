import PropTypes from "prop-types";
import ImagePicker from "../basic-ui/ImagePicker";
import unescapeText from "../../utilityFunctions/unescapeText";
import { useState, useEffect } from "react";
import formErrorMessages from "../../globalConstants/formErrorMessages";

/** Entry Form for characters.
 * @param {function} handleAbortClose
 * @param {function} handleFormSubmission
 * @param {function} handleUrlChange
 * @param {object} [prevData] - previously displayed entry data only needed in update action.
 */
const CharacterEntryForm = ({
  handleAbortClose,
  handleFormSubmission,
  handleUrlChange,
  prevData,
}) => {
  const [name, setName] = useState(prevData ? unescapeText(prevData.name) : "");
  const [nameError, setNameError] = useState("");
  const [shortDescription, setShortDescription] = useState(
    prevData ? unescapeText(prevData.shortDescription) : "",
  );
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    let nError = "";
    if (name === "") {
      nError = formErrorMessages.requiredField;
    } else if (name.length === 50) {
      nError = formErrorMessages.maxLengthReached;
    }
    setNameError(nError);

    setDescriptionError(
      shortDescription.length === 500 ? formErrorMessages.maxLengthReached : "",
    );
  }, [name, shortDescription.length]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleShortDescriptionChange = (e) => {
    setShortDescription(e.target.value);
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
          <div className="relative">
            <input
              className={`input-base h-8 ${nameError !== "" ? "input-error" : ""}`}
              type="text"
              id="name"
              name="name"
              onChange={handleNameChange}
              defaultValue={prevData ? unescapeText(prevData.name) : ""}
              required
            />
            <div className="error-message">{nameError ? nameError : ""}</div>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-1">
          <label className="font-bold" htmlFor="occupation">
            Occupation
          </label>
          <input
            className="input-base h-8"
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
            className="input-base h-8"
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
            <div className="relative">
              <textarea
                className={`input-base w-full ${descriptionError !== "" ? "input-error" : ""}`}
                rows="5"
                cols="100"
                id="short_description"
                name="short_description"
                maxLength={500}
                onChange={handleShortDescriptionChange}
                defaultValue={prevData ? prevData.short_description : ""}
              />
              <div className="error-message">
                {descriptionError ? descriptionError : ""}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start gap-1">
            <label className="font-bold" htmlFor="long_description">
              Long Description
            </label>
            <textarea
              className="input-base"
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
  handleAbortClose: PropTypes.func.isRequired,
  handleFormSubmission: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  prevData: PropTypes.object,
};

export default CharacterEntryForm;
