"use client";
import { CircleDollarSign, Package, AlertTriangle, Store, FileText, Percent, ArrowRightLeft, CreditCard } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const weeklyData = [
  { day: "Mon", sales: 112 },
  { day: "Tue", sales: 98 },
  { day: "Wed", sales: 135 },
  { day: "Thu", sales: 102 },
  { day: "Fri", sales: 158 },
  { day: "Sat", sales: 143 },
  { day: "Sun", sales: 94 },
];

const branchWeeklyData = [
  { day: "Mon", sales: 25 },
  { day: "Tue", sales: 22 },
  { day: "Wed", sales: 30 },
  { day: "Thu", sales: 24 },
  { day: "Fri", sales: 40 },
  { day: "Sat", sales: 35 },
  { day: "Sun", sales: 20 },
];

const topItems = [
  { name: "Classic Butter Popcorn", category: "Popcorn", orders: 342, revenue: 171 },
  { name: "Caramel Crunch", category: "Popcorn", orders: 289, revenue: 158.95 },
  { name: "Cheese Blast", category: "Popcorn", orders: 256, revenue: 128 },
  { name: "Saffron Caramel", category: "Popcorn", orders: 198, revenue: 99 },
  { name: "Cola (Large)", category: "Beverage", orders: 187, revenue: 93.5 },
];

const stockAlerts = [
  { item: "Butter Salt", branch: "Salmiya", stock: "2 kg", level: "low" },
  { item: "Caramel Sauce", branch: "Hawally", stock: "1 bottle", level: "critical" },
  { item: "Cheese Powder", branch: "Farwaniya", stock: "3 kg", level: "low" },
  { item: "Paper Bags (L)", branch: "Fahaheel", stock: "45 pcs", level: "low" },
];

const purchaseOrders = [
  { id: "PO-102", supplier: "Global Packaging KW", status: "Pending", amount: 450 },
  { id: "PO-101", supplier: "National Corn Co.", status: "Delivered", amount: 1200 },
];

