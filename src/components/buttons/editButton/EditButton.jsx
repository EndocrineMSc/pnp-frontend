import { useState } from "react";
import deleteImageByUrl from "../../../utility/otherFunctions/deleteImageByUrl";
import FormWrapper from "../../modals/entryFormWrapper/EntryFormWrapper";
import PropTypes from "prop-types";
import { mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";

/**Button component to edit entries.
 * @param {string} type - "character", "object", "location", "campaign", "note" - Determines the type of entry form connected to the button.
 * @param {object} data - previously displayed data of the entry.
 * @param {function(object)} updateParent - Parent callback to update with new data on edit.
 */
const EditButton = ({ type, data, updateParent }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openModal = () => {
    setIsEditOpen(true);
  };

  const closeModal = (imageUrl) => {
    if (imageUrl) {
      deleteImageByUrl(imageUrl);
    }
    setIsEditOpen(false);
  };

  const formProps = {
    type,
    mode: "update",
    updateParent,
    onClose: closeModal,
    prevData: data,
  };

  return (
    <>
      <button
        className="flex justify-center items-center rounded-xl 
                  hover:bg-wgray-500 focus:bg-wgray-500  
                  focus:outline-none aspect-square w-9"
        onClick={openModal}
      >
        <Icon path={mdiPencil} size={1.1} />
      </button>
      {isEditOpen ? <FormWrapper {...formProps} /> : <></>}
    </>
  );
};

EditButton.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default EditButton;
