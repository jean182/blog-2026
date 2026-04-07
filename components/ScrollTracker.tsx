"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  AnalyticsEvent,
  useTrackEvent,
  notifyFirstInteraction,
  type ScrollDepth,
} from "@/lib/analytics";

export default function ScrollTracker() {
  const pathname = usePathname();
  const tracked = useRef<Set<number>>(new Set());
  const hasScrolled = useRef(false);
  const trackEvent = useTrackEvent();

  // Reset tracking state on navigation
  useEffect(() => {
    tracked.current = new Set();
    hasScrolled.current = false;
  }, [pathname]);

  useEffect(() => {
    const milestones: ScrollDepth[] = [25, 50, 75, 90, 100];

    const handleScroll = () => {
      // Track first interaction
      if (!hasScrolled.current) {
        hasScrolled.current = true;
        notifyFirstInteraction("scroll");
      }

      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const milestone of milestones) {
        if (percent >= milestone && !tracked.current.has(milestone)) {
          tracked.current.add(milestone);
          trackEvent(AnalyticsEvent.ScrollDepthReached, {
            depth_percent: milestone,
          });

          // Track post completion at 100%
          if (milestone === 100) {
            trackEvent(AnalyticsEvent.PostCompleted);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackEvent]);

  return null;
}
