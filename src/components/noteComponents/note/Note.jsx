import { useState, useEffect, useContext } from "react";
import parse from "html-react-parser";
import { unescape } from "html-escaper";
import sanitizeHtml from "sanitize-html";
import Editor from "../noteEditor/NoteEditor";
import CloseButton from "../../buttons/closeButton/CloseButton";
import DeleteButton from "../../buttons/deleteButton/DeleteButton";
import { formatDate } from "../../../utility/otherFunctions/formatDate";
import { apiRequest } from "../../../utility/apiRequests/apiRequest";
import { NotesContext } from "../../../utility/contexts";
import PropTypes from "prop-types";

/**Note with full detail and text editor
 * @param {object} note - Note data to be displayed.
 */
const Note = ({ note }) => {
  const [editMode, setEditMode] = useState(false);
  const [noteText, setNoteText] = useState(note.text);
  const [sanitizedText, setSanitizedText] = useState("");
  const date = formatDate(note.date);
  console.log("----");
  console.log(note);
  console.log(`This is the ${date}`);
  console.log("----");

  const noteContext = useContext(NotesContext);

  const closeNote = () => {
    const newArray = noteContext.detailNoteIds.filter((id) => id !== note._id);
    noteContext.setDetailNoteIds(newArray);
  };

  const clickToEdit = () => {
    if (!editMode) setEditMode(true);
  };

  const endEdit = (newText) => {
    const updatedNote = { ...note, text: newText };
    apiRequest(
      "POST",
      `https://pnp-backend.fly.dev/api/v1/note/${note._id}/update`,
      updatedNote,
    );
    if (editMode) setEditMode(false);
    setNoteText(newText);
  };

  useEffect(() => {
    if (noteText) {
      const dangerousText = unescape(noteText);
      const safeText = sanitizeHtml(dangerousText);
      const parsedText = parse(safeText);
      setSanitizedText(parsedText);
    }
  }, [noteText]);

  const buildEditorText = (text) => {
    if (text) {
      const dangerousText = unescape(text);
      const safeText = sanitizeHtml(dangerousText);
      return safeText;
    }
    return "";
  };

  const deleteNote = async () => {
    const result = await apiRequest(
      "POST",
      `https://pnp-backend.fly.dev/api/v1/note/${note._id}/delete`,
    );

    if (result.success) {
      closeNote();
    }
  };

  return (
    <div
      className="relative flex flex-col shadow-md bg-wgray-100 overflow-y-auto w-full max-w-screen-sm aspect-square rounded"
      onDoubleClick={clickToEdit}
      key={note._id}
    >
      <div className="h-full">
        <div className="relative bg-gradient-to-b from-wgray-300 to-wgray-400">
          <h3 className="text-center p-1 text-xl">{date}</h3>
          <div className="flex gap-1 absolute right-0 top-0">
            <DeleteButton text="Delete this note?" deleteEntry={deleteNote} />
            <CloseButton onClose={closeNote} size={1.5} />
          </div>
        </div>
        {editMode ? (
          <Editor text={buildEditorText(noteText)} endEdit={endEdit} />
        ) : (
          <div className="p-2 whitespace-pre-line text-pretty">
            {sanitizedText}
          </div>
        )}
      </div>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.object.isRequired,
};

export default Note;
