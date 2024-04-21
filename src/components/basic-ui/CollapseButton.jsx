import Icon from "@mdi/react";
import {
  mdiArrowExpandRight,
  mdiArrowExpandLeft,
  mdiArrowCollapseLeft,
  mdiArrowCollapseRight,
} from "@mdi/js";
import PropTypes from "prop-types";

/**Button to collapse an element to the side
 * @param {bool} isExpanded
 * @param {function} toggleCollapse - Parent function to toggle isExpanded
 * @param {bool} isPageRight - Whether or not the collapsible element is left or right
 */
const CollapseButton = ({ isExpanded, toggleCollapse, isPageRight }) => {
  const iconPath = () => {
    console.log(isExpanded);
    if (isExpanded) {
      return isPageRight ? mdiArrowCollapseRight : mdiArrowCollapseLeft;
    }
    return isPageRight ? mdiArrowExpandLeft : mdiArrowExpandRight;
  };

  const handleButtonClick = () => {
    toggleCollapse();
    console.log("Toggle Button!");
  };

  return (
    <button
      className=" w-11 aspect-square rounded shrink-0
                  flex justify-center items-center
                  bg-gradient-to-b from-wgray-500 to-wgray-600 
                  hover:from-wgray-600 hover:to-wgray-700 
                  focus:from-wgray-700 focus:to-wgray-800"
      onClick={handleButtonClick}
    >
      <Icon path={iconPath()} size={1.1} />
    </button>
  );
};

CollapseButton.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  isPageRight: PropTypes.bool.isRequired,
};

export default CollapseButton;
