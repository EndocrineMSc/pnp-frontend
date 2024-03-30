import Note from "./Note";
import AddButton from "./basic-ui/AddButton";

/**Arrangement of the Notes on screen, changes grid
 * layout by amount of Notes, and client screen size.
 */
const NoteLayout = ({ notes }) => {
  return (
    <div className="relative grid grid-cols-notefit justify-center justify-items-center items-center py-4 px-2 gap-3 w-full h-screen">
      {notes ? (
        notes.map((note) => {
          return <Note key={note._id} note={note} />;
        })
      ) : (
        <></>
      )}
      <AddButton type="note" />
    </div>
  );
};

export default NoteLayout;
