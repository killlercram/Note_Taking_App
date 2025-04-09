import { Link } from "@tanstack/react-router";
import { Plus, TagIcon } from "lucide-react";
Link;
import React, { useState } from "react";
import useNoteStore from "../store/noteStore";

export const NotesListPage = () => {
  const { notes, tags } = useNoteStore();
  const [selectedtagId, setSelectedtagId] = useState<string | null>(null);

  // Filtering all the notes from the notes array based on the tags selected
  /*  !selectedtagId === all tags are selected because no tagid is present or selected */
  const filteredNotes = Object.values(notes)
    .filter((note) => !selectedtagId || note.tagIds.includes(selectedtagId))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <section className="flex flex-col gap-8">
      {/* Header part */}
      <div className="flex flex-col gap-4 410px:flex-row 410px:justify-between 410px:items-center">
        <h1 className="text-4xl font-bold">All Notes</h1>
        <Link
          to="/notes/new"
          className="bg-[#87556F] px-2 py-4 rounded-sm flex items-center justify-center 410px: gap-x-2 410px:px-6"
        >
          <Plus className="size-5" />
          New Note
        </Link>
      </div>

      {/* For holding all the used tags */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => setSelectedtagId(null)}
          className={`px-4 py-2 rounded-sm text-lg ${
            selectedtagId === null ? "bg-[#87556F]" : "bg-[#322F3D]"
          }`}
        >
          All
        </button>

        {/* Getting all the used tags using the map */}
        {Object.values(tags).map((tag) => (
          <button
            key={tag.id}
            onClick={() => setSelectedtagId(tag.id)}
            className={`px-4 py-2 rounded-sm text-lg flex  items-center gap-x-2 ${
              selectedtagId === tag.id ? "bg-[#87556F]" : "bg-[#322F3D]"
            }`}
          >
            <TagIcon className="size-3" />
            {tag.name}{" "}
          </button>
        ))}
      </div>

      {/* getting all the notes Based on the tags selected */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className=" border border-[#322F3D] p-4 md:p-8
                hover:bg-[#322F3D] transition-colors rounded-sm group
                "
          >
            <Link
              to={`/notes/${note.id}`}
              className="flex gap-4 flex-col justify-between h-full"
            >
              <h2 className="font-bold text-xl">{note.title}</h2>

              <p className="text-lg line-clamp-3">{note.content}</p>

              {/* Setting the tags dynamically */}
              <div className="flex gap-2 flex-wrap">
                {note.tagIds.map((tagId) => (
                  <div
                    key={tagId}
                    className="self-start flex items-center gap-x-1 px-2 py-1 rounded-sm bg-[#87556F] group-hover:bg-[#4B5D67] transition-colors"
                  >
                    <TagIcon className="size-3" />
                    <span>{tags[tagId].name}</span>
                  </div>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Showing this is the notes is not available */}
      {filteredNotes.length === 0 && (
        <p className="text-center text-lg">
          No notes found. Create one to get started!
        </p>
      )}
    </section>
  );
};
