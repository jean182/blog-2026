"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  AnalyticsEvent,
  useTrackEvent,
  useArticleContext,
} from "@/lib/analytics";

// Minimum percentage of reading time required to count as "completed"
const COMPLETION_TIME_THRESHOLD = 0.3; // 30% of estimated reading time

export default function PostCompletionTracker() {
  const pathname = usePathname();
  const hasCompleted = useRef(false);
  const pageLoadTime = useRef(0);
  const trackEvent = useTrackEvent();
  const articleContext = useArticleContext();

  // Initialize page load time on mount
  useEffect(() => {
    pageLoadTime.current = Date.now();
  }, []);

  // Reset tracking state on navigation
  useEffect(() => {
    hasCompleted.current = false;
    pageLoadTime.current = Date.now();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (hasCompleted.current) return;

      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      // Track post completion at 100% if user spent enough time
      if (percent >= 100) {
        const elapsedMs = Date.now() - pageLoadTime.current;
        const readingTimeMs = (articleContext?.reading_time_minutes ?? 0) * 60 * 1000;
        const minTimeMs = readingTimeMs * COMPLETION_TIME_THRESHOLD;

        // Only count as completed if user spent at least 30% of reading time
        if (readingTimeMs > 0 && elapsedMs >= minTimeMs) {
          hasCompleted.current = true;
          trackEvent(AnalyticsEvent.PostCompleted);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackEvent, articleContext]);

  return null;
}
