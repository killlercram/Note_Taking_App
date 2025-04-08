// This is the store like Redux
import { create } from "zustand";
import { persist } from "zustand/middleware"; //puts data in local storage after getting from the user
import { NoteStore } from "../types";

// Getting  the dynamic values and Storing it in the local storage
//It is basically a middleware like stuff
const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      //This is how we will get the dynamic data
      notes: {}, //this is  object and tag is too
      tags: {},

      // Creating a Function which will be adding the New Notes with the existing ones in the Local storage and can bring the user from there.
      addNote: (title, content, tagIds) => {
        const id = crypto.randomUUID();
        const timeStamp = Date.now();
        set((state) => ({
          notes: {
            ...state.notes,
            [id]: {
              id,
              title,
              content,
              tagIds,
              createAt: timeStamp,
              updatedAt: timeStamp,
            },
          },
        }));
        return id; //Returning id as it holds the above information in the particular id.
      },

      // Updating the existing Notes with few updates and changes
      updateNote: (noteId, updates) => {
        set((state) => ({
          //this changes the store
          notes: {
            ...state.notes,
            // updating the specific things on previous notes
            [noteId]: {
              ...state.notes[noteId],
              ...updates,
              updatedAt: Date.now(),
            },
          },
        }));
      },

      //deleting some user specific notes
      deleteNote: (noteId) => {
        set((state) => {
          // forget the notes with particular noteid and return the remmaining notes, _ means forget the note
          const { [noteId]: _, ...remmainingNotes } = state.notes;
          return {
            notes: remmainingNotes,
          };
        });
      },

      //Adding the tags to the specific notes
      addTag: (name) => {
        const id = crypto.randomUUID(); //Generates Random Id's

        set((state) => ({
          tags: {
            ...state.tags,
            [id]: { id, name },
          },
        }));
        return id;
      },
    }),
    { name: "Notes-Vault" }
  )
);

export default useNoteStore;
