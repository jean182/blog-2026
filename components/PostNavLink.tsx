"use client";

import Link from "next/link";
import {
  AnalyticsEvent,
  useTrackEvent,
  notifyFirstInteraction,
} from "@/lib/analytics";

interface PostNavLinkProps {
  href: string;
  direction: "newer" | "older";
  title: string;
}

export default function PostNavLink({
  href,
  direction,
  title,
}: PostNavLinkProps) {
  const trackEvent = useTrackEvent();

  const handleClick = () => {
    notifyFirstInteraction("click");
    trackEvent(AnalyticsEvent.PostNavigationClicked, {
      direction,
      target_slug: href.replace(/^\//, ""),
      target_title: title,
    });
  };

  const isNewer = direction === "newer";

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`group block ${isNewer ? "order-1 lg:order-2 lg:text-right" : "order-2 lg:order-1"}`}
    >
      <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-(--muted)">
        {isNewer ? "Next post" : "Previous"}
      </p>
      <p
        className={`mt-2 leading-snug transition-colors ${
          isNewer
            ? "text-lg text-(--heading) group-hover:text-(--accent) lg:text-xl"
            : "text-base text-(--muted) group-hover:text-(--heading) lg:text-lg"
        }`}
      >
        {title}
      </p>
    </Link>
  );
}
