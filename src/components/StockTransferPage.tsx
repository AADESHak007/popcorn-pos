"use client";
import { ArrowRightLeft } from "lucide-react";
import { cardStyles } from "@/lib/ui";
import { useTranslation } from "@/contexts/LocaleContext";

const stnRecords = [
  { id: "STN-001", from: "Commissary", to: "Salmiya", item: "Caramel Sauce", qty: "5 bottles", date: "22 May 2026", status: "Delivered" },
  { id: "STN-002", from: "Commissary", to: "Hawally", item: "Popcorn Kernels", qty: "10 kg", date: "21 May 2026", status: "In Transit" },
  { id: "STN-003", from: "Jabriya", to: "Fahaheel", item: "Paper Bags (L)", qty: "200 pcs", date: "20 May 2026", status: "Pending" },
  { id: "STN-004", from: "Hawally", to: "Farwaniya", item: "Cola Syrup", qty: "3 litres", date: "19 May 2026", status: "Cancelled" },
];

const statusCfg: Record<string, { bg: string; color: string; glow: string }> = {
  Delivered: { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981", glow: "#10b981" },
  "In Transit": { bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", glow: "#3b82f6" },
  Pending: { bg: "var(--amber-soft)", color: "var(--amber)", glow: "#f97316" },
  Cancelled: { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444", glow: "#ef4444" },
};

const statusKey: Record<string, string> = {
  Delivered: "status.delivered",
  "In Transit": "status.inTransit",
  Pending: "status.pending",
  Cancelled: "status.cancelled",
};

function StatusBadge({ status, label }: { status: string; label: string }) {
  const cfg = statusCfg[status] || { bg: "var(--surface-muted)", color: "var(--muted)", glow: "var(--muted)" };
  return (
    <span
      style={{
        background: cfg.bg,
        color: cfg.color,
        fontSize: "11px",
        fontWeight: "800",
        padding: "5px 12px",
        borderRadius: "var(--radius-pill)",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: cfg.glow, boxShadow: `0 0 6px ${cfg.glow}` }} />
      {label}
    </span>
  );
}

const summaryStats = [
  { id: "Delivered", value: 1, color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
  { id: "In Transit", value: 1, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)" },
  { id: "Pending", value: 1, color: "var(--amber)", bg: "var(--amber-soft)" },
  { id: "Cancelled", value: 1, color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" },
];

export default function StockTransferPage() {
  const { t } = useTranslation();
  return (
    <div className="page-wrap">
      <div className="page-header">
        <div>
          <h1 className="page-title">{t("stockTransfer.title")}</h1>
          <p className="page-subtitle">{t("stockTransfer.subtitle")}</p>
        </div>
        <span className="status-chip status-chip-active">{t("stockTransfer.logisticsActive")}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "28px" }}>
        {summaryStats.map((s, i) => (
          <div key={i} className="metric-card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
            </div>
            <div>
              <div style={{ color: "var(--muted)", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                {t(statusKey[s.id] ?? s.id)}
              </div>
              <div style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: "800" }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            padding: "22px 28px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0 }}>{t("stockTransfer.transferRecords")}</h2>
          <button className="btn-primary" style={{ padding: "11px 20px", fontSize: "13px", fontWeight: "800", borderRadius: "var(--radius-md)" }}>
            {t("stockTransfer.newTransfer")}
          </button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t("stockTransfer.table.stnId")}</th>
                <th>{t("stockTransfer.table.fromBranch")}</th>
                <th>{t("stockTransfer.table.toBranch")}</th>
                <th>{t("stockTransfer.table.item")}</th>
                <th>{t("stockTransfer.table.quantity")}</th>
                <th>{t("stockTransfer.table.date")}</th>
                <th>{t("stockTransfer.table.status")}</th>
              </tr>
            </thead>
            <tbody>
              {stnRecords.map((rec, i) => (
                <tr key={i}>
                  <td style={{ color: "var(--amber)", fontWeight: "700", fontFamily: "monospace", letterSpacing: "0.04em" }}>{rec.id}</td>
                  <td style={{ color: "var(--text)", fontWeight: "600" }}>{rec.from}</td>
                  <td style={{ color: "var(--text)", fontWeight: "600" }}>{rec.to}</td>
                  <td style={{ color: "var(--text-secondary)", fontWeight: "500" }}>{rec.item}</td>
                  <td style={{ color: "var(--text)", fontWeight: "600" }}>{rec.qty}</td>
                  <td style={{ color: "var(--muted)", fontWeight: "500" }}>{rec.date}</td>
                  <td>
                    <StatusBadge status={rec.status} label={t(statusKey[rec.status] ?? rec.status)} />
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
