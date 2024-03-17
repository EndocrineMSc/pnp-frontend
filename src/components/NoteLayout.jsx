import Note from "./Note";
import { useState } from "react";

//check if any notes in DB in useEffect
//-> get first note by default, remember which notes have to be displayed

const NoteLayout = ({ notes }) => {
  return (
    <div className="flex flex-wrap pt-4 justify-center items-start gap-3 w-full overflow-clip">
      {notes.map((note) => {
        return <Note date={note.date} text={note.text} noteId={note.noteId} />;
      })}
    </div>
  );
};

export default NoteLayout;
