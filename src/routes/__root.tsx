//Creating root and route where user goes

import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import React, { useEffect } from "react";
import { Navigation } from "../components/Navigation";

//User will see this
export const Route = createRootRoute({ component: Layout });

function Layout() {
  /*************Setting the Title*********/

  //Getting the array of title from the index and then we will be changing the title
  const { matches } = useRouterState();
  //getting the title from the matches array.
  const activeMatch = matches[matches.length - 1];
  // receiving it from the index context and giving it a fallback value
  const { title = "Note Vault" } = activeMatch.context;

  //Now we will apply this title when ever the title changes on the top
  useEffect(() => {
    document.title = title;
  }, [title]);

  //palceholder for going to any specific route
  //It will change according to our routing page.
  return (
    <>
      {/* This will stick to every page  */}
      <Navigation />

      {/* This will change as the user selects the different part of the navigation */}
      <main className="px-8 py-6">
        <Outlet />
      </main>
    </>
  );
}
