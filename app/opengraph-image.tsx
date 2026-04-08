import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "loserkid - Personal blog by Jean Aguilar";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0e0f12 0%, #14161c 100%)",
        }}
      >
        {/* Accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #7fa38d 0%, #2f5d8a 100%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            background: "linear-gradient(135deg, #f3f4f6 0%, #7fa38d 100%)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.03em",
          }}
        >
          loserkid
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#9aa0a6",
            marginTop: 20,
          }}
        >
          Personal blog by Jean Aguilar
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
