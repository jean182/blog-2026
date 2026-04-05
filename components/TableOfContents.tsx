"use client";

import { useEffect, useState } from "react";

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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -75% 0px", threshold: 0 },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold uppercase tracking-widest text-(--muted) mb-4">
        On this page
      </p>
      <ul className="space-y-2 border-l border-(--accent)/25 pl-4">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={[
                "block text-[13px] leading-snug transition-colors duration-150",
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
