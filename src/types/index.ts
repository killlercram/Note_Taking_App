// This is contain the type safety features.
// Means what kind of data type a note will have

interface Note {
  id: string;
  title: string;
  content: string;
  tagIds: string[];
  createAt: number;
  updatedAt: number;
}

interface Tag {
  id: string;
  name: string;
}

export interface NoteStore {
  // these are objects with datatypes and values 
  notes: Record<string,Note>;
  tags: Record<string, Tag>;
  addNote: (title: string, content: string, tagIds: string[]) => string; //mentioned the type and what type it will return, it returns string
  updateNote: (noteId: string, updates: Partial<Omit<Note, "id">>) => void; //We are updating all the things which wants except the Note id.
  addTag: (name: string) => string;
  deleteNote: (noteId: string) => void;
  updateTag: (tagId: string, name: string) => void;
  deleteTag: (tagId: string) => void;

}
