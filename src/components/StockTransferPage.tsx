"use client";
import { ArrowRightLeft } from "lucide-react";

const stnRecords = [
  {
    id: "STN-001",
    from: "Commissary",
    to: "Salmiya",
    item: "Caramel Sauce",
    qty: "5 bottles",
    date: "22 May 2026",
    status: "Delivered",
  },
  {
    id: "STN-002",
    from: "Commissary",
    to: "Hawally",
    item: "Popcorn Kernels",
    qty: "10 kg",
    date: "21 May 2026",
    status: "In Transit",
  },
  {
    id: "STN-003",
    from: "Jabriya",
    to: "Fahaheel",
    item: "Paper Bags (L)",
    qty: "200 pcs",
    date: "20 May 2026",
    status: "Pending",
  },
  {
    id: "STN-004",
    from: "Hawally",
    to: "Farwaniya",
    item: "Cola Syrup",
    qty: "3 litres",
    date: "19 May 2026",
    status: "Cancelled",
  },
];

const statusCfg: Record<string, { bg: string; color: string; border: string; glow: string }> = {
  Delivered: { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "rgba(16, 185, 129, 0.2)", glow: "#10b981" },
  "In Transit": { bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", border: "rgba(59, 130, 246, 0.2)", glow: "#3b82f6" },
  Pending: { bg: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", border: "rgba(245, 158, 11, 0.2)", glow: "#f59e0b" },
  Cancelled: { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "rgba(239, 68, 68, 0.2)", glow: "#ef4444" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusCfg[status] || { bg: "rgba(28, 25, 23, 0.03)", color: "var(--muted)", border: "rgba(28, 25, 23, 0.06)", glow: "var(--muted)" };
  return (
    <span
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        fontSize: "11px",
        fontWeight: "800",
        padding: "4px 10px",
        borderRadius: "8px",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        letterSpacing: "0.4px",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: cfg.glow,
          boxShadow: `0 0 8px ${cfg.glow}`,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}

const summaryStats = [
  { label: "Delivered", value: 1, color: "#10b981", glow: "#10b981", bg: "rgba(16, 185, 129, 0.08)" },
  { label: "In Transit", value: 1, color: "#3b82f6", glow: "#3b82f6", bg: "rgba(59, 130, 246, 0.08)" },
  { label: "Pending", value: 1, color: "#f59e0b", glow: "#f59e0b", bg: "rgba(245, 158, 11, 0.08)" },
  { label: "Cancelled", value: 1, color: "#ef4444", glow: "#ef4444", bg: "rgba(239, 68, 68, 0.08)" },
];

export default function StockTransferPage() {
  return (
    <div style={{ padding: "32px", minHeight: "100vh", background: "#f8f6f2", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ color: "var(--text)",
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              fontWeight: "800",
              letterSpacing: "-0.6px",
            }}
          >
            Stock Transfers
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>
            Inter-branch stock transfer notes (STN) and logistics status
          </p>
        </div>
        <div
          style={{
            background: "rgba(28, 25, 23, 0.03)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "10px",
            padding: "8px 16px",
            color: "#f59e0b",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ArrowRightLeft size={14} /> LOGISTICS ENGINE ACTIVE
        </div>
      </div>

      {/* Status summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {summaryStats.map((s, i) => (
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
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: s.bg,
                border: `1px solid ${s.color}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: s.color,
                  boxShadow: `0 0 10px ${s.glow}`,
                }}
              />
            </div>
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
              <div style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "800" }}>
                {s.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* STN Table */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700" }}>
            Transfer Records
          </h2>
          <button
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              border: "none",
              borderRadius: "10px",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: "800",
              padding: "10px 18px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.25)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(1.1)";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "none";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            + New Transfer Request
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--surface-muted)" }}>
                {["STN ID", "From Branch", "To Branch", "Item", "Quantity", "Date", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        color: "var(--muted)",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                        padding: "14px 24px",
                        borderBottom: "1px solid var(--border)",
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
                <tr
                  key={i}
                  style={{
                    borderBottom: i < stnRecords.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(28, 25, 23, 0.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <td
                    style={{
                      padding: "16px 24px",
                      color: "#f59e0b",
                      fontSize: "13px",
                      fontWeight: "700",
                      fontFamily: "monospace",
                      letterSpacing: "0.8px",
                    }}
                  >
                    {rec.id}
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--text)", fontSize: "14px", fontWeight: "600" }}>
                    {rec.from}
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--text)", fontSize: "14px", fontWeight: "600" }}>
                    {rec.to}
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}>
                    {rec.item}
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {rec.qty}
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--muted)", fontSize: "13px", fontWeight: "500" }}>
                    {rec.date}
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <StatusBadge status={rec.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
