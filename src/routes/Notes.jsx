import CollapsedNoteScrollbar from "../components/CollapsedNoteScrollBar";
import NoteLayout from "../components/NoteLayout";
import NoteScrollbar from "../components/NoteScrollbar";
import { useState, useEffect } from "react";
import { NotesContext } from "../Contexts";
import { apiRequest } from "../apiRequests/apiRequest";
import useCampaignId from "../hooks/useCampaignId";

/**Overview page for notes, includes a scrollbar for all notes. */
const Notes = () => {
  const [showScrollbar, setShowNavBar] = useState(true);
  const [detailNoteIds, setDetailNoteIds] = useState([]);
  const [shortNotes, setShortNotes] = useState(null);
  const [fullNotes, setFullNotes] = useState(null);
  const campaignId = useCampaignId();

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
      if (campaignId !== "") {
        const notes = await apiRequest(
          "GET",
          `https://pnp-backend.fly.dev/api/v1/${campaignId}/notes`,
        );
        setShortNotes(notes);

        if (!detailNoteIds && notes[0]) setDetailNoteIds(notes[0]._id);
      }
    };
    getShortNotes();
  }, [detailNoteIds, campaignId]);

  useEffect(() => {
    const getFullNotes = async () => {
      if (detailNoteIds) {
        const notes = await Promise.all(
          detailNoteIds.map(async (id) => {
            return apiRequest(
              "GET",
              `https://pnp-backend.fly.dev/api/v1/note/${id}`,
            );
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
