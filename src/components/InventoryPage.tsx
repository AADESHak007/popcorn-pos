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

const statusConfig: Record<string, { bg: string; color: string; border: string; glow: string }> = {
  OK: { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "rgba(16, 185, 129, 0.2)", glow: "#10b981" },
  Low: { bg: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", border: "rgba(245, 158, 11, 0.2)", glow: "#f59e0b" },
  Warning: { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "rgba(239, 68, 68, 0.2)", glow: "#ef4444" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] || statusConfig.OK;
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
        textTransform: "uppercase",
        letterSpacing: "0.4px",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: cfg.glow,
          boxShadow: `0 0 8px ${cfg.glow}`,
        }}
      />
      {status}
    </span>
  );
}

export default function InventoryPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredItems = inventoryItems.filter((item) => {
    return selectedFilter === "All" || item.category === selectedFilter;
  });

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
          Inventory System
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>
          Real-time stock ledger and levels across all branches
        </p>
      </div>

      {/* Summary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          { label: "Total SKUs", value: "48", icon: <Package size={20} color="#f59e0b" />, sub: "Across 5 branches", bg: "rgba(245, 158, 11, 0.08)" },
          { label: "Low Stock Items", value: "5", icon: <AlertTriangle size={20} color="#eab308" />, sub: "Needs replenishment", bg: "rgba(234, 179, 8, 0.08)" },
          { label: "Out of Stock", value: "1", icon: <Ban size={20} color="#ef4444" />, sub: "Nachos · Fahaheel", bg: "rgba(239, 68, 68, 0.08)" },
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
                background: s.bg,
                border: `1px solid ${s.icon.props.color}22`,
                borderRadius: "12px",
                width: "44px",
                height: "44px",
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
              <div style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "800" }}>{s.value}</div>
              <div style={{ color: "var(--muted)", fontSize: "11px", marginTop: "2px", fontWeight: "500" }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
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
        {/* Table toolbar */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700" }}>Stock Ledger</h2>
          <div style={{ display: "flex", gap: "6px" }}>
            {["All", "Ingredient", "Packaging", "Beverage", "Snack"].map((f) => {
              const isSelected = selectedFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  style={{
                    padding: "6px 14px",
                    background: isSelected ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" : "rgba(28, 25, 23, 0.03)",
                    border: isSelected ? "none" : "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    color: isSelected ? "#ffffff" : "var(--muted)",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isSelected ? "0 4px 12px rgba(245, 158, 11, 0.25)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "rgba(28, 25, 23, 0.06)";
                      e.currentTarget.style.color = "#ffffff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "rgba(28, 25, 23, 0.03)";
                      e.currentTarget.style.color = "var(--muted)";
                    }
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--surface-muted)" }}>
                {["Item Name", "Branch", "Category", "Current Stock", "Min Level", "Status"].map(
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
              {filteredItems.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: i < filteredItems.length - 1 ? "1px solid var(--border-subtle)" : "none",
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
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {row.item}
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--muted)", fontSize: "13px", fontWeight: "500" }}>
                    {row.branch}
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <span
                      style={{
                        background: "rgba(28, 25, 23, 0.04)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--muted)",
                        fontSize: "11px",
                        fontWeight: "600",
                        padding: "3px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      {row.category}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      color: row.stock === 0 ? "#ef4444" : "#ffffff",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    {row.stock} <span style={{ color: "var(--muted)", fontSize: "12px", fontWeight: "500" }}>{row.unit}</span>
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--muted)", fontSize: "13px", fontWeight: "500" }}>
                    {row.min} <span style={{ color: "var(--muted)", fontSize: "11px" }}>{row.unit}</span>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
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
