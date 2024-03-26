import { useEffect } from "react";

/** Update Form for Locations and Items. Characters and Campaigns are separate. */
const CampaignEditForm = ({ type, prevData, onClose }) => {
  //const uri = `https://pnp-backend.fly.dev/api/v1/campaign/${prevData._id}`;
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

  return (
    <div className="flex justify-center items-start absolute left-0 top-0 w-full h-screen pt-5">
      <div
        className="absolute w-full h-full bg-wgray-950/80 -mt-5"
        onClick={onClose}
      ></div>
      <form
        className="relative flex flex-wrap max-w-screen-sm gap-5 bg-wgray-300 p-5 rounded-xl"
        action="" /*{uri}*/
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
        <label className="font-bold" htmlFor="description">
          Description
        </label>
        <textarea
          className="rounded bg-wgray-50 mb-10"
          rows="5"
          cols="100"
          id="description"
          name="description"
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

export default CampaignEditForm;
