import { useContext } from "react";
import CollapsedNote from "../collapsedNote/CollapsedNote";
import CollapseButton from "../../buttons/collapseButton/CollapseButton";
import { NotesContext } from "../../../utility/contexts";

/**Collapsible scrollbar container for displaying top-level representation of notes (collapsed notes)
 * @param {Array.<object>} notes - Array of note data to be displayed.
 */
const NoteScrollbar = ({ notes }) => {
  const providerValues = useContext(NotesContext);
  return (
    <nav className="flex flex-col justify-start items-center gap-3 bg-wgray-200 h-screen list-none pl-2 pr-2 w-80 relative">
      <div className="relative w-full top-2 mb-1">
        <CollapseButton
          isExpanded={providerValues.isExpanded}
          toggleCollapse={providerValues.toggleScrollbar}
          isPageRight={true}
        />
      </div>
      {notes && notes.length > 0 ? (
        notes.map((note) => {
          return (
            <CollapsedNote key={note._id} date={note.date} noteId={note._id} />
          );
        })
      ) : (
        <></>
      )}
    </nav>
  );
};

NoteScrollbar.defaultProps = {
  notes: [],
};

export default NoteScrollbar;
