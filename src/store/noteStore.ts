import { create } from "zustand";
import { persist } from "zustand/middleware"; //puts data in local storage after getting from the user
import { NoteStore } from "../types";

// Getting  the dynamic values and Storing it in the local storage 
const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({ //This is how we will get the dynamic data 
      notes: {},//this is  object and tag is too
      tags: {},
    }),
    {name: "Notes-Vault"}
  )
);

export default useNoteStore;


