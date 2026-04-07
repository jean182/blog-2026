// Main analytics module - single entry point
export { AnalyticsEvent } from "./types";
export type {
  ArticleContext,
  ScrollDepthPayload,
  CopyCodePayload,
  TocItemPayload,
  OutboundLinkPayload,
  PostNavigationPayload,
  PostListClickedPayload,
  FirstInteractionPayload,
  TimeToFirstInteractionPayload,
  ArticleFeedbackPayload,
  EventPayloadMap,
  InteractionType,
  ScrollDepth,
  TimingMetadata,
} from "./types";

export {
  ArticleProvider,
  useArticleContext,
  useTrackEvent,
  trackEvent,
  notifyFirstInteraction,
  getTimeSincePageLoad,
} from "./context";
