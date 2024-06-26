import { useState, useEffect } from "react";
import ImagePicker from "../../imagePicker/ImagePicker";
import { apiRequest } from "../../../utility/apiRequests/apiRequest";
import useCampaignId from "../../../utility/hooks/useCampaignId";
import formErrorMessages from "../../../utility/globalConstants/formErrorMessages";
import unescapeText from "../../../utility/otherFunctions/unescapeText";
import PropTypes from "prop-types";

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
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(
    prevData && prevData.location ? prevData.location._id : "n.a.",
  );
  const [nameError, setNameError] = useState("");
  const [shortDescription, setShortDescription] = useState(
    prevData ? unescapeText(prevData.shortDescription) : "",
  );
  const [descriptionError, setDescriptionError] = useState("");
  const campaignId = useCampaignId()[0];

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

  useEffect(() => {
    const getLocations = async () => {
      if (campaignId) {
        const result = await apiRequest(
          "GET",
          `https://pnp-backend.fly.dev/api/v1/${campaignId}/locations`,
        );

        if (result.success) {
          const newLocations = [];
          for (const loc of result.data) {
            newLocations.push(loc);
          }
          setLocations(newLocations);
        }
      }
    };
    getLocations();
  }, [campaignId]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleShortDescriptionChange = (e) => {
    setShortDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
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
          <select
            className="input-base h-8 w-[243px] p-4"
            id="location"
            name="location"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="n.a.">n.a.</option>
            {locations.map((loc) => {
              return (
                <option value={loc._id} key={loc._id}>
                  {unescapeText(loc.name)}
                </option>
              );
            })}
          </select>
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
