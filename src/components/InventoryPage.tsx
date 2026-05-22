"use client";
import { useState } from "react";
import { Package, AlertTriangle, Ban } from "lucide-react";

const inventoryItems = [
  { item: "Butter Salt", branch: "Salmiya", category: "Ingredient", stock: 2, unit: "kg", min: 5, status: "Low" },
  { item: "Caramel Sauce", branch: "Hawally", category: "Ingredient", stock: 1, unit: "bottle", min: 3, status: "Warning" },
  { item: "Cheese Powder", branch: "Farwaniya", category: "Ingredient", stock: 3, unit: "kg", min: 5, status: "Low" },
  { item: "Paper Bags (L)", branch: "Fahaheel", category: "Packaging", stock: 45, unit: "pcs", min: 100, status: "Low" },
  { item: "Popcorn Kernels", branch: "Salmiya", category: "Ingredient", stock: 25, unit: "kg", min: 10, status: "OK" },
  { item: "Cola Syrup", branch: "Hawally", category: "Beverage", stock: 8, unit: "litre", min: 5, status: "OK" },
  { item: "Paper Cups (M)", branch: "Jabriya", category: "Packaging", stock: 320, unit: "pcs", min: 200, status: "OK" },
  { item: "Nachos", branch: "Fahaheel", category: "Snack", stock: 0, unit: "kg", min: 5, status: "Warning" },
];

const statusConfig: Record<string, { bg: string; color: string }> = {
  OK: { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981" },
  Low: { bg: "var(--amber-soft)", color: "var(--amber)" },
  Warning: { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] || statusConfig.OK;
  return (
    <span
      style={{
        background: cfg.bg,
        color: cfg.color,
        fontSize: "11px",
        fontWeight: "800",
        padding: "5px 12px",
        borderRadius: "var(--radius-pill)",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: cfg.color }} />
      {status}
    </span>
  );
}

export default function InventoryPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredItems = inventoryItems.filter((item) => selectedFilter === "All" || item.category === selectedFilter);

  return (
    <div className="page-wrap">
      <div style={{ marginBottom: "32px" }}>
        <h1 className="page-title">Inventory System</h1>
        <p className="page-subtitle">Real-time stock ledger and levels across all branches</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "28px" }}>
        {[
          { label: "Total SKUs", value: "48", icon: <Package size={22} color="#f97316" />, sub: "Across 5 branches", bg: "var(--amber-soft)" },
          { label: "Low Stock Items", value: "5", icon: <AlertTriangle size={22} color="#eab308" />, sub: "Needs replenishment", bg: "rgba(234, 179, 8, 0.1)" },
          { label: "Out of Stock", value: "1", icon: <Ban size={22} color="#ef4444" />, sub: "Nachos · Fahaheel", bg: "rgba(239, 68, 68, 0.1)" },
        ].map((s, i) => (
          <div key={i} className="metric-card" style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <span
              style={{
                background: s.bg,
                borderRadius: "14px",
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
              <div style={{ color: "var(--muted)", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                {s.label}
              </div>
              <div style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: "800" }}>{s.value}</div>
              <div style={{ color: "var(--muted)", fontSize: "12px", marginTop: "2px", fontWeight: "500" }}>{s.sub}</div>
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
          <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0 }}>Stock Ledger</h2>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["All", "Ingredient", "Packaging", "Beverage", "Snack"].map((f) => (
              <button key={f} onClick={() => setSelectedFilter(f)} className={`pill ${selectedFilter === f ? "pill-active" : ""}`} style={{ padding: "8px 16px", fontSize: "12px" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {["Item Name", "Branch", "Category", "Current Stock", "Min Level", "Status"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((row, i) => (
                <tr key={i}>
                  <td style={{ color: "var(--text)", fontWeight: "600" }}>{row.item}</td>
                  <td style={{ color: "var(--muted)", fontWeight: "500" }}>{row.branch}</td>
                  <td>
                    <span style={{ background: "var(--surface-muted)", color: "var(--muted)", fontSize: "11px", fontWeight: "600", padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>
                      {row.category}
                    </span>
                  </td>
                  <td style={{ color: row.stock === 0 ? "#ef4444" : "var(--text)", fontWeight: "700" }}>
                    {row.stock} <span style={{ color: "var(--muted)", fontSize: "12px", fontWeight: "500" }}>{row.unit}</span>
                  </td>
                  <td style={{ color: "var(--muted)", fontWeight: "500" }}>
                    {row.min} <span style={{ fontSize: "11px" }}>{row.unit}</span>
                  </td>
                  <td>
                    <StatusBadge status={row.status} />
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