const recentTransfers = [
  { id: "STN-001", from: "Commissary", item: "Caramel Sauce", status: "Delivered" },
  { id: "STN-002", from: "Commissary", item: "Popcorn Kernels", status: "In Transit" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "10px 14px",
        }}
      >
        <div style={{ color: "#6b7280", fontSize: "12px", marginBottom: "3px" }}>{label}</div>
        <div style={{ color: "#f59e0b", fontSize: "17px", fontWeight: "700" }}>
          KD {payload[0].value.toFixed(3)}
        </div>
      </div>
    );
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DashboardPage({ user }: { user?: any }) {
  const isBranch = user?.role === "BRANCH MANAGER" || user?.role === "BRANCH STAFF";
  const locationName = user?.location || "Head Office";
  const branchShortName = locationName.split(' ')[0]; // e.g. "Salmiya"

  // Filter alerts if it's a branch view
  let displayedAlerts = isBranch ? stockAlerts.filter(a => a.branch.includes(branchShortName)) : stockAlerts;
  if (displayedAlerts.length === 0 && isBranch) {
    // Inject a dummy alert so the branch view isn't empty for the demo
    displayedAlerts = [{ item: "Paper Cups (M)", branch: branchShortName, stock: "50 pcs", level: "low" }];
  }

  // Define Metrics based on Role
  const metrics = isBranch
    ? [
        { label: "Today's Sales", value: "KD 196.000", sub: "+5.2% vs yesterday", up: true, icon: <CircleDollarSign size={19} />, color: "#f59e0b" },
        { label: "Today's Orders", value: "42", sub: "+2.1% vs yesterday", up: true, icon: <Package size={19} />, color: "#60a5fa" },
        { label: "Stock Alerts", value: displayedAlerts.length.toString(), sub: "Requires attention", up: false, icon: <AlertTriangle size={19} />, color: "#f87171" },
        { label: "Cash in Drawer", value: "KD 85.500", sub: "Expected cash", up: true, icon: <CreditCard size={19} />, color: "#4ade80" },
      ]
    : [
        { label: "Global Sales", value: "KD 2,840", sub: "+12.4% vs yesterday", up: true, icon: <CircleDollarSign size={19} />, color: "#f59e0b" },
        { label: "Global Orders", value: "138", sub: "+8.2% vs yesterday", up: true, icon: <Package size={19} />, color: "#60a5fa" },
        { label: "HO Stock Alerts", value: "4", sub: "Global shortages", up: false, icon: <AlertTriangle size={19} />, color: "#f87171" },
        { label: "Overall COGS %", value: "32.5%", sub: "Healthy margin", up: true, icon: <Percent size={19} />, color: "#4ade80" },
      ];

  const chartData = isBranch ? branchWeeklyData : weeklyData;
  const chartTitle = isBranch ? "Branch Weekly Sales" : "Global Weekly Sales";
  const chartSubtitle = isBranch ? "Revenue for this location · This week" : "Revenue across all branches · This week";

  return (
    <div style={{ padding: "32px", minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            color: "#111827",
            fontSize: "24px",
            fontWeight: "800",
            letterSpacing: "-0.5px",
          }}
        >
          {isBranch ? `${branchShortName} Dashboard` : "Head Office Dashboard"}
        </h1>
        <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "3px" }}>
          Welcome back, {user?.name || "Yousef Al-Anjari"} · Thursday, 22 May 2026
        </p>
      </div>

      {/* Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "22px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  color: "#6b7280",
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  background: "#fef3c7",
                  borderRadius: "8px",
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "19px",
                  color: m.color,
                }}
              >
                {m.icon}
              </div>
            </div>
            <div
              style={{
                color: "#111827",
                fontSize: "26px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
                marginBottom: "6px",
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: m.up ? "#4ade80" : "#f87171",
              }}
            >
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Alerts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Weekly Bar Chart */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            padding: "26px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "22px",
            }}
          >
            <div>
              <h2 style={{ color: "#111827", fontSize: "16px", fontWeight: "700" }}>
                {chartTitle}
              </h2>
              <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "2px" }}>
                {chartSubtitle}
              </p>
            </div>
            <div
              style={{
                background: "#fef3c7",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                padding: "5px 11px",
                fontSize: "11px",
                fontWeight: "600",
                color: "#6b7280",
              }}
            >
              May 2026
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={chartData} barSize={34} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "#6b7280", fontSize: 12, fontFamily: "DM Sans" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "DM Sans" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(245, 158, 11, 0.05)" }} />
              <Bar dataKey="sales" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Alerts Panel */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            padding: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ color: "#111827", fontSize: "16px", fontWeight: "700" }}>
              Stock Alerts
            </h2>
            <span
              style={{
                background: "#fee2e2",
                color: "#f87171",
                fontSize: "11px",
                fontWeight: "700",
                padding: "3px 9px",
                borderRadius: "999px",
              }}
            >
              {displayedAlerts.length} active
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {displayedAlerts.map((a, i) => (
              <div
                key={i}
                style={{
                  background: "#fef3c7",
                  border: "1px solid #e5e7eb",
                  borderRadius: "9px",
                  padding: "12px 13px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{ color: "#111827", fontSize: "13px", fontWeight: "600" }}
                    >
                      {a.item}
                    </div>
                    <div style={{ color: "#6b7280", fontSize: "11px", marginTop: "2px" }}>
                      {!isBranch && a.branch}
                      {isBranch && "Current Branch"}
                    </div>
                  </div>
                  <span
                    style={{
                      background: a.level === "critical" ? "#fee2e2" : "#fef3c7",
                      color: a.level === "critical" ? "#f87171" : "#f59e0b",
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "3px 8px",
                      borderRadius: "5px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {a.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conditional Bottom Row: Top Items & POs (for HO) OR Transfers (for Branch) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isBranch ? "1fr 1fr" : "2fr 1fr",
          gap: "16px",
        }}
      >
        {/* Top Items Table */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "22px 24px", borderBottom: "1px solid #e5e7eb" }}>
            <h2 style={{ color: "#111827", fontSize: "16px", fontWeight: "700" }}>
              {isBranch ? "Branch Top Items" : "Global Top Selling Items"}
            </h2>
            <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "2px" }}>
              Best performers this week
            </p>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                {["Rank", "Item Name", "Category", "Orders"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      color: "#6b7280",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      padding: "11px 22px",
                    }}
                  >
                    {h}
                  </th>
                ))}
                {!isBranch && (
                  <th
                    style={{
                      textAlign: "left",
                      color: "#6b7280",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      padding: "11px 22px",
                    }}
                  >
                    Revenue
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {topItems.map((item, i) => (
                <tr key={i} style={{ borderTop: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "14px 22px", color: "#6b7280", fontSize: "13px", fontWeight: "700" }}>
                    #{i + 1}
                  </td>
                  <td style={{ padding: "14px 22px", color: "#111827", fontSize: "14px", fontWeight: "500" }}>
                    {item.name}
                  </td>
                  <td style={{ padding: "14px 22px" }}>
                    <span
                      style={{
                        background: "#fef3c7",
                        color: "#f59e0b",
                        fontSize: "11px",
                        fontWeight: "600",
                        padding: "3px 9px",
                        borderRadius: "4px",
                      }}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td style={{ padding: "14px 22px", color: "#111827", fontSize: "14px" }}>
                    {isBranch ? Math.floor(item.orders / 5) : item.orders}
                  </td>
                  {!isBranch && (
                    <td style={{ padding: "14px 22px", color: "#f59e0b", fontSize: "14px", fontWeight: "700" }}>
                      KD {item.revenue.toFixed(3)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Panel 2: Purchase Orders (HO) OR Stock Transfers (Branch) */}
        {!isBranch ? (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "22px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ color: "#111827", fontSize: "16px", fontWeight: "700" }}>Purchase Orders</h2>
                <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "2px" }}>Supplier procurement</p>
              </div>
              <FileText size={20} color="#f59e0b" />
            </div>
            <div style={{ padding: "16px" }}>
              {purchaseOrders.map((po, i) => (
                <div key={i} style={{ marginBottom: "12px", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontWeight: "700", color: "#111827", fontSize: "14px" }}>{po.id}</span>
                    <span style={{ color: po.status === "Delivered" ? "#4ade80" : "#f59e0b", fontWeight: "600", fontSize: "12px" }}>{po.status}</span>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "12px", marginBottom: "4px" }}>{po.supplier}</div>
                  <div style={{ color: "#111827", fontSize: "14px", fontWeight: "700" }}>KD {po.amount.toFixed(3)}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "22px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ color: "#111827", fontSize: "16px", fontWeight: "700" }}>Stock Transfers</h2>
                <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "2px" }}>Recent STNs for this branch</p>
              </div>
              <ArrowRightLeft size={20} color="#f59e0b" />
            </div>
            <div style={{ padding: "16px" }}>
              {recentTransfers.map((stn, i) => (
                <div key={i} style={{ marginBottom: "12px", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontWeight: "700", color: "#111827", fontSize: "14px" }}>{stn.id}</span>
                    <span style={{ color: stn.status === "Delivered" ? "#4ade80" : "#60a5fa", fontWeight: "600", fontSize: "12px", background: stn.status === "Delivered" ? "#dcfce7" : "#dbeafe", padding: "2px 8px", borderRadius: "4px" }}>
                      {stn.status}
                    </span>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "12px", marginBottom: "4px" }}>From: {stn.from}</div>
                  <div style={{ color: "#111827", fontSize: "13px", fontWeight: "600" }}>{stn.item}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
