import Note from "./Note";
import { useState } from "react";

//check if any notes in DB in useEffect
//-> get first note by default, remember which notes have to be displayed

/**Arrangement of the Notes on screen, changes grid
 * layout by amount of Notes, and client screen size.
 */
const NoteLayout = ({ notes }) => {
  const [displayedNotes, setDisplayNotes] = useState(notes);

  return (
    <div className="grid grid-cols-notefit justify-center justify-items-center items-center py-4 px-2 gap-3 w-full">
      {displayedNotes.map((note) => {
        return (
          <Note
            date={note.date}
            text={note.text}
            noteId={note.noteId}
            key={note.noteId}
          />
        );
      })}
    </div>
  );
};

export default NoteLayout;
