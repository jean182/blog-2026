"use client";

import { useCallback, useSyncExternalStore } from "react";

type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function getThemeFromDOM(): ResolvedTheme {
  if (typeof document === "undefined") return "dark";
  const root = document.documentElement;
  if (root.classList.contains("light")) return "light";
  if (root.classList.contains("dark")) return "dark";
  return getSystemTheme();
}

function applyTheme(theme: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

// Store for useSyncExternalStore
let listeners: Array<() => void> = [];

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function emitChange() {
  listeners.forEach((l) => l());
}

function getSnapshot(): ResolvedTheme {
  return getThemeFromDOM();
}

function getServerSnapshot(): ResolvedTheme {
  return "dark";
}

export function useTheme() {
  const resolvedTheme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const toggle = useCallback(() => {
    const current = getThemeFromDOM();
    const next: ResolvedTheme = current === "dark" ? "light" : "dark";

    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    emitChange();
  }, []);

  return {
    resolvedTheme,
    toggle,
  };
}
