import { formatDate } from "../hooks/formatDate";
import { useContext, useState } from "react";
import { NotesContext } from "../Contexts";

const CollapsedNote = ({ date, noteId }) => {
  const [toggledOn, setToggledOn] = useState(false);
  const noteContext = useContext(NotesContext);

  const toggleNoteDetailView = () => {
    if (toggledOn) {
      const newArray = noteContext.detailNoteIds.filter((id) => id !== noteId);
      noteContext.setDetailNoteIds(newArray);
      setToggledOn(false);
    } else {
      noteContext.setDetailNoteIds([...noteContext.detailNoteIds, noteId]);
      setToggledOn(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleNoteDetailView}
      className="bg-wgray-300 w-full h-10 rounded shadow hover:shadow-md"
    >
      {formatDate(date)}
    </button>
  );
};

export default CollapsedNote;
