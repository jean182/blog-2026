"use client";

import * as React from "react";

export interface IVideoPlayerProps {
  embedId: string;
  provider: string;
  title?: string;
}

const defaultTitle = "YouTube video player";

export default function VideoPlayer({
  embedId,
  provider,
  title = defaultTitle,
}: IVideoPlayerProps) {
  const url = React.useMemo(() => {
    switch (provider) {
      case "youtube":
        return `https://www.youtube.com/embed/${embedId}`;
      // TODO: Add more providers
      default:
        return "";
    }
  }, [provider]);
  return (
    <div className="relative h-0 overflow-hidden pb-[56.25%]">
      <iframe
        className="absolute left-0 top-0 h-full w-full"
        width="560"
        height="315"
        src={url}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
