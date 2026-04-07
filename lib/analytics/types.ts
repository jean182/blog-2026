// Strongly typed analytics event system

export enum AnalyticsEvent {
  // Content engagement
  ScrollDepthReached = "scroll_depth_reached",
  PostCompleted = "post_completed",

  // Interactions
  CopyCodeClicked = "copy_code_clicked",
  TocItemClicked = "toc_item_clicked",
  OutboundLinkClicked = "outbound_link_clicked",
  PostNavigationClicked = "post_navigation_clicked",
  PostListClicked = "post_list_clicked",

  // User behavior
  FirstInteraction = "first_interaction",
  TimeToFirstInteraction = "time_to_first_interaction",

  // Feedback
  ArticleFeedback = "article_feedback",
}

// Article context included in every event
export interface ArticleContext {
  article_slug: string;
  article_title: string;
}

// Shared types
export type InteractionType = "scroll" | "click" | "copy";
export type ScrollDepth = 25 | 50 | 75 | 90 | 100;

// Optional timing metadata (can be added to any event)
export interface TimingMetadata {
  time_since_page_load_ms?: number;
}

// Marker for events with no payload
export type EmptyPayload = Record<string, never>;

// Event-specific payloads
export interface ScrollDepthPayload {
  depth_percent: ScrollDepth;
}

export interface CopyCodePayload {
  language: string;
  code_block_index: number;
}

export interface TocItemPayload {
  heading_text: string;
  heading_level: number;
}

export interface OutboundLinkPayload {
  url: string;
  link_text?: string;
}

export interface PostNavigationPayload {
  direction: "newer" | "older";
  target_slug: string;
  target_title: string;
}

export interface PostListClickedPayload {
  post_slug: string;
  post_title: string;
  position: number;
}

export interface FirstInteractionPayload {
  interaction_type: InteractionType;
}

export interface TimeToFirstInteractionPayload {
  time_ms: number;
  interaction_type: InteractionType;
}

export interface ArticleFeedbackPayload {
  value: "positive" | "negative";
}

// Event → Payload mapping
export type EventPayloadMap = {
  [AnalyticsEvent.ScrollDepthReached]: ScrollDepthPayload;
  [AnalyticsEvent.PostCompleted]: EmptyPayload;
  [AnalyticsEvent.CopyCodeClicked]: CopyCodePayload;
  [AnalyticsEvent.TocItemClicked]: TocItemPayload;
  [AnalyticsEvent.OutboundLinkClicked]: OutboundLinkPayload;
  [AnalyticsEvent.PostNavigationClicked]: PostNavigationPayload;
  [AnalyticsEvent.PostListClicked]: PostListClickedPayload;
  [AnalyticsEvent.FirstInteraction]: FirstInteractionPayload;
  [AnalyticsEvent.TimeToFirstInteraction]: TimeToFirstInteractionPayload;
  [AnalyticsEvent.ArticleFeedback]: ArticleFeedbackPayload;
};

// Helper: events that require no payload
export type EmptyPayloadEvents = {
  [K in AnalyticsEvent]: EventPayloadMap[K] extends EmptyPayload ? K : never;
}[AnalyticsEvent];

// Helper: events that require a payload
export type PayloadEvents = Exclude<AnalyticsEvent, EmptyPayloadEvents>;
