import Image from "next/image";

const VIDEOS = [
  {
    poster: "/images/products/esencia-enterizo-largo-h.jpg",
    title: "Enterizo Corto Calma Pausa",
    price: "159.000 COP",
    productHref: "/products/enterizo-corto-calma-pausa",
  },
  {
    poster: "/images/products/esencia-2.jpg",
    title: "Enterizo Largo Aura",
    price: "189.900 COP",
    productHref: "/products/enterizo-largo-aura",
  },
  {
    poster: "/images/products/esencia-3.jpg",
    title: "Enterizo Largo Aura",
    price: "189.900 COP",
    productHref: "/products/enterizo-largo-aura",
  },
  {
    poster: "/images/products/esencia-4.jpg",
    title: "Enterizo Corto Calma Pausa",
    price: "159.000 COP",
    productHref: "/products/enterizo-corto-calma-pausa",
  },
];

export default function VideoGallery() {
  return (
    <section style={{ width: "100%", backgroundColor: "#fff" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {VIDEOS.map((video, i) => (
          <div key={i} style={{ position: "relative" }}>
            {/* Video thumbnail */}
            <div style={{ position: "relative", aspectRatio: "9/16", backgroundColor: "#111", overflow: "hidden" }}>
              <Image
                src={video.poster}
                alt={video.title}
                fill
                style={{ objectFit: "cover", opacity: 0.85 }}
                sizes="25vw"
              />
              {/* Play button */}
              <button
                aria-label="Play video"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="#000">
                    <path d="M1 1l14 8L1 17V1z" />
                  </svg>
                </div>
              </button>
              {/* Controls overlay */}
              <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", gap: "8px" }}>
                <button style={{ background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "4px", padding: "4px 6px", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <line x1="1" y1="1" x2="23" y2="23" /><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" /><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </button>
                <button style={{ background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "4px", padding: "4px 6px", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product info below video */}
            <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <Image
                  src={video.poster}
                  alt={video.title}
                  width={40}
                  height={40}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: "12px", fontWeight: 600, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                  {video.title}
                </p>
                <p style={{ margin: 0, fontSize: "12px", color: "#444" }}>{video.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
