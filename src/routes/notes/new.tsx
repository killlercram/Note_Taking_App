import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { NoteEditPage } from '../../pages/NoteEditPage';

export const Route = createFileRoute("/notes/new")({
  component: NoteEditPage,
  context: () => ({
    title: "Create a New Note"
  })
})

