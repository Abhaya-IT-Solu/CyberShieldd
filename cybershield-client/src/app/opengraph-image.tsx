import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const alt = `${brand.name} — Enterprise Cybersecurity & Software`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #041825 0%, #0a2540 55%, #1d4ed8 140%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginBottom: 28,
          }}
        >
          {brand.name}
        </div>
        <div style={{ fontSize: 74, lineHeight: 1.05, fontWeight: 600, maxWidth: 900 }}>
          Security and software that move enterprises forward.
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 28,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 820,
          }}
        >
          Cybersecurity · Software Engineering · Managed IT
        </div>
      </div>
    ),
    { ...size }
  );
}
