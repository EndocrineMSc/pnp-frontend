import Icon from "@mdi/react";
import { mdiAlphaXBox } from "@mdi/js";
import PropTypes from "prop-types";

/**Button to close modal/pop-up
 * @param {function} onClose - Parent function to close component with button.
 * @param {number} [size=1] - Optional, size of button Icon, defaults to 1.
 */
const CloseButton = ({ onClose, size }) => {
  return (
    <button className="hover:brightness-110" type="button" onClick={onClose}>
      <Icon path={mdiAlphaXBox} size={size} color="#6a7fc1" />
    </button>
  );
};

CloseButton.defaultProps = {
  size: 1.0,
};

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CloseButton;
