import React, { useState } from "react";
import useNoteStore from "../store/noteStore";
import { Plus, TagIcon } from "lucide-react";
import { useParams, useRouter } from "@tanstack/react-router";

export const NoteEditPage = () => {
  const { notes, tags, addNote, updateNote, addTag } = useNoteStore(); //Using this for getting the tags which user will put during creating notes
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

  // setting the selected tags to the Notes
  function handleAddTag(e: React.FormEvent) {
    e.preventDefault();

    if (newTagName) {
      const tagId = addTag(newTagName.trim());
      setNewTagName("");
      setSelectedTagIds((prev) => [...prev, tagId]);
    }
  }

  //Selected means on else off
  function toggleTag(tagId: string) {
    setSelectedTagIds(
      (prev) =>
        prev.includes(tagId)
          ? prev.filter((id) => id !== tagId) //Off
          : [...prev, tagId] //on
    );
  }

  return (
    <section className="flex flex-col gap-8">
      {/* header will be dynamic in the same page for edit or create new notes */}
      <h1 className="text-4xl font-bold">
        {note ? "Edit Note" : "Create New Notes"}
      </h1>

      <form onSubmit={createNote} className="grid gap-8 lg:grid-cols-2">
        {/* Title and content */}
        <div className="space-y-6">
          <div className="flex flex-col gap-y-4">
            <label htmlFor="title" className="text-xl font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
              className="bg-[#322F3D] px-4 py-2 outline-none text-lg rounded-sm focus:bg-[#87556F]"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <label htmlFor="content" className="text-xl font-bold">
              Content
            </label>
            <textarea
              id="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
              className="bg-[#322F3D] px-4 py-2 outline-none text-lg rounded-sm focus:bg-[#87556F]"
            />
          </div>
        </div>

        {/* Tags*/}
        <div className="flex flex-col gap-y-4">
          <label htmlFor="tags" className="text-xl font-bold">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {
              //  From the mother object getting the values of the tags
              Object.values(tags).map((tag, id) => (
                <button
                  key={id}
                  id={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  type="button"
                  className={`bg-[#322F3D] px-4 py-2 flex items-center self-start rounded-sm gap-2 ${
                    selectedTagIds.includes(tag.id)
                      ? "bg-[#87556F] "
                      : "bg-[#322F3D]"
                  }`}
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
            className="bg-[#322F3D] px-4 py-2 outline-none text-lg rounded-sm focus:bg-[#87556F] w-56"
            placeholder="Add new tag"
          />

          {/* Adding button for adding tags */}
          <button
            type="button"
            className="bg-[#322F3D] px-4 py-2  rounded-sm flex items-center gap-2 self-start"
            onClick={handleAddTag}
          >
            <Plus className="size-3" /> Add Tag
          </button>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 *: rounded-sm *:px-4 *:py-2">
          {/*Going back to home page Which is two folder behind when clicked cancled */}
          <button
            type="button"
            onClick={() => router.navigate({ to: "../.." })}
            className="bg-[#322F3D]"
          >
            Cancel
          </button>
          <button type="submit" className="bg-[#87556F]">
            {note ? "Save Changes " : " Create New Note"}
          </button>
        </div>
      </form>
    </section>
  );
};
