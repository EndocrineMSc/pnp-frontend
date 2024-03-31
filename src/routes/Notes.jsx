import CollapsedNoteScrollbar from "../components/CollapsedNoteScrollBar";
import NoteLayout from "../components/NoteLayout";
import NoteScrollbar from "../components/NoteScrollbar";
import { useState, useEffect, useContext } from "react";
import { ApiContext, NotesContext } from "../Contexts";
import { getRequest } from "../hooks/getRequest";

const Notes = () => {
  const [showScrollbar, setShowNavBar] = useState(true);
  const [detailNoteIds, setDetailNoteIds] = useState([]);
  const [shortNotes, setShortNotes] = useState(null);
  const [fullNotes, setFullNotes] = useState(null);
  const apiContext = useContext(ApiContext);

  const toggleScrollbar = () => {
    setShowNavBar((prev) => !prev);
  };

  const providerValue = {
    isExpanded: showScrollbar,
    toggleScrollbar,
    detailNoteIds,
    setDetailNoteIds,
  };

  useEffect(() => {
    const getShortNotes = async () => {
      const notes = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/${apiContext.campaignId}/notes`,
      );
      setShortNotes(notes);

      if (!detailNoteIds && notes[0]) setDetailNoteIds(notes[0]._id);
    };
    getShortNotes();
  }, [detailNoteIds, apiContext.campaignId]);

  useEffect(() => {
    const getFullNotes = async () => {
      if (detailNoteIds) {
        const notes = await Promise.all(
          detailNoteIds.map(async (id) => {
            return getRequest(`https://pnp-backend.fly.dev/api/v1/note/${id}`);
          }),
        );
        setFullNotes(notes);
      }
    };
    getFullNotes();
  }, [detailNoteIds]);

  return (
    <div className="flex items-center w-full h-screen">
      <NotesContext.Provider value={providerValue}>
        <NoteLayout notes={fullNotes} />
        {showScrollbar ? (
          <NoteScrollbar notes={shortNotes} />
        ) : (
          <CollapsedNoteScrollbar />
        )}
      </NotesContext.Provider>
    </div>
  );
};

export default Notes;
