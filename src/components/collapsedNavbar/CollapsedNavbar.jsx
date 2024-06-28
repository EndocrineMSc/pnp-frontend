import { useContext } from "react";
import CollapseButton from "../buttons/collapseButton/CollapseButton";
import { NavbarContext } from "../../utility/contexts";

/**Collapsed Navbar for space control and button to re-expand. */
const CollapsedNavbar = () => {
  const providerValues = useContext(NavbarContext);

  return (
    <div className="absolute left-2 top-2 z-10">
      <CollapseButton
        toggleCollapse={providerValues.toggleNavbar}
        isExpanded={providerValues.isExpanded}
        isPageRight={false}
      />
    </div>
  );
};

export default CollapsedNavbar;
