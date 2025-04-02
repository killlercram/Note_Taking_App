import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { NoteDetailsPage } from '../../../pages/NoteDetailsPage';

export const Route = createFileRoute("/notes/$noteId/")({
  component: NoteDetailsPage,
  context: () => ({
    title: "Note Details",
  }),
});


  