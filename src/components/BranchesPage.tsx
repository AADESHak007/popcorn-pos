"use client";

const branches = [
  {
    name: "Salmiya",
    manager: "Yousef Al-Anjari",
    city: "Kuwait City",
    sales: 840,
    orders: 342,
    stock: "OK",
    items: 45,
    rank: 1,
  },
  {
    name: "Hawally",
    manager: "Khaled Al-Rashidi",
    city: "Hawally",
    sales: 670,
    orders: 287,
    stock: "Low",
    items: 38,
    rank: 2,
  },
  {
    name: "Farwaniya",
    manager: "Bader Al-Otaibi",
    city: "Farwaniya",
    sales: 540,
    orders: 231,
    stock: "OK",
    items: 42,
    rank: 3,
  },
  {
    name: "Fahaheel",
    manager: "Tariq Al-Enezy",
    city: "Al-Ahmadi",
    sales: 460,
    orders: 195,
    stock: "Warning",
    items: 36,
    rank: 4,
  },
  {
    name: "Jabriya",
    manager: "Sara Al-Sabah",
    city: "Hawally",
    sales: 335,
    orders: 193,
    stock: "OK",
    items: 40,
    rank: 5,
  },
];

const stockConfig: Record<string, { bg: string; color: string; border: string; glow: string }> = {
  OK: { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "rgba(16, 185, 129, 0.2)", glow: "#10b981" },
  Low: { bg: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", border: "rgba(245, 158, 11, 0.2)", glow: "#f59e0b" },
  Warning: { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "rgba(239, 68, 68, 0.2)", glow: "#ef4444" },
};

const accentColors: Record<string, string> = {
  OK: "#10b981",
  Low: "#f59e0b",
  Warning: "#ef4444",
};

function StockBadge({ status }: { status: string }) {
  const cfg = stockConfig[status] || stockConfig.OK;
  return (
    <span
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        fontSize: "11px",
        fontWeight: "800",
        padding: "3px 9px",
        borderRadius: "6px",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        letterSpacing: "0.2px",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: cfg.glow,
          boxShadow: `0 0 6px ${cfg.glow}`,
        }}
      />
      {status}
    </span>
  );
}

export default function BranchesPage() {
  const totalSales = branches.reduce((s, b) => s + b.sales, 0);
  const totalOrders = branches.reduce((s, b) => s + b.orders, 0);

  return (
    <div style={{ padding: "32px", minHeight: "100vh", background: "#f8f6f2", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ color: "var(--text)",
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: "800",
            letterSpacing: "-0.6px",
          }}
        >
          Branch Management
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>
          Performance analytics and status overview of all 5 Popcorn Place Kuwait locations
        </p>
      </div>

      {/* Summary bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {[
          { label: "Total Branches", value: "5 / 5 Active", icon: "🏪", sub: "All operational", accent: "#3b82f6" },
          {
            label: "Combined Revenue",
            value: `KD ${totalSales.toFixed(3)}`,
            icon: "💰",
            sub: "Today global aggregate",
            accent: "#f59e0b",
          },
          {
            label: "Combined Orders",
            value: totalOrders.toString(),
            icon: "📦",
            sub: "Today global sales count",
            accent: "#10b981",
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "20px 22px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.25)";
              e.currentTarget.style.background = "var(--surface-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.background = "var(--surface)";
            }}
          >
            <span
              style={{
                fontSize: "24px",
                background: "rgba(28, 25, 23, 0.03)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "12px",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {s.icon}
            </span>
            <div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  marginBottom: "4px",
                }}
              >
                {s.label}
              </div>
              <div style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", letterSpacing: "-0.3px" }}>
                {s.value}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "11px", marginTop: "2px", fontWeight: "500" }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Branch Cards — 2-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {branches.map((branch, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.3)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(245, 158, 11, 0.12)";
              e.currentTarget.style.background = "var(--surface-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "var(--surface)";
            }}
          >
            {/* Top accent bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: accentColors[branch.stock],
                borderRadius: "16px 16px 0 0",
              }}
            />

            {/* Branch header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "20px",
                marginTop: "4px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "rgba(28, 25, 23, 0.03)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    flexShrink: 0,
                  }}
                >
                  🏪
                </div>
                <div>
                  <div
                    style={{
                      color: "var(--text)",
                      fontFamily: "var(--font-display)",
                      fontSize: "17px",
                      fontWeight: "700",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {branch.name}
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "12px", marginTop: "3px", fontWeight: "500" }}>
                    {branch.city} · <span style={{ color: "var(--text)", fontWeight: "600" }}>{branch.manager}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                  }}
                />
                <span style={{ color: "#10b981", fontSize: "12px", fontWeight: "700", letterSpacing: "0.2px" }}>
                  OPEN
                </span>
              </div>
            </div>

            {/* Stat boxes */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div style={{ background: "rgba(28, 25, 23, 0.03)", border: "1px solid var(--border-subtle)", borderRadius: "10px", padding: "12px" }}>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    marginBottom: "6px",
                  }}
                >
                  Sales
                </div>
                <div style={{ color: "#f59e0b", fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800" }}>
                  KD {branch.sales.toFixed(3)}
                </div>
              </div>
              <div style={{ background: "rgba(28, 25, 23, 0.03)", border: "1px solid var(--border-subtle)", borderRadius: "10px", padding: "12px" }}>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    marginBottom: "6px",
                  }}
                >
                  Orders
                </div>
                <div style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800" }}>
                  {branch.orders}
                </div>
              </div>
              <div style={{ background: "rgba(28, 25, 23, 0.03)", border: "1px solid var(--border-subtle)", borderRadius: "10px", padding: "12px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    marginBottom: "6px",
                  }}
                >
                  Stock Status
                </div>
                <div style={{ display: "flex" }}>
                  <StockBadge status={branch.stock} />
                </div>
              </div>
            </div>

            {/* Footer row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "4px",
              }}
            >
              <span style={{ color: "var(--muted)", fontSize: "12px", fontWeight: "500" }}>
                {branch.items} active SKUs
              </span>
              <button
                style={{
                  background: "rgba(28, 25, 23, 0.03)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "#f59e0b",
                  fontSize: "12px",
                  fontWeight: "700",
                  padding: "6px 14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(245, 158, 11, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(28, 25, 23, 0.03)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                }}
              >
                View Live feed →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
