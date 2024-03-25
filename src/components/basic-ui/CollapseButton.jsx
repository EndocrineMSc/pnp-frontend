import Icon from "@mdi/react";
import {
  mdiArrowExpandRight,
  mdiArrowExpandLeft,
  mdiArrowCollapseLeft,
  mdiArrowCollapseRight,
} from "@mdi/js";

const CollapseButton = ({ isExpanded, toggleCollapse, isPageRight }) => {
  const iconPath = () => {
    if (isExpanded) {
      return isPageRight ? mdiArrowCollapseRight : mdiArrowCollapseLeft;
    }
    return isPageRight ? mdiArrowExpandLeft : mdiArrowExpandRight;
  };

  return (
    <button
      className=" w-11 aspect-square rounded shrink-0
                  flex justify-center items-center
                  bg-gradient-to-b from-wgray-500 to-wgray-600 
                  hover:from-wgray-600 hover:to-wgray-700 
                  focus:from-wgray-700 focus:to-wgray-800"
      onClick={toggleCollapse}
    >
      <Icon path={iconPath()} size={1.1} />
    </button>
  );
};

export default CollapseButton;
