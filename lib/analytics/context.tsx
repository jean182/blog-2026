"use client";

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  AnalyticsEvent,
  type ArticleContext,
  type EventPayloadMap,
  type EmptyPayload,
  type EmptyPayloadEvents,
  type PayloadEvents,
  type TimingMetadata,
  type InteractionType,
} from "./types";

// Extend Window for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Context for article information
const ArticleContextValue = createContext<ArticleContext | null>(null);

interface ArticleProviderProps {
  children: ReactNode;
  slug: string;
  title: string;
}

export function ArticleProvider({
  children,
  slug,
  title,
}: ArticleProviderProps) {
  const value: ArticleContext = {
    article_slug: slug,
    article_title: title,
  };

  return (
    <ArticleContextValue.Provider value={value}>
      {children}
    </ArticleContextValue.Provider>
  );
}

// Hook to get article context
export function useArticleContext(): ArticleContext | null {
  return useContext(ArticleContextValue);
}

// Debug mode - logs events to console in development
const DEBUG = process.env.NODE_ENV === "development";

// Page load time for timing metadata
let pageLoadTime = 0;
if (typeof window !== "undefined") {
  pageLoadTime = Date.now();
}

// Get time since page load
export function getTimeSincePageLoad(): number {
  return Date.now() - pageLoadTime;
}

// Core tracking function
function sendToGA(eventName: string, params: Record<string, unknown>) {
  if (DEBUG) {
    console.log(
      `%c[Analytics] ${eventName}`,
      "color: #00ff00; font-weight: bold",
      params,
    );
  }

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Type-safe tracking function with overloads
// Overload 1: Events with no payload
export function trackEvent(
  event: EmptyPayloadEvents,
  payload?: EmptyPayload & TimingMetadata,
  articleContext?: ArticleContext | null,
): void;

// Overload 2: Events with payload
export function trackEvent<E extends PayloadEvents>(
  event: E,
  payload: EventPayloadMap[E] & TimingMetadata,
  articleContext?: ArticleContext | null,
): void;

// Implementation
export function trackEvent<E extends AnalyticsEvent>(
  event: E,
  payload?: (EventPayloadMap[E] & TimingMetadata) | EmptyPayload,
  articleContext?: ArticleContext | null,
): void {
  const params: Record<string, unknown> = { ...(payload || {}) };

  if (articleContext) {
    params.article_slug = articleContext.article_slug;
    params.article_title = articleContext.article_title;
  }

  sendToGA(event, params);
}

// Hook for tracking with automatic article context
export function useTrackEvent() {
  const articleContext = useArticleContext();

  // Return a track function with the same overloads
  return useCallback(
    <E extends AnalyticsEvent>(
      event: E,
      ...args: E extends EmptyPayloadEvents
        ? [payload?: TimingMetadata]
        : [payload: EventPayloadMap[E] & TimingMetadata]
    ) => {
      const payload = args[0] as EventPayloadMap[E] | undefined;
      trackEvent(
        event as PayloadEvents,
        payload as EventPayloadMap[PayloadEvents],
        articleContext,
      );
    },
    [articleContext],
  );
}

// First interaction tracker component - use in layout for global tracking
export function FirstInteractionTracker({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const articleContext = useContext(ArticleContextValue);
  const hasTrackedRef = useRef(false);
  const loadTimeRef = useRef<number>(0);

  // Reset tracking state on navigation
  useEffect(() => {
    hasTrackedRef.current = false;
    loadTimeRef.current = Date.now();
  }, [pathname]);

  const trackFirstInteraction = useCallback(
    (type: InteractionType) => {
      if (hasTrackedRef.current) return;
      hasTrackedRef.current = true;

      const timeMs = Date.now() - loadTimeRef.current;

      trackEvent(
        AnalyticsEvent.FirstInteraction,
        { interaction_type: type },
        articleContext,
      );

      trackEvent(
        AnalyticsEvent.TimeToFirstInteraction,
        { time_ms: timeMs, interaction_type: type },
        articleContext,
      );
    },
    [articleContext],
  );

  useEffect(() => {
    (
      window as unknown as {
        __trackFirstInteraction?: typeof trackFirstInteraction;
      }
    ).__trackFirstInteraction = trackFirstInteraction;

    return () => {
      (
        window as unknown as { __trackFirstInteraction?: undefined }
      ).__trackFirstInteraction = undefined;
    };
  }, [trackFirstInteraction]);

  return <>{children}</>;
}

// Helper to notify first interaction from anywhere
export function notifyFirstInteraction(type: InteractionType) {
  if (typeof window !== "undefined") {
    const tracker = (
      window as unknown as {
        __trackFirstInteraction?: (type: InteractionType) => void;
      }
    ).__trackFirstInteraction;
    tracker?.(type);
  }
}
