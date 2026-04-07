"use client";

import { useState } from "react";
import { AnalyticsEvent, useTrackEvent } from "@/lib/analytics";

export default function ArticleFeedback() {
  const [submitted, setSubmitted] = useState<"positive" | "negative" | null>(
    null,
  );
  const trackEvent = useTrackEvent();

  const handleFeedback = (value: "positive" | "negative") => {
    if (submitted) return;

    setSubmitted(value);
    trackEvent(AnalyticsEvent.ArticleFeedback, { value });
  };

  if (submitted) {
    return (
      <p className="mt-10 text-sm text-(--muted)">
        {submitted === "positive"
          ? "Thanks! Glad it helped."
          : "Thanks for the feedback."}
      </p>
    );
  }

  return (
    <p className="mt-10 text-sm text-(--muted)">
      Helpful?{" "}
      <button
        onClick={() => handleFeedback("positive")}
        className="text-(--text) underline underline-offset-2 hover:text-(--accent)"
      >
        Yes
      </button>
      {" / "}
      <button
        onClick={() => handleFeedback("negative")}
        className="text-(--text) underline underline-offset-2 hover:text-(--accent)"
      >
        No
      </button>
    </p>
  );
}
