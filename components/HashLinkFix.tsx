"use client";

import { useEffect } from "react";

export default function HashLinkFix() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      history.replaceState(null, "", href);
    }

    function handlePopState() {
      const hash = window.location.hash;
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: "smooth" });
          });
        }
      }
    }

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}
