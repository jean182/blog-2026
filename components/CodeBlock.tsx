"use client";

import { useRef, useState } from "react";
import {
  AnalyticsEvent,
  useTrackEvent,
  notifyFirstInteraction,
} from "@/lib/analytics";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export default function CodeBlock({
  children,
  className,
  index = 0,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const trackEvent = useTrackEvent();

  const getLanguage = () => {
    const codeEl = preRef.current?.querySelector("code");
    const codeClass = codeEl?.className || "";
    const match = codeClass.match(/language-(\w+)/);
    return match ? match[1] : "unknown";
  };

  const handleCopy = async () => {
    const text = preRef.current?.textContent || "";

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      notifyFirstInteraction("copy");
      trackEvent(AnalyticsEvent.CopyCodeClicked, {
        language: getLanguage(),
        code_block_index: index,
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="group relative my-6">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 rounded bg-white/10 px-2 py-1 font-sans text-xs text-white/70 opacity-0 transition-opacity hover:bg-white/20 hover:text-white group-hover:opacity-100 lg:-right-[5.5rem]"
        aria-label="Copy code"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre ref={preRef} className={className}>
        {children}
      </pre>
    </div>
  );
}
