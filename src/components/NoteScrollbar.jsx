import CollapsedNote from "./CollapsedNote";
import CollapseButton from "./basic-ui/CollapseButton";
import Searchbar from "./basic-ui/Searchbar";
import { NotesContext } from "../Contexts";
import { useContext } from "react";

const NoteScrollbar = ({ notes }) => {
  const providerValues = useContext(NotesContext);
  return (
    <nav className="flex flex-col justify-start items-center gap-3 bg-wgray-200 h-screen list-none pl-2 pr-2 w-80">
      <div className="flex gap-3 pt-2">
        <CollapseButton
          isExpanded={providerValues.isExpanded}
          toggleCollapse={providerValues.toggleScrollbar}
          isPageRight={true}
        />
        <Searchbar />
      </div>
      {notes ? (
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

export default NoteScrollbar;
