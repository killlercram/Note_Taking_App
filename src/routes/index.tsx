//Every root must have index page that is the main page.

import { createFileRoute } from "@tanstack/react-router";
import NoteVaultPage from "../pages/NoteVaultPage";

//Home Page,this is where user visits('/') 
export const Route = createFileRoute("/")({

  //User on home page can see this in that root or home page and this return some jsx
  // NoteVaultPage component/Page
  component: NoteVaultPage,

  //Title of the page
  context: () => ({
    title: "Vault"
  })
})