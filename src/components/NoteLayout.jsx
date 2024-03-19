import useWindowDimensions from "../hooks/getWindowDimensions";
import Note from "./Note";
import { useState, useEffect } from "react";

//check if any notes in DB in useEffect
//-> get first note by default, remember which notes have to be displayed

/**Arrangement of the Notes on screen, changes grid
 * layout by amount of Notes, and client screen size.
 */
const NoteLayout = ({ notes }) => {
  const [displayedNotes, setDisplayNotes] = useState(notes);
  const [gridClassName, setGridClassName] = useState(
    "grid grid-cols-1 grid-rows-1 justify-center items-center py-4 px-2 gap-3 w-full h-screen",
  );
  const { width } = useWindowDimensions();
  const minNoteWidth = 300; //pixels

  useEffect(() => {
    const amountNotes = displayedNotes.length;
    const layoutWidth = (width * 2) / 3;
    const possibleNotesPerRow = Math.floor(layoutWidth / minNoteWidth);

    let gridSize;
    if (amountNotes === 1) {
      gridSize = { cols: 1, rows: 1 };
    } else if (possibleNotesPerRow >= amountNotes) {
      gridSize = { cols: amountNotes, rows: 1 };
    } else {
      const neededRows = Math.ceil(amountNotes / possibleNotesPerRow);
      gridSize = { cols: Math.floor(possibleNotesPerRow), rows: neededRows };
    }

    const gridString =
      "grid grid-cols-" +
      gridSize.cols +
      " grid-rows-" +
      gridSize.rows +
      " justify-center justify-items-center items-center py-4 px-2 gap-3 w-full h-screen";
    setGridClassName(gridString);
  }, [width, displayedNotes]);

  return (
    <div className={gridClassName}>
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
