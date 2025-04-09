import { Link } from "@tanstack/react-router";
import { Plus, TagIcon } from "lucide-react";
import React from "react";
import useNoteStore from "../store/noteStore";

export default function NoteVaultPage() {
  const { notes, tags } = useNoteStore();

  // converting Object into array and sorting them on basis of there creation time for showing latest notes
  const allNotes = Object.values(notes).sort(
    (a, b) => b.updatedAt - a.updatedAt
  );

  return (
    <section className="flex flex-col gap-8">
      <div className="flex gap-5 flex-col 410px:flex-row 410px:justify-between 410px:items-center">
        <h1 className="text-4xl font-bold">Vault</h1>
        <Link
          to="/notes/new"
          className="bg-[#87556F] px-2 py-4 rounded-sm flex items-center justify-center 410px: gap-x-2 410px:px-6"
        >
          <Plus className="size-5" />
          New Note
        </Link>
      </div>

      {/* Will be shown with the condition of notes */}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {/* Getting the dynamic value from the store For the notes */}
        {allNotes.map((note) => (
          <div
            key={note.id}
            className="border border-[#322F3D] p-4 md:p-8
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
      {allNotes.length === 0 && (
        <p className="text-center text-lg">
          No notes found. Create one to get started!
        </p>
      )}
    </section>
  );
}
