import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ReelsbyTemi — Visual stories, thoughtfully told.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 76px", background: "radial-gradient(ellipse at 82% 18%, rgba(160,117,65,.28), transparent 35%), linear-gradient(120deg, #080807 0%, #17130f 58%, #090908 100%)", color: "#eee9df", fontFamily: "Arial, sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", right: "-95px", top: "-180px", width: "650px", height: "650px", border: "1px solid rgba(197,164,119,.28)", borderRadius: "50%", display: "flex" }} />
        <div style={{ position: "absolute", right: "45px", top: "-100px", width: "460px", height: "460px", border: "1px solid rgba(197,164,119,.18)", borderRadius: "50%", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "18px", zIndex: 1 }}>
          <div style={{ width: "58px", height: "58px", border: "1px solid #c5a477", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", color: "#eee9df" }}>R<span style={{ color: "#c5a477" }}>T</span></div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: "17px", letterSpacing: "4px" }}>REELSBYTEMI<span style={{ color: "#c5a477", fontSize: "9px", letterSpacing: "3px", marginTop: "7px" }}>VISUAL STORYTELLING</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1, maxWidth: "900px" }}>
          <div style={{ color: "#c5a477", fontSize: "14px", letterSpacing: "5px", marginBottom: "28px" }}>LAGOS, NIGERIA · AVAILABLE WORLDWIDE</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "82px", lineHeight: 1.02, letterSpacing: "-4px", display: "flex", flexDirection: "column" }}>Stories live in the <span style={{ color: "#c5a477", fontStyle: "italic" }}>details.</span></div>
          <div style={{ marginTop: "28px", color: "#c7c0b5", fontSize: "19px", letterSpacing: "1px" }}>FILM · PHOTOGRAPHY · CREATIVE DIRECTION</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(238,233,223,.25)", paddingTop: "20px", color: "#a59b8c", fontSize: "12px", letterSpacing: "3px", zIndex: 1 }}>
          <span>VISUAL STORIES, THOUGHTFULLY TOLD.</span><span>REELSBYTEMI.VERCEL.APP</span>
        </div>
      </div>
    ),
    { ...size }
  );
}