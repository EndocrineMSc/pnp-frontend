import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      className="flex justify-center items-center rounded-xl 
                hover:bg-wgray-500 focus:bg-wgray-500  
                focus:outline-none aspect-square w-9"
      onClick={onClick}
    >
      <Icon path={mdiTrashCanOutline} size={1.1} />
    </button>
  );
};

export default DeleteButton;
