import { useState, useContext } from "react";
import { mdiPlusCircle } from "@mdi/js";
import FormWrapper from "../../modals/entryFormWrapper/EntryFormWrapper";
import { NotesContext } from "../../../utility/contexts";
import addNote from "../../../utility/otherFunctions/addNote";
import useCampaignId from "../../../utility/hooks/useCampaignId";
import PropTypes from "prop-types";
import Icon from "@mdi/react";

/** Default Button for adding any type of entry, will position itself bottom right (absolute)
 * @param {string} type - "character", "object", "location", "campaign", "note" - determines the type of entry form connected to the button "note" will add a new empty note directly instead
 * @param {function} updateParent - function to trigger rerender of parent with new entry
 */
const AddButton = ({ type, updateParent }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const notesContext = useContext(NotesContext);
  const campaignId = useCampaignId()[0];

  const toggleEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  const formProps = {
    type,
    mode: "create",
    updateParent,
    onClose: toggleEdit,
  };

  const handleButtonClick = () => {
    type === "note" ? addNote(campaignId, notesContext) : toggleEdit();
  };

  return (
    <>
      <button
        className="absolute flex justify-center items-center right-2 bottom-2 rounded-full drop-shadow-md aspect-square w-24 hover:brightness-125 hover:drop-shadow-xl"
        onClick={handleButtonClick}
        disabled={type !== "campaign" && campaignId === ""}
      >
        <Icon path={mdiPlusCircle} color="#6a7fc1" />
      </button>
      {isEditOpen ? <FormWrapper {...formProps} /> : <></>}
    </>
  );
};

AddButton.propTypes = {
  type: PropTypes.string.isRequired,
  updateParent: PropTypes.func,
};

export default AddButton;
