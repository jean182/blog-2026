declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Predefined events for the blog
export const analytics = {
  // Track outbound link clicks
  outboundClick: (url: string) =>
    trackEvent("click", {
      event_category: "outbound",
      event_label: url,
    }),

  // Track code block copy
  codeCopy: (language: string) =>
    trackEvent("copy", {
      event_category: "code",
      event_label: language,
    }),

  // Track scroll depth milestones
  scrollDepth: (percent: number) =>
    trackEvent("scroll", {
      event_category: "engagement",
      event_label: `${percent}%`,
      value: percent,
    }),

  // Track TOC navigation
  tocClick: (heading: string) =>
    trackEvent("click", {
      event_category: "toc",
      event_label: heading,
    }),

  // Track post read completion
  postComplete: (slug: string) =>
    trackEvent("post_complete", {
      event_category: "engagement",
      event_label: slug,
    }),
};
