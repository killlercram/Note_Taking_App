import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { NotesListPage } from '../../pages/NotesListPage';

export const Route = createFileRoute("/notes/")({
  component: NotesListPage,
  context: () => ({
    title: "Note List"
  })
})


