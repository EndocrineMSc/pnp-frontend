import { useState, useEffect } from "react";
import { Hourglass } from "react-loader-spinner";
import CollapsedNoteScrollbar from "../../components/noteComponents/collapsedNoteScrollBar/CollapsedNoteScrollBar";
import NoteLayout from "../../components/noteComponents/noteLayout/NoteLayout";
import NoteScrollbar from "../../components/noteComponents/noteScrollbar/NoteScrollbar";
import { NotesContext } from "../../utility/contexts";
import { apiRequest } from "../../utility/apiRequests/apiRequest";
import useCampaignId from "../../utility/hooks/useCampaignId";
import useWindowDimensions from "../../utility/hooks/useWindowDimensions";

/**Overview page for notes, includes a scrollbar for all notes. */
const Notes = () => {
  const [showScrollbar, setShowNavBar] = useState(true);
  const [detailNoteIds, setDetailNoteIds] = useState([]);
  const [shortNotes, setShortNotes] = useState([]);
  const [fullNotes, setFullNotes] = useState([]);
  const [limitedFullNotes, setLimitedFullNotes] = useState([]);
  const [amountAllowedDetailNotes, setAmountAllowedDetailNotes] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const campaignId = useCampaignId()[0];
  const windowSize = useWindowDimensions();

  const toggleScrollbar = () => {
    setShowNavBar((prev) => !prev);
  };

  const providerValue = {
    isExpanded: showScrollbar,
    toggleScrollbar,
    detailNoteIds,
    setDetailNoteIds,
    amountAllowedDetailNotes,
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

  useEffect(() => {
    const adjustedWidth = windowSize.width - 120; //120px for navbar + scrollbar
    const allowedNotesX =
      adjustedWidth <= 640 ? 1 : Math.floor(adjustedWidth / 640); //640px is width of a note
    const allowedNotesY =
      windowSize.height <= 640 ? 1 : Math.floor(windowSize.height / 640);
    const allowedAmountNotes = allowedNotesX * allowedNotesY;
    setAmountAllowedDetailNotes(allowedAmountNotes);

    const truncNotes =
      fullNotes.length > allowedAmountNotes
        ? fullNotes.slice(0, allowedAmountNotes)
        : fullNotes;
    setLimitedFullNotes(truncNotes);
  }, [windowSize, fullNotes]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      {isLoading ? (
        <Spinner />
      ) : (
        <NotesContext.Provider value={providerValue}>
          <NoteLayout notes={limitedFullNotes} />
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
