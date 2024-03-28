import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import { useState } from "react";
import CharacterEditForm from "../modals/CharacterEditForm";
import CampaignEntryForm from "../modals/CampaignEntryForm";
import EditForm from "../modals/EditForm";

const AddButton = ({ type, data }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const toggleEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  const form = function () {
    if (type === "character") {
      return <CharacterEditForm prevData={data} onClose={toggleEdit} />;
    } else if (type === "object" || type === "location") {
      return <EditForm type={type} prevData={data} onClose={toggleEdit} />;
    } else {
      return <CampaignEntryForm mode="create" onClose={toggleEdit} />;
    }
  };

  return (
    <>
      <button
        className="flex justify-center items-center
                  absolute right-2 bottom-2 rounded-full drop-shadow-md
                  aspect-square w-24 hover:brightness-125 hover:drop-shadow-xl"
        onClick={toggleEdit}
      >
        <Icon path={mdiPlusCircle} color="#6a7fc1" />
      </button>
      {isEditOpen ? form() : <></>}
    </>
  );
};

export default AddButton;
