import Icon from "@mdi/react";
import EntryForm from "../modals/EntryForm";
import CharacterEntryForm from "../modals/CharacterEntryForm";
import { mdiPencil } from "@mdi/js";
import { useState } from "react";
import CampaignEntryForm from "../modals/CampaignEntryForm";
import PropTypes from "prop-types";

/**Button component to edit entries.
 * @param {string} type - "character", "object", "location", "campaign", "note" - Determines the type of entry form connected to the button.
 * @param {object} data - previously displayed data of the entry.
 * @param {function(object)} updateParent - Parent callback to update with new data on edit.
 */
const EditButton = ({ type, data, updateParent }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const toggleEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  const form = function () {
    if (type === "character") {
      return <CharacterEntryForm prevData={data} onClose={toggleEdit} />;
    } else if (type === "object" || type === "location") {
      return (
        <EntryForm
          type={type}
          prevData={data}
          onClose={toggleEdit}
          updateParent={updateParent}
          mode="update"
        />
      );
    } else {
      return <CampaignEntryForm prevData={data} onClose={toggleEdit} />;
    }
  };

  return (
    <>
      <button
        className="flex justify-center items-center rounded-xl 
                  hover:bg-wgray-500 focus:bg-wgray-500  
                  focus:outline-none aspect-square w-9"
        onClick={toggleEdit}
      >
        <Icon path={mdiPencil} size={1.1} />
      </button>
      {isEditOpen ? form() : <></>}
    </>
  );
};

EditButton.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default EditButton;
