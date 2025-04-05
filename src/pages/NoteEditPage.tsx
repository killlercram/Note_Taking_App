import React, { useState } from "react";
import useNoteStore from "../store/noteStore";
import { Plus, TagIcon } from "lucide-react";
import { useParams, useRouter } from "@tanstack/react-router";

export const NoteEditPage = () => {
  const { notes, tags, addNote, updateNote } = useNoteStore(); //Using this for getting the tags which user will put during creating notes
  const router = useRouter(); //Handling Routing with this

  //Getting the noteId from the url
  const { noteId } = useParams({ strict: false });
  //If noteid is same stored in store return it else set as null for new one
  const note = noteId ? notes[noteId] : null;

  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [newTagName, setNewTagName] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    note?.tagIds || []
  );

  // It will drop and event of creating a note
  function createNote(e: React.FormEvent) {
    e.preventDefault();

    //checking if user is updating or creating new notes
    if (title.trim() && content.trim()) {
      if (note) {
        updateNote(note.id, { title, content, tagIds: selectedTagIds }); //will add this in store
        //Going to specific notes with the same notes id after saving the notes.
        router.navigate({ to: `/notes/${note.id}` });
      } else {
        const newNoteId = addNote(title, content, selectedTagIds); //will add this in store
        router.navigate({ to: `/notes/${newNoteId}` });
      }
    }
  }

  function handleAddTag(e: React.FormEvent){
    e.preventDefault();
    

  }

  //Selected means on else off
  function toggleTag(tagId: string) {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId) //Off
        : [...prev, tagId]//on
    );
  }

  return (
    <section>
      {/* header will be dynamic in the same page for edit or create new notes */}
      <h1>Edit Note or Create New Notes</h1>

      <form onSubmit={createNote}>
        {/* Title and content */}

        <div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
            />
          </div>
        </div>

        {/* Tags*/}
        <div>
          <label htmlFor="tags">Tags</label>

          <div>
            {
              //  From the mother object getting the values of the tags
              Object.values(tags).map((tag) => (
                <button
                  id={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  type="button"
                >
                  <TagIcon className="size-3" />
                  {tag.name}
                </button>
              ))
            }
          </div>

          {/* Adding input feild for tags */}
          <input
            type="text"
            onChange={(e) => setNewTagName(e.target.value)}
            value={newTagName}
          />

          {/* Adding button for adding tags */}
          <button type="button" onClick={handleAddTag}>
            <Plus className="size-2" /> Add Tag
          </button>
        </div>

        {/* Buttons */}
        <div>
          {/*Going back to home page Which is two folder behind when clicked cancled */}
          <button
            type="button"
            onClick={() => router.navigate({ to: "../.." })}
          >
            Cancel
          </button>
          <button type="submit">Save Changes or Create New Note</button>
        </div>
      </form>
    </section>
  );
};
