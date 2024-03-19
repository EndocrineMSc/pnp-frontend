import Note from "./Note";
import { useState, useEffect } from "react";

//check if any notes in DB in useEffect
//-> get first note by default, remember which notes have to be displayed

const NoteLayout = ({ notes }) => {
  const [displayedNotes, setDisplayNotes] = useState(notes);

  return (
    <div
      className="grid grid-cols-5 grid-rows-1 
                    portrait:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:grid-rows-6
                    py-4 px-2 gap-3 w-full h-screen"
    >
      {displayedNotes.map((note) => {
        return <Note date={note.date} text={note.text} noteId={note.noteId} />;
      })}
    </div>
  );
};

export default NoteLayout;
