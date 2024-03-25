import { createContext } from "react";

export const NotesContext = createContext(null);
export const NavbarContext = createContext(null);
export const ApiContext = createContext({
  userId: null,
  campaignId: null,
  noteId: null,
  itemId: null,
  characterId: null,
  locationId: null,
});
