"use client";

export interface ICodeSandboxProps {
  /** The CodeSandbox sandbox ID */
  id: string;
  /** Optional title for the iframe */
  title?: string;
  /** Which view to show on load */
  view?: "editor" | "preview" | "split";
  /** Height of the embed in pixels */
  height?: number;
}

export default function CodeSandbox({
  id,
  title = "CodeSandbox embed",
  view = "preview",
  height = 500,
}: ICodeSandboxProps) {
  const src = `https://codesandbox.io/embed/${id}?view=${view}`;

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-(--accent)/15">
      <iframe
        src={src}
        title={title}
        style={{ width: "100%", height, border: 0 }}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        loading="lazy"
      />
    </div>
  );
}
