"use client";

interface Props {
  number: string;
  area: string;
  title: string;
  italicTail: string;
  why: string;
  beforeText: string;
  afterText: string;
  metric: string;
  metricLabel: string;
}

export default function ProblemSlide({
  number,
  area,
  title,
  italicTail,
  why,
  beforeText,
  afterText,
  metric,
  metricLabel,
}: Props) {
  return (
    <div className="container" style={{ width: "100%" }}>
      <div className="problem-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "center" }}>
        {/* Left: title + why */}
        <div>
          <p className="eyebrow reveal-1" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{
              fontFamily: "'Trirong', serif", fontStyle: "italic", fontWeight: 200,
              fontSize: "26px", color: "var(--color-accent)", lineHeight: 1, letterSpacing: 0,
            }}>{number}</span>
            <span>Problema · {area}</span>
          </p>
          <h2 className="display-m reveal-2" style={{ marginTop: "16px", maxWidth: "18ch" }}>
            {title}{" "}
            <span className="italic-serif">{italicTail}</span>
          </h2>
          <p className="lede reveal-3" style={{ marginTop: "24px" }}>{why}</p>
        </div>

        {/* Right: before/after card + metric */}
        <div className="reveal-4">
          <div className="antesdespues">
            <div className="col">
              <p className="label antes">Antes</p>
              <p className="text">{beforeText}</p>
            </div>
            <div className="col" style={{ borderColor: "rgba(185,138,110,0.4)", background: "rgba(185,138,110,0.06)" }}>
              <p className="label despues">Después</p>
              <p className="text"><strong>{afterText}</strong></p>
            </div>
          </div>
          <div className="card reveal-5" style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "20px" }}>
            <p className="stat stat-accent" style={{ margin: 0 }}>{metric}</p>
            <p style={{ fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: 0, fontWeight: 600 }}>
              {metricLabel}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
