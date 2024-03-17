import CollapsedNote from "./CollapsedNote";

const NoteScrollBar = ({ notes }) => {
  return (
    <nav className="flex flex-col justify-start items-center gap-3 pt-4 bg-wgray-200 h-screen list-none pl-2 pr-2 w-96">
      {notes.map((note) => {
        return (
          <CollapsedNote
            key={note.noteId}
            date={note.date}
            onClick={() => console.log("Click: " + note.noteId)}
          />
        );
      })}
    </nav>
  );
};

export default NoteScrollBar;
