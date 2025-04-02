import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { NoteEditPage } from '../../../pages/NoteEditPage'

export const Route = createFileRoute('/notes/$noteId/edit')({
  component: NoteEditPage,
  context: () => ({
    title: "Edit the Note",
  }),
});

