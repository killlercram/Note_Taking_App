import { useParams, Link, useRouter } from "@tanstack/react-router";
import React from "react";
import useNoteStore from "../store/noteStore";
import { Edit, TagIcon, Trash2 } from "lucide-react";

export const NoteDetailsPage = () => {
  const { noteId } = useParams({ strict: false });//For the specific id
  const { notes, tags, deleteNote } = useNoteStore();
  const note = noteId ? notes[noteId] : null;
  //for redirecting to specific path
  const router = useRouter();


// Deleting Notes Functions, after deleting we will be redirected to the Notes page
function handleDelete () {
  if(window.confirm("Are you sure you want to delete this note?")) {
    deleteNote(note!.id);
    router.navigate({to: "/notes"});//path to be navigated
  }
}

  return (
    <section className="flex flex-col gap-8">
     {/* Heading Section */}
      <div className="grid grid-cols-[max-content] gap-4 sm:grid-cols-[1fr_min-content_min-content] ">
        <h1 className="text-4xl font-bold">{note?.title}</h1>
        <Link to={`/notes/${note?.id}/edit`} className="flex items-center justify-center gap-x-2 p-4 bg-[#322F3D] rounded-sm">
          <Edit className="size-5" /> Edit
        </Link>

        <button
        onClick={handleDelete}
         className="flex items-center justify-center gap-x-2 p-4 bg-[#87556F] rounded-sm">
          <Trash2 className="size-5" />
          Delete
        </button>
      </div>

      {/* Tags */}
      {note?.tagIds.map((tagId) => (
        <div key={tagId}
        className="flex self-start items-center gap-x-2 px-4 py-2 rounded-sm bg-[#322F3D]
        ">
          <TagIcon className="size-5" />
          <span>{tags[tagId].name}</span>
        </div>
      ))}

      {/* including the content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.5fr] lg:items-center">
        <p>{note?.content}</p>

        <div className="space-y-2 bg-[#322F3D] p-4 justify-self-start lg:justify-self-auto md:text-center">
          <p>
            Created At:{" "}
            {new Date(note!?.createAt).toLocaleString("en-US", {
              hour12: true,
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: '2-digit',
            })}
          </p>
          <p>
            Updated At:{" "}
            {new Date(note!?.updatedAt).toLocaleString("en-US", {
              hour12: true,
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: '2-digit',
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
