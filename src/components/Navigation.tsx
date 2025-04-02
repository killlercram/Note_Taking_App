import { Link } from "@tanstack/react-router";
import { BookText, FileText, Tag } from "lucide-react";
import React from "react";

export const Navigation = () => {
  return (
    <header className="bg-[#322F3D] px-8 py-6 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-[min-content_1fr] sm:justify-items-start sm:items-center sm:gap-x-12">
      {/* Given by tanStack we can use it for navigation */}
      <Link to="/" className="text-2xl">
        {" "}
        NoteVault
      </Link>

      <nav className="md:justify-self-end">
        <ul className="flex gap-6 flex-wrap items-center justify-between sm:flex-nowrap">
          <li>
            <Link
              to="/"
              className="text-xl sm:px-4 sm:py-2 rounded-sm flex items-center gap-x-2"
              // Style when particular button clicked
              activeProps={() => ({
                className: "text-white bg-[#4B5D67] px-4 py-2",
              })}
              // Style when no button clicked
              inactiveProps={() => ({
                className: "text-gray-400 ",
              })}
            >
              <BookText className="size-5" />
              Vault
            </Link>
          </li>
          <li>
            <Link
              to="/notes"
              className="text-xl sm:px-4 sm:py-2 rounded-sm flex items-center gap-x-2"
              activeProps={() => ({
                className: "text-white bg-[#4B5D67] px-4 py-2",
              })}
              inactiveProps={() => ({
                className: "text-gray-400 ",
              })}
            >
              <FileText className="size-5" />
              Notes
            </Link>
          </li>
          <li>
            <Link
              to="/tags"
              className="text-xl sm:px-4 sm:py-2 rounded-sm flex items-center gap-x-2"
              activeProps={() => ({
                className: "text-white bg-[#4B5D67] px-4 py-2",
              })}
              inactiveProps={() => ({
                className: "text-gray-400 ",
              })}
            >
              <Tag className="size-5" />
              Tags
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
