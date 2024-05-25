import { apiRequest } from "../apiRequests/apiRequest";

const addNote = (campaignId, notesContext) => {
  const noteBody = { date: new Date() };
  const createNewNote = async () => {
    const newNote = await apiRequest(
      "POST",
      `https://pnp-backend.fly.dev/api/v1/${campaignId}/note/create`,
      noteBody,
    );
    notesContext.setDetailNoteIds([...notesContext.detailNoteIds, newNote._id]);
  };
  createNewNote();
};

export default addNote;
