import CollapsedNoteScrollbar from "../components/CollapsedNoteScrollBar";
import NoteLayout from "../components/NoteLayout";
import NoteScrollbar from "../components/NoteScrollbar";
import { useState, useEffect } from "react";
import { NotesContext } from "../Contexts";
import { apiRequest } from "../apiRequests/apiRequest";
import useCampaignId from "../hooks/useCampaignId";
import { Hourglass } from "react-loader-spinner";

/**Overview page for notes, includes a scrollbar for all notes. */
const Notes = () => {
  const [showScrollbar, setShowNavBar] = useState(true);
  const [detailNoteIds, setDetailNoteIds] = useState([]);
  const [shortNotes, setShortNotes] = useState(null);
  const [fullNotes, setFullNotes] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const campaignId = useCampaignId()[0];

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
        setLoading(true);
        const notes = await apiRequest(
          "GET",
          `https://pnp-backend.fly.dev/api/v1/${campaignId}/notes`,
        );
        setShortNotes(notes.data);

        if (!detailNoteIds && notes[0]) setDetailNoteIds(notes[0]._id);
        setLoading(false);
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
    <div className="flex justify-center items-center w-full h-screen">
      {isLoading ? (
        <Spinner />
      ) : (
        <NotesContext.Provider value={providerValue}>
          <NoteLayout notes={fullNotes} />
          {showScrollbar ? (
            <NoteScrollbar notes={shortNotes} />
          ) : (
            <CollapsedNoteScrollbar />
          )}
        </NotesContext.Provider>
      )}
    </div>
  );
};

const Spinner = () => {
  return (
    <div>
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
    </div>
  );
};

export default Notes;
