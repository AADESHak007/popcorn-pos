"use client";

const stnRecords = [
  {
    id: "STN-001",
    from: "Andheri East",
    to: "Bandra West",
    item: "Caramel Sauce",
    qty: "5 bottles",
    date: "22 May 2026",
    status: "Delivered",
  },
  {
    id: "STN-002",
    from: "Dadar",
    to: "Thane",
    item: "Popcorn Kernels",
    qty: "10 kg",
    date: "21 May 2026",
    status: "In Transit",
  },
  {
    id: "STN-003",
    from: "Juhu",
    to: "Andheri East",
    item: "Paper Bags (L)",
    qty: "200 pcs",
    date: "20 May 2026",
    status: "Pending",
  },
  {
    id: "STN-004",
    from: "Bandra West",
    to: "Dadar",
    item: "Cola Syrup",
    qty: "3 litres",
    date: "19 May 2026",
    status: "Cancelled",
  },
];

const statusCfg: Record<string, { bg: string; color: string; dot: string }> = {
  Delivered: { bg: "#0d2218", color: "#4ade80", dot: "#4ade80" },
  "In Transit": { bg: "#0e1a30", color: "#60a5fa", dot: "#60a5fa" },
  Pending: { bg: "#2a1d00", color: "#FAC775", dot: "#FAC775" },
  Cancelled: { bg: "#2d0f0f", color: "#f87171", dot: "#f87171" },
};

function StatusBadge({ status }: { status: string }) {
  const s = statusCfg[status] || { bg: "#251c0d", color: "#8a7d69", dot: "#8a7d69" };
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: "11px",
        fontWeight: "700",
        padding: "4px 10px",
        borderRadius: "999px",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        letterSpacing: "0.2px",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: s.dot,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}

const summaryStats = [
  { label: "Delivered", value: 1, color: "#4ade80", bg: "#0d2218" },
  { label: "In Transit", value: 1, color: "#60a5fa", bg: "#0e1a30" },
  { label: "Pending", value: 1, color: "#FAC775", bg: "#2a1d00" },
  { label: "Cancelled", value: 1, color: "#f87171", bg: "#2d0f0f" },
];

export default function StockTransferPage() {
  return (
    <div style={{ padding: "32px", minHeight: "100vh", background: "#0f0e09" }}>
      {/* Header */}
      <div style={{ marginBottom: "26px" }}>
        <h1
          style={{
            color: "#ede8db",
            fontSize: "24px",
            fontWeight: "800",
            letterSpacing: "-0.5px",
          }}
        >
          Stock Transfers
        </h1>
        <p style={{ color: "#5a4e3a", fontSize: "14px", marginTop: "3px" }}>
          Inter-branch stock transfer notes (STN)
        </p>
      </div>

      {/* Status summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {summaryStats.map((s, i) => (
          <div
            key={i}
            style={{
              background: "#1c1a10",
              border: "1px solid #2e2918",
              borderRadius: "12px",
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: s.color,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  color: "#5a4e3a",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "2px",
                }}
              >
                {s.label}
              </div>
              <div style={{ color: s.color, fontSize: "24px", fontWeight: "800" }}>
                {s.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* STN Table */}
      <div
        style={{
          background: "#1c1a10",
          border: "1px solid #2e2918",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid #2e2918",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ color: "#ede8db", fontSize: "16px", fontWeight: "700" }}>
            Transfer Records
          </h2>
          <button
            style={{
              background: "#FAC775",
              border: "none",
              borderRadius: "8px",
              color: "#1a1208",
              fontSize: "13px",
              fontWeight: "700",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            + New Transfer
          </button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#171510" }}>
              {["STN ID", "From Branch", "To Branch", "Item", "Quantity", "Date", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      color: "#5a4e3a",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      padding: "12px 20px",
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {stnRecords.map((rec, i) => (
              <tr key={i} style={{ borderTop: "1px solid #2e2918" }}>
                <td
                  style={{
                    padding: "16px 20px",
                    color: "#FAC775",
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "monospace",
                    letterSpacing: "0.5px",
                  }}
                >
                  {rec.id}
                </td>
                <td style={{ padding: "16px 20px", color: "#ede8db", fontSize: "13.5px" }}>
                  {rec.from}
                </td>
                <td style={{ padding: "16px 20px", color: "#ede8db", fontSize: "13.5px" }}>
                  {rec.to}
                </td>
                <td style={{ padding: "16px 20px", color: "#8a7d69", fontSize: "13.5px" }}>
                  {rec.item}
                </td>
                <td
                  style={{
                    padding: "16px 20px",
                    color: "#ede8db",
                    fontSize: "13.5px",
                    fontWeight: "500",
                  }}
                >
                  {rec.qty}
                </td>
                <td style={{ padding: "16px 20px", color: "#5a4e3a", fontSize: "13px" }}>
                  {rec.date}
                </td>
                <td style={{ padding: "16px 20px" }}>
                  <StatusBadge status={rec.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
