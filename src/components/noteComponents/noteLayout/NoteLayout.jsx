import Note from "../note/Note";
import AddButton from "../../buttons/addButton/AddButton";

/**Arrangement of the Notes on screen, changes grid layout by amount of Notes, and client screen size.
 *  @param {Array.<object>} notes - Array of note objects to display.
 */
const NoteLayout = ({ notes }) => {
  return (
    <div className="relative grid grid-cols-notefit justify-center justify-items-center items-center py-4 px-2 gap-10 w-full h-screen overflow-clip">
      {notes ? (
        notes.map((note) => {
          return <Note note={note.data} />;
        })
      ) : (
        <></>
      )}
      <AddButton type="note" />
    </div>
  );
};

NoteLayout.defaultProps = {
  notes: [],
};

export default NoteLayout;
