import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import { useState, useContext } from "react";
import CharacterEditForm from "../modals/CharacterEditForm";
import CampaignEntryForm from "../modals/CampaignEntryForm";
import EditForm from "../modals/EditForm";
import { NotesContext } from "../../Contexts";
import { postRequest } from "../../hooks/postRequest";

/** Default Button for adding any type of entry, will position itself bottom right (absolute)
 * @param {string} type - "character", "object", "location", "campaign", "note" - determines the type of
 * entry form connected to the button "note" will add a new empty note directly instead
 */
const AddButton = ({ type }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const notesContext = useContext(NotesContext);

  const toggleEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  const form = function () {
    if (type === "character") {
      return <CharacterEditForm onClose={toggleEdit} />;
    } else if (type === "object" || type === "location") {
      return <EditForm type={type} onClose={toggleEdit} />;
    } else if (type === "campaign") {
      return <CampaignEntryForm mode="create" onClose={toggleEdit} />;
    }
  };

  const addNote = () => {
    if (type === "note") {
      const campaignId = localStorage.getItem("campaignId");
      const noteBody = { date: new Date() };
      const createNewNote = async () => {
        const newNote = await postRequest(
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
      >
        <Icon path={mdiPlusCircle} color="#6a7fc1" />
      </button>
      {isEditOpen ? form() : <></>}
    </>
  );
};

export default AddButton;
