import DeleteButton from "./basic-ui/DeleteButton";
import EditButton from "./basic-ui/EditButton";
import { postRequest } from "../apiRequests/postRequest";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

/**Detail view component for Items and Locations, Campaigns and Characters are separate
 * @param {object} viewData - Entry data to display.
 * @param {string} type - "object" or "location" - Type of entry to display.
 */
const DetailView = ({ viewData, type }) => {
  const [data, setData] = useState(viewData);
  const navigate = useNavigate();

  const deleteEntry = async () => {
    const result = await postRequest(
      `https://pnp-backend.fly.dev/api/v1/${type}/${viewData._id}/delete`,
    );

    if (result) {
      navigate(`/${type}s`);
    }
  };

  const updateView = (newData) => {
    setData(newData);
  };

  return (
    <div className="flex justify-center items-start w-full h-screen p-2">
      <div className="flex flex-col gap-3 p-4 bg-wgray-300 rounded-xl max-w-screen-sm">
        <div className="flex justify-center items-start gap-10">
          <img
            className="w-[150px] aspect-square bg-wgray-400 rounded-xl"
            src={data.image ? data.image : `./${type}.svg`}
            alt="location"
          />
        </div>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">{data.name}</h2>
          <div className="flex gap-2">
            <EditButton type={type} data={data} updateParent={updateView} />
            <DeleteButton text={`Delete ${type}?`} deleteEntry={deleteEntry} />
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h3 className="font-semibold">Short Description</h3>
          <div className="bg-wgray-200 p-2 rounded">
            {data.short_description}
          </div>
          <h3 className="font-semibold">Long Description</h3>
          <div className="bg-wgray-200 p-2 rounded">
            {data.long_description}
          </div>
        </div>
      </div>
    </div>
  );
};

DetailView.propTypes = {
  viewData: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default DetailView;
