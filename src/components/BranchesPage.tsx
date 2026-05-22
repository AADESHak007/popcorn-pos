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

const stockCfg: Record<string, { bg: string; color: string }> = {
  OK: { bg: "#dcfce7", color: "#4ade80" },
  Low: { bg: "#fef3c7", color: "#f59e0b" },
  Warning: { bg: "#fee2e2", color: "#f87171" },
};

const accentColors: Record<string, string> = {
  OK: "#4ade80",
  Low: "#f59e0b",
  Warning: "#f87171",
};

function StockBadge({ status }: { status: string }) {
  const s = stockCfg[status] || stockCfg.OK;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: "11px",
        fontWeight: "700",
        padding: "3px 9px",
        borderRadius: "999px",
      }}
    >
      {status}
    </span>
  );
}

export default function BranchesPage() {
  const totalSales = branches.reduce((s, b) => s + b.sales, 0);
  const totalOrders = branches.reduce((s, b) => s + b.orders, 0);

  return (
    <div style={{ padding: "32px", minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header */}
      <div style={{ marginBottom: "26px" }}>
        <h1
          style={{
            color: "#111827",
            fontSize: "24px",
            fontWeight: "800",
            letterSpacing: "-0.5px",
          }}
        >
          Branches
        </h1>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "3px" }}>
          Overview of all 5 Popcorn Place Kuwait locations
        </p>
      </div>

      {/* Summary bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        {[
          { label: "Total Branches", value: "5 / 5", icon: "🏪", sub: "All operational" },
          {
            label: "Combined Revenue",
            value: `KD ${totalSales.toLocaleString()}`,
            icon: "💰",
            sub: "Today",
          },
          {
            label: "Combined Orders",
            value: totalOrders.toLocaleString(),
            icon: "📦",
            sub: "Today",
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontSize: "26px",
                background: "#fef3c7",
                borderRadius: "12px",
                width: "50px",
                height: "50px",
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
                  color: "#6b7280",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "3px",
                }}
              >
                {s.label}
              </div>
              <div style={{ color: "#111827", fontSize: "22px", fontWeight: "800", letterSpacing: "-0.3px" }}>
                {s.value}
              </div>
              <div style={{ color: "#6b7280", fontSize: "11px", marginTop: "1px" }}>{s.sub}</div>
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
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "22px",
              position: "relative",
              overflow: "hidden",
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
                marginBottom: "18px",
                marginTop: "4px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    background: "#fef3c7",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    flexShrink: 0,
                  }}
                >
                  🏪
                </div>
                <div>
                  <div
                    style={{
                      color: "#111827",
                      fontSize: "16px",
                      fontWeight: "700",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {branch.name}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "12px", marginTop: "1px" }}>
                    {branch.city} · {branch.manager}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#4ade80",
                  }}
                />
                <span style={{ color: "#4ade80", fontSize: "12px", fontWeight: "500" }}>
                  Open
                </span>
              </div>
            </div>

            {/* Stat boxes */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div style={{ background: "#fef3c7", borderRadius: "9px", padding: "12px 13px" }}>
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    marginBottom: "4px",
                  }}
                >
                  Sales
                </div>
                <div style={{ color: "#f59e0b", fontSize: "16px", fontWeight: "800" }}>
                  KD {branch.sales}
                </div>
              </div>
              <div style={{ background: "#fef3c7", borderRadius: "9px", padding: "12px 13px" }}>
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    marginBottom: "4px",
                  }}
                >
                  Orders
                </div>
                <div style={{ color: "#111827", fontSize: "16px", fontWeight: "800" }}>
                  {branch.orders}
                </div>
              </div>
              <div style={{ background: "#fef3c7", borderRadius: "9px", padding: "12px 13px" }}>
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    marginBottom: "6px",
                  }}
                >
                  Stock
                </div>
                <StockBadge status={branch.stock} />
              </div>
            </div>

            {/* Footer row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: "#6b7280", fontSize: "12px" }}>
                {branch.items} active SKUs
              </span>
              <button
                style={{
                  background: "transparent",
                  border: "1px solid #e5e7eb",
                  borderRadius: "7px",
                  color: "#f59e0b",
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "5px 13px",
                  cursor: "pointer",
                }}
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
