"use client";

import { useSyncExternalStore } from "react";

/*
  The URL hash as external state.

  Used for the Resource Centre tabs and the events/gallery category filters, so
  a chosen tab or filter can be linked to directly (/gallery/#heritage). The
  hash is read rather than mirrored into React state, and written with
  `replaceState` so it never pushes history entries or jumps the scroll.

  `replaceState` does not fire `hashchange`, so writers notify subscribers
  themselves. On the server the hash is unknown and reads as "", which is what
  makes the "show everything" default render identically on both sides.
*/

let listeners: (() => void)[] = [];

function subscribe(onChange: () => void) {
  listeners.push(onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

const getSnapshot = () => window.location.hash.slice(1);
const getServerSnapshot = () => "";

export function useHash(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setHash(value: string) {
  // Clearing needs the full path: replaceState("#") would leave a bare "#",
  // and replaceState("") would not drop the existing fragment at all.
  const url = value
    ? `#${value}`
    : `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, "", url);
  listeners.forEach((notify) => notify());
}
