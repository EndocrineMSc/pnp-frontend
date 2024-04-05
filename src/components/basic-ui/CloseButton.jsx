import Icon from "@mdi/react";
import { mdiAlphaXBox } from "@mdi/js";

const CloseButton = ({ onClose, size = 1 }) => {
  return (
    <button className="hover:brightness-110" type="button" onClick={onClose}>
      <Icon path={mdiAlphaXBox} size={size} color="#6a7fc1" />
    </button>
  );
};

export default CloseButton;
