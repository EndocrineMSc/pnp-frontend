import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import { useState, useContext } from "react";
import CharacterEntryForm from "../modals/CharacterEntryForm";
import CampaignEntryForm from "../modals/CampaignEntryForm";
import EntryForm from "../modals/EntryForm";
import { NotesContext } from "../../Contexts";
import { apiRequest } from "../../apiRequests/apiRequest";
import PropTypes from "prop-types";
import useCampaignId from "../../hooks/useCampaignId";

/** Default Button for adding any type of entry, will position itself bottom right (absolute)
 * @param {string} type - "character", "object", "location", "campaign", "note" - determines the type of entry form connected to the button "note" will add a new empty note directly instead
 * @param {function} updateParent - function to trigger rerender of parent with new entry
 */
const AddButton = ({ type, updateParent }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const notesContext = useContext(NotesContext);
  const campaignId = useCampaignId()[0];
  console.log(campaignId.toString());

  const toggleEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  const form = function () {
    if (type === "character") {
      return (
        <CharacterEntryForm
          mode="create"
          onClose={toggleEdit}
          updateParent={updateParent}
        />
      );
    } else if (type === "object" || type === "location") {
      return (
        <EntryForm
          type={type}
          mode="create"
          updateParent={updateParent}
          onClose={toggleEdit}
        />
      );
    } else if (type === "campaign") {
      return (
        <CampaignEntryForm
          mode="create"
          onClose={toggleEdit}
          updateParent={updateParent}
        />
      );
    }
  };

  const addNote = () => {
    if (type === "note") {
      const noteBody = { date: new Date() };
      const createNewNote = async () => {
        const newNote = await apiRequest(
          "POST",
          `https://pnp-backend.fly.dev/api/v1/${campaignId}/note/create`,
          noteBody,
        );
        notesContext.setDetailNoteIds([
          ...notesContext.detailNoteIds,
          newNote._id,
        ]);
      };
      createNewNote();
    }
  };

  const handleButtonClick = () => {
    type === "note" ? addNote() : toggleEdit();
  };

  return (
    <>
      <button
        className="flex justify-center items-center
                  absolute right-2 bottom-2 rounded-full drop-shadow-md
                  aspect-square w-24 hover:brightness-125 hover:drop-shadow-xl"
        onClick={handleButtonClick}
        disabled={type !== "campaign" && campaignId === ""}
      >
        <Icon path={mdiPlusCircle} color="#6a7fc1" />
      </button>
      {isEditOpen ? form() : <></>}
    </>
  );
};

AddButton.propTypes = {
  type: PropTypes.string.isRequired,
  updateParent: PropTypes.func,
};

export default AddButton;
