import { useState } from "react";
import ConfirmationBox from "../../modals/confirmationBox/ConfirmationBox";
import PropTypes from "prop-types";
import { mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";

/**Button that lets user delete an entry, will show a confirmation modal before deleting.
 * @param {string} [text="Are you sure?"] - Text to show in the confirmation modal, defaults to "Are you sure?".
 * @param {function} deleteEntry - Parent function that will delete the entry.
 */
const DeleteButton = ({ text, deleteEntry }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <button
        className="flex justify-center items-center rounded-xl 
                    hover:brightness-110
                    hover:bg-wgray-500 focus:bg-wgray-500  
                    focus:outline-none aspect-square w-9"
        onClick={toggleModal}
      >
        <Icon path={mdiTrashCanOutline} size={1.1} />
      </button>
      {isModalOpen ? (
        <ConfirmationBox
          text={text}
          onConfirm={deleteEntry}
          onAbort={toggleModal}
        />
      ) : (
        <></>
      )}
    </>
  );
};

DeleteButton.defaultProps = {
  text: "Are you sure?",
};

DeleteButton.propTypes = {
  text: PropTypes.string,
  deleteEntry: PropTypes.func.isRequired,
};

export default DeleteButton;
