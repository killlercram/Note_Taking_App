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
  notes: Record<string,Note>;
  tags: Record<string, Tag>;

}
