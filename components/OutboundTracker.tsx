"use client";

import { useEffect } from "react";
import {
  AnalyticsEvent,
  useTrackEvent,
  notifyFirstInteraction,
} from "@/lib/analytics";

export default function OutboundTracker() {
  const trackEvent = useTrackEvent();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Check if it's an external link
      if (href.startsWith("http") && !href.includes("loserkid.io")) {
        notifyFirstInteraction("click");
        trackEvent(AnalyticsEvent.OutboundLinkClicked, {
          url: href,
          link_text: anchor.textContent?.trim() || undefined,
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [trackEvent]);

  return null;
}
