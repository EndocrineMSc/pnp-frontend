import CollapsedNoteScrollbar from "../components/CollapsedNoteScrollBar";
import NoteLayout from "../components/NoteLayout";
import NoteScrollbar from "../components/NoteScrollbar";
import { useState } from "react";
import { NotesContext } from "../Contexts";

const testNotes = [
  { date: "12.05.2024", noteId: 1 },
  { date: "12.05.2024", noteId: 2 },
  { date: "12.05.2024", noteId: 3 },
  { date: "12.05.2024", noteId: 4 },
  { date: "12.05.2024", noteId: 5 },
  { date: "12.05.2024", noteId: 6 },
];

const testNotesFull = [
  {
    date: "12.05.2024",
    noteId: 1,
    text: "You find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.\n\nYou find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.",
  },
  {
    date: "12.05.2024",
    noteId: 2,
    text: "You find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.\n\nYou find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.",
  },
  {
    date: "12.05.2024",
    noteId: 3,
    text: "You find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.\n\nYou find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.",
  },
  {
    date: "12.05.2024",
    noteId: 4,
    text: "You find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.\n\nYou find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.",
  },
  {
    date: "12.05.2024",
    noteId: 5,
    text: "You find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.\n\nYou find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.",
  },
  {
    date: "12.05.2024",
    noteId: 6,
    text: "You find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.\n\nYou find a recently written skill book entitled Celebrated Arguments on Deciphering Scripts. This book is meant to teach a person a specific skill. This could be used as a permanent or temporary stat increase if read and studied. This book is torn/stained pretty badly. Some of the pages are missing. It is written in Common Speech. It is unfinished, ends abruptly after a few chapters. This book is worth 40 gps and has 478 pages.",
  },
];

const Notes = () => {
  const [showScrollbar, setShowNavBar] = useState(true);

  const toggleScrollbar = () => {
    setShowNavBar((prev) => !prev);
  };

  const providerValue = { isExpanded: showScrollbar, toggleScrollbar };

  return (
    <div className="flex items-center w-full h-screen">
      <NoteLayout notes={testNotesFull} />
      <NotesContext.Provider value={providerValue}>
        {showScrollbar ? (
          <NoteScrollbar notes={testNotes} />
        ) : (
          <CollapsedNoteScrollbar />
        )}
      </NotesContext.Provider>
    </div>
  );
};

export default Notes;
