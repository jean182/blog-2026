"use client";

import { useEffect, useState } from "react";
import { analytics } from "@/lib/analytics";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    function updateActiveId() {
      const headingElements = headings
        .map((heading) => document.getElementById(heading.id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (headingElements.length === 0) return;

      const offset = 140;
      const scrollPosition = window.scrollY + offset;
      const isNearPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;

      if (isNearPageBottom) {
        setActiveId(headingElements[headingElements.length - 1].id);
        return;
      }

      let currentId = headingElements[0].id;

      for (const el of headingElements) {
        if (el.offsetTop <= scrollPosition) {
          currentId = el.id;
        } else {
          break;
        }
      }

      setActiveId(currentId);
    }

    updateActiveId();
    window.addEventListener("scroll", updateActiveId, { passive: true });
    window.addEventListener("resize", updateActiveId);

    return () => {
      window.removeEventListener("scroll", updateActiveId);
      window.removeEventListener("resize", updateActiveId);
    };
  }, [headings]);

  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-(--muted)">
        On this page
      </p>
      <ul className="space-y-2 border-l border-(--accent)/25 pl-4">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={() => {
                setActiveId(heading.id);
                analytics.tocClick(heading.text);
              }}
              className={[
                "block font-sans text-sm leading-snug transition-colors duration-150",
                heading.level === 3 ? "ml-3" : "",
                activeId === heading.id
                  ? "text-(--accent)"
                  : "text-(--muted) hover:text-(--heading)",
              ].join(" ")}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
