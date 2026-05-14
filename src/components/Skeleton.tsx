export function SkeletonCard() {
  return (
    <div>
      <div className="skeleton" style={{ aspectRatio: "3/4", width: "100%" }} />
      <div className="skeleton" style={{ height: "12px", width: "80%", marginTop: "14px" }} />
      <div className="skeleton" style={{ height: "12px", width: "40%", marginTop: "8px" }} />
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "clamp(12px, 1.5vw, 24px)",
        rowGap: "clamp(28px, 3vw, 40px)",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
