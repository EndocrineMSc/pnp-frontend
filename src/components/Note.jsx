import Editor from "./NoteEditor";
import { useState } from "react";

const Note = ({ noteId, date, text }) => {
  const [editMode, setEditMode] = useState(false);
  const [displayedText, setDisplayedText] = useState(text);

  const clickToEdit = () => {
    if (!editMode) setEditMode(true);
  };

  const endEdit = (newText) => {
    if (editMode) setEditMode(false);

    if (newText !== displayedText) {
      setDisplayedText(newText);
    }
  };

  return (
    <div
      className="shadow-md bg-wgray-100 overflow-y-auto max-w-[600px] min-h-[500px] max-h-[600px]"
      onDoubleClick={clickToEdit}
    >
      <h3 className="text-center p-1 text-xl bg-gradient-to-b from-wgray-300 to-wgray-400">
        {date}
      </h3>
      {editMode ? (
        <Editor text={displayedText} endEdit={endEdit} />
      ) : (
        <div
          className="p-2 whitespace-pre-line text-pretty"
          dangerouslySetInnerHTML={{ __html: displayedText }}
        />
      )}
    </div>
  );
};

export default Note;
