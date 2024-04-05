import { useEffect, useContext, useState } from "react";
import { ApiContext } from "../../Contexts";
import { formPostRequest } from "../../apiRequests/formPostRequest";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

/** Update Form for Locations and Items. Characters and Campaigns are separate.
 * @param {string} type - "location"/"object" type of database entry that should be created/updated.
 * @param {string} mode - "create"/"update" type of CRUD action to be performed on entry.
 * @param {function} updateParent - function to rerender parent.
 * @param {function} onClose - parent function to close form.
 * @param {object} [prevData] - previously displayed entry data only needed in update action.
 */
const EntryForm = ({ type, mode, updateParent, onClose, prevData }) => {
  const apiContext = useContext(ApiContext);
  const [entryCreated, setEntryCreated] = useState(false);
  const uri =
    mode === "create"
      ? `https://pnp-backend.fly.dev/api/v1/${apiContext.campaignId}/${type}/create`
      : `https://pnp-backend.fly.dev/api/v1/${type}/${prevData._id}/update`;

  useEffect(() => {
    const closeForm = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", closeForm);

    return () => {
      window.removeEventListener("keydown", closeForm);
    };
  }, [onClose]);

  const handleFormSubmission = async (event) => {
    const result = await formPostRequest(event, uri);

    if (result[0]) {
      console.error(result[0].msg);
    } else {
      console.log(result);
      updateParent(result);
      setEntryCreated(true);
    }
  };

  if (entryCreated) {
    <Navigate to={`/${type}s`} />;
  }
  return (
    <div className="flex justify-center items-start absolute left-0 top-0 w-full h-screen pt-5">
      <div
        className="absolute w-full h-full bg-wgray-950/80 -mt-5"
        onClick={onClose}
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
            required
          />
        </div>
        <div className="flex flex-col justify-start gap-1">
          <label className="font-bold" htmlFor="image">
            Image (150x150px png/jpeg/gif)
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            id="image"
            name="image"
          />
        </div>
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
