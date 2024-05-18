import { formatDate } from "../utilityFunctions/formatDate";
import { useContext, useState, useEffect } from "react";
import { NotesContext } from "../Contexts";
import PropTypes from "prop-types";

/**Collapsed representation of a note, toggles full note to display.
 * @param {string} date
 * @param {string} noteId - Mongoose ObjectId of the note.
 */
const CollapsedNote = ({ date, noteId }) => {
  const [toggledOn, setToggledOn] = useState(false);
  const [animation, setAnimation] = useState("");
  const noteContext = useContext(NotesContext);
  const bgColor = toggledOn ? "bg-wgray-500" : "bg-wgray-300";

  const toggleNoteDetailView = () => {
    console.log(animation);
    if (toggledOn) {
      const newArray = noteContext.detailNoteIds.filter((id) => id !== noteId);
      noteContext.setDetailNoteIds(newArray);
      setToggledOn(false);
    } else if (
      noteContext.amountAllowedDetailNotes > noteContext.detailNoteIds.length
    ) {
      noteContext.setDetailNoteIds([...noteContext.detailNoteIds, noteId]);
      setToggledOn(true);
    }
  };

  useEffect(() => {
    setToggledOn(noteContext.detailNoteIds.includes(noteId));
  }, [noteContext.detailNoteIds, noteId]);

  useEffect(() => {
    const animationText =
      noteContext.amountAllowedDetailNotes !== noteContext.detailNoteIds.length
        ? "animate-none"
        : "animate-button-shake";
    setAnimation(animationText);
  }, [noteContext.detailNoteIds, noteContext.amountAllowedDetailNotes]);

  return (
    <button
      type="button"
      onClick={toggleNoteDetailView}
      className={`${bgColor} w-full h-10 rounded shadow hover:shadow-md active:${!toggledOn ? animation : ""}`}
    >
      {formatDate(date)}
    </button>
  );
};

CollapsedNote.propTypes = {
  date: PropTypes.string.isRequired,
  noteId: PropTypes.string.isRequired,
};

export default CollapsedNote;
