"use client";

export default function AnnouncementBar() {
  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "14px",
        fontWeight: 400,
        height: "34px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 16px",
        letterSpacing: "0.02em",
      }}
    >
      <p style={{ margin: 0 }}>
        ENVÍOS GRATIS POR COMPRAS SUPERIORES A{" "}
        <strong style={{ fontWeight: 700 }}>$500.000</strong>
      </p>
    </div>
  );
}
