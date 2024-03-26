import Icon from "@mdi/react";
import EditForm from "../modals/EditForm";
import CharacterEditForm from "../modals/CharacterEditForm";
import { mdiPencil } from "@mdi/js";
import { useState } from "react";
import CampaignEditForm from "../modals/CampaignEditForm";

const EditButton = ({ type, data }) => {
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
      return <CampaignEditForm prevData={data} onClose={toggleEdit} />;
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

export default EditButton;
