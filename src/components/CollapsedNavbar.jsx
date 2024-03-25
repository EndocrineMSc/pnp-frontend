import CollapseButton from "./basic-ui/CollapseButton";
import { NavbarContext } from "../Contexts";
import { useContext } from "react";

const CollapsedNavbar = () => {
  const providerValues = useContext(NavbarContext);

  return (
    <div className="absolute left-2 top-2">
      <CollapseButton
        toggleCollapse={providerValues.toggleNavbar}
        isExpanded={providerValues.isExpanded}
        isPageRight={false}
      />
    </div>
  );
};

export default CollapsedNavbar;
