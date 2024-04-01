import { formatDate } from "../hooks/formatDate";
import { useContext, useState, useEffect } from "react";
import { NotesContext } from "../Contexts";

const CollapsedNote = ({ date, noteId }) => {
  const [toggledOn, setToggledOn] = useState(false);
  const noteContext = useContext(NotesContext);
  const bgColor = toggledOn ? "bg-wgray-500" : "bg-wgray-300";

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

  useEffect(() => {
    setToggledOn(noteContext.detailNoteIds.includes(noteId));
  }, [noteContext.detailNoteIds, noteId]);

  return (
    <button
      type="button"
      onClick={toggleNoteDetailView}
      className={`${bgColor} w-full h-10 rounded shadow hover:shadow-md`}
    >
      {formatDate(date)}
    </button>
  );
};

export default CollapsedNote;
