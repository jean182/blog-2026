"use client";

import { useEffect, useRef } from "react";
import { analytics } from "@/lib/analytics";

export default function ScrollTracker() {
  const tracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    const milestones = [25, 50, 75, 90, 100];

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const milestone of milestones) {
        if (percent >= milestone && !tracked.current.has(milestone)) {
          tracked.current.add(milestone);
          analytics.scrollDepth(milestone);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
