"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

export default function OutboundTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (!anchor) return;
      
      const href = anchor.getAttribute("href");
      if (!href) return;
      
      // Check if it's an external link
      if (href.startsWith("http") && !href.includes("loserkid.io")) {
        analytics.outboundClick(href);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
