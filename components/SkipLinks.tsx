"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type SkipTarget = "main-content" | "category-nav" | "toc";

// Tailwind xl breakpoint
const XL_BREAKPOINT = 1280;

export default function SkipLinks() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isPostPage = pathname !== "/" && pathname !== "/about";
  
  const [isXlScreen, setIsXlScreen] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsXlScreen(window.innerWidth >= XL_BREAKPOINT);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const skipTo = useCallback((targetId: SkipTarget) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    // For nav areas (toc, category-nav), focus first interactive element
    // For main content, focus the container itself
    if (targetId === "main-content") {
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
      }
      target.focus({ preventScroll: false });
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Find first focusable element inside
      const focusable = target.querySelector<HTMLElement>(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable) {
        focusable.focus({ preventScroll: false });
        focusable.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  return (
    <div className="skip-links">
      {/* Always show: skip to main content */}
      <button 
        onClick={() => skipTo("main-content")}
        className="skip-link"
        type="button"
      >
        Skip to content
      </button>

      {/* Homepage: skip to category filter (xl screens only) */}
      {isHomePage && isXlScreen && (
        <button 
          onClick={() => skipTo("category-nav")}
          className="skip-link"
          type="button"
        >
          Skip to categories
        </button>
      )}

      {/* Post pages: skip to table of contents (xl screens only) */}
      {isPostPage && isXlScreen && (
        <button 
          onClick={() => skipTo("toc")}
          className="skip-link"
          type="button"
        >
          Skip to table of contents
        </button>
      )}
    </div>
  );
}
