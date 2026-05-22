"use client";
import { Package, AlertTriangle, Ban } from "lucide-react";

const inventoryItems = [
  { item: "Butter Salt", branch: "Andheri East", category: "Ingredient", stock: 2, unit: "kg", min: 5, status: "Low" },
  { item: "Caramel Sauce", branch: "Bandra West", category: "Ingredient", stock: 1, unit: "bottle", min: 3, status: "Warning" },
  { item: "Cheese Powder", branch: "Dadar", category: "Ingredient", stock: 3, unit: "kg", min: 5, status: "Low" },
  { item: "Paper Bags (L)", branch: "Thane", category: "Packaging", stock: 45, unit: "pcs", min: 100, status: "Low" },
  { item: "Popcorn Kernels", branch: "Andheri East", category: "Ingredient", stock: 25, unit: "kg", min: 10, status: "OK" },
  { item: "Cola Syrup", branch: "Bandra West", category: "Beverage", stock: 8, unit: "litre", min: 5, status: "OK" },
  { item: "Paper Cups (M)", branch: "Juhu", category: "Packaging", stock: 320, unit: "pcs", min: 200, status: "OK" },
  { item: "Nachos", branch: "Thane", category: "Snack", stock: 0, unit: "kg", min: 5, status: "Warning" },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  OK: { bg: "#dcfce7", color: "#4ade80" },
  Low: { bg: "#fef3c7", color: "#f59e0b" },
  Warning: { bg: "#fee2e2", color: "#f87171" },
};

function StatusBadge({ status }: { status: string }) {
  const s = statusStyle[status] || statusStyle.OK;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: "11px",
        fontWeight: "700",
        padding: "4px 10px",
        borderRadius: "999px",
        textTransform: "uppercase",
        letterSpacing: "0.3px",
      }}
    >
      {status}
    </span>
  );
}

export default function InventoryPage() {
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
          Inventory
        </h1>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "3px" }}>
          Stock levels across all branches
        </p>
      </div>

      {/* Summary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {[
          { label: "Total SKUs", value: "48", icon: <Package size={24} color="#f59e0b" />, sub: "Across 5 branches" },
          { label: "Low Stock Items", value: "5", icon: <AlertTriangle size={24} color="#f59e0b" />, sub: "Needs reorder" },
          { label: "Out of Stock", value: "1", icon: <Ban size={24} color="#ef4444" />, sub: "Nachos · Thane" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                background: "#fef3c7",
                borderRadius: "10px",
                width: "46px",
                height: "46px",
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
                  marginBottom: "2px",
                }}
              >
                {s.label}
              </div>
              <div style={{ color: "#111827", fontSize: "24px", fontWeight: "800" }}>{s.value}</div>
              <div style={{ color: "#6b7280", fontSize: "11px", marginTop: "1px" }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        {/* Table toolbar */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ color: "#111827", fontSize: "16px", fontWeight: "700" }}>Stock Ledger</h2>
          <div style={{ display: "flex", gap: "7px" }}>
            {["All", "Ingredient", "Packaging", "Beverage", "Snack"].map((f, i) => (
              <button
                key={f}
                style={{
                  padding: "5px 12px",
                  background: i === 0 ? "#f59e0b" : "#fef3c7",
                  border: "1px solid " + (i === 0 ? "#f59e0b" : "#e5e7eb"),
                  borderRadius: "6px",
                  color: i === 0 ? "#ffffff" : "#6b7280",
                  fontSize: "12px",
                  fontWeight: i === 0 ? "700" : "400",
                  cursor: "pointer",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              {["Item Name", "Branch", "Category", "Current Stock", "Min Level", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      color: "#6b7280",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      padding: "12px 22px",
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((row, i) => (
              <tr key={i} style={{ borderTop: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "14px 22px",
                    color: "#111827",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {row.item}
                </td>
                <td style={{ padding: "14px 22px", color: "#6b7280", fontSize: "13px" }}>
                  {row.branch}
                </td>
                <td style={{ padding: "14px 22px" }}>
                  <span
                    style={{
                      background: "#fef3c7",
                      color: "#6b7280",
                      fontSize: "11px",
                      fontWeight: "500",
                      padding: "3px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {row.category}
                  </span>
                </td>
                <td
                  style={{
                    padding: "14px 22px",
                    color: row.stock === 0 ? "#f87171" : "#111827",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {row.stock} {row.unit}
                </td>
                <td style={{ padding: "14px 22px", color: "#6b7280", fontSize: "13px" }}>
                  {row.min} {row.unit}
                </td>
                <td style={{ padding: "14px 22px" }}>
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
