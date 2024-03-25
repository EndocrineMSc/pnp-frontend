import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";

const DetailButton = ({ type, onClick }) => {
  const iconPath = type === "edit" ? mdiPencil : mdiTrashCanOutline;

  return (
    <button
      className="flex justify-center items-center rounded-xl hover:bg-wgray-500 aspect-square w-9"
      onClick={onClick}
    >
      <Icon path={iconPath} size={1.1} />
    </button>
  );
};

export default DetailButton;
