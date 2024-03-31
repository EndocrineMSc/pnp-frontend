import Editor from "./NoteEditor";
import { useState, useEffect } from "react";
import { formatDate } from "../hooks/formatDate";
import { postRequest } from "../hooks/postRequest";
import { unescape } from "html-escaper";
import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";

const Note = ({ note }) => {
  const [editMode, setEditMode] = useState(false);
  const [noteText, setNoteText] = useState(note.text);
  const [sanitizedText, setSanitizedText] = useState("");

  const clickToEdit = () => {
    if (!editMode) setEditMode(true);
  };

  const endEdit = (newText) => {
    const updatedNote = { ...note, text: newText };
    console.log("New note text: " + updatedNote.text);
    postRequest(
      `https://pnp-backend.fly.dev/api/v1/note/${note._id}/update`,
      updatedNote,
    );
    if (editMode) setEditMode(false);
    setNoteText(newText);
  };

  useEffect(() => {
    if (noteText) {
      const dangerousText = unescape(noteText);
      console.log("dangerous: " + dangerousText);
      const safeText = sanitizeHtml(dangerousText);
      console.log("safe: " + safeText);
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

  return (
    <div
      className="relative flex flex-col shadow-md bg-wgray-100 overflow-y-auto w-full max-w-screen-sm aspect-square rounded"
      onDoubleClick={clickToEdit}
    >
      <div className="h-full">
        <h3 className="text-center p-1 text-xl bg-gradient-to-b from-wgray-300 to-wgray-400">
          {formatDate(note.date)}
        </h3>
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

export default Note;
