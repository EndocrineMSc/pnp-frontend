import CollapseButton from "./basic-ui/CollapseButton";
import { NotesContext } from "../Contexts";
import { useContext } from "react";

/**Container to display collapsed notes */
const CollapsedNoteScrollbar = () => {
  const providerValues = useContext(NotesContext);
  return (
    <div className="absolute right-2 top-2">
      <CollapseButton
        toggleCollapse={providerValues.toggleScrollbar}
        isExpanded={providerValues.isExpanded}
        isPageRight={true}
      />
    </div>
  );
};

export default CollapsedNoteScrollbar;
