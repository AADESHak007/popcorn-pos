"use client";

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
  { day: "Mon", sales: 11200 },
  { day: "Tue", sales: 9800 },
  { day: "Wed", sales: 13500 },
  { day: "Thu", sales: 10200 },
  { day: "Fri", sales: 15800 },
  { day: "Sat", sales: 14300 },
  { day: "Sun", sales: 9400 },
];

const topItems = [
  { name: "Classic Butter Popcorn", category: "Popcorn", orders: 342, revenue: 17100 },
  { name: "Caramel Crunch", category: "Popcorn", orders: 289, revenue: 15895 },
  { name: "Cheese Blast", category: "Popcorn", orders: 256, revenue: 12800 },
  { name: "Masala Magic", category: "Popcorn", orders: 198, revenue: 9900 },
  { name: "Cola (Large)", category: "Beverage", orders: 187, revenue: 9350 },
];

const stockAlerts = [
  { item: "Butter Salt", branch: "Andheri East", stock: "2 kg", level: "low" },
  { item: "Caramel Sauce", branch: "Bandra West", stock: "1 bottle", level: "critical" },
  { item: "Cheese Powder", branch: "Dadar", stock: "3 kg", level: "low" },
  { item: "Paper Bags (L)", branch: "Thane", stock: "45 pcs", level: "low" },
];

const metrics = [
  {
    label: "Total Sales",
    value: "Rs 84,200",
    sub: "+12.4% vs yesterday",
    up: true,
    icon: "💰",
    color: "#FAC775",
  },
  {
    label: "Total Orders",
    value: "138",
    sub: "+8.2% vs yesterday",
    up: true,
    icon: "📦",
    color: "#60a5fa",
  },
  {
    label: "Stock Alerts",
    value: "4",
    sub: "Needs attention",
    up: false,
    icon: "⚠️",
    color: "#f87171",
  },
  {
    label: "Active Branches",
    value: "5/5",
    sub: "All operational",
    up: true,
    icon: "🏪",
    color: "#4ade80",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "#1c1a10",
          border: "1px solid #3d3118",
          borderRadius: "8px",
          padding: "10px 14px",
        }}
      >
        <div style={{ color: "#8a7d69", fontSize: "12px", marginBottom: "3px" }}>{label}</div>
        <div style={{ color: "#FAC775", fontSize: "17px", fontWeight: "700" }}>
          Rs {payload[0].value.toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  return (
    <div style={{ padding: "32px", minHeight: "100vh", background: "#0f0e09" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            color: "#ede8db",
            fontSize: "24px",
            fontWeight: "800",
            letterSpacing: "-0.5px",
          }}
        >
          Dashboard
        </h1>
        <p style={{ color: "#5a4e3a", fontSize: "14px", marginTop: "3px" }}>
          Welcome back, Raj Kumar · Thursday, 22 May 2026
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
              background: "#1c1a10",
              border: "1px solid #2e2918",
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
                  color: "#5a4e3a",
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  background: "#251c0d",
                  borderRadius: "8px",
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "19px",
                }}
              >
                {m.icon}
              </div>
            </div>
            <div
              style={{
                color: "#ede8db",
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
            background: "#1c1a10",
            border: "1px solid #2e2918",
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
              <h2 style={{ color: "#ede8db", fontSize: "16px", fontWeight: "700" }}>
                Weekly Sales
              </h2>
              <p style={{ color: "#5a4e3a", fontSize: "13px", marginTop: "2px" }}>
                Revenue across all branches · This week
              </p>
            </div>
            <div
              style={{
                background: "#251c0d",
                border: "1px solid #3d3118",
                borderRadius: "6px",
                padding: "5px 11px",
                fontSize: "11px",
                fontWeight: "600",
                color: "#8a7d69",
              }}
            >
              May 2026
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={weeklyData} barSize={34} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e2918" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "#5a4e3a", fontSize: 12, fontFamily: "DM Sans" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#5a4e3a", fontSize: 11, fontFamily: "DM Sans" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(250,199,117,0.05)" }} />
              <Bar dataKey="sales" fill="#FAC775" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Alerts Panel */}
        <div
          style={{
            background: "#1c1a10",
            border: "1px solid #2e2918",
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
            <h2 style={{ color: "#ede8db", fontSize: "16px", fontWeight: "700" }}>
              Stock Alerts
            </h2>
            <span
              style={{
                background: "#2d0f0f",
                color: "#f87171",
                fontSize: "11px",
                fontWeight: "700",
                padding: "3px 9px",
                borderRadius: "999px",
              }}
            >
              4 active
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {stockAlerts.map((a, i) => (
              <div
                key={i}
                style={{
                  background: "#251c0d",
                  border: "1px solid #3d3118",
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
                      style={{ color: "#ede8db", fontSize: "13px", fontWeight: "600" }}
                    >
                      {a.item}
                    </div>
                    <div style={{ color: "#5a4e3a", fontSize: "11px", marginTop: "2px" }}>
                      {a.branch}
                    </div>
                  </div>
                  <span
                    style={{
                      background: a.level === "critical" ? "#2d0f0f" : "#2a1d00",
                      color: a.level === "critical" ? "#f87171" : "#FAC775",
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

      {/* Top Items Table */}
      <div
        style={{
          background: "#1c1a10",
          border: "1px solid #2e2918",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "22px 24px", borderBottom: "1px solid #2e2918" }}>
          <h2 style={{ color: "#ede8db", fontSize: "16px", fontWeight: "700" }}>
            Top Selling Items
          </h2>
          <p style={{ color: "#5a4e3a", fontSize: "13px", marginTop: "2px" }}>
            Best performers this week across all branches
          </p>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#171510" }}>
              {["Rank", "Item Name", "Category", "Orders", "Revenue"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    color: "#5a4e3a",
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
            </tr>
          </thead>
          <tbody>
            {topItems.map((item, i) => (
              <tr key={i} style={{ borderTop: "1px solid #2e2918" }}>
                <td style={{ padding: "14px 22px", color: "#5a4e3a", fontSize: "13px", fontWeight: "700" }}>
                  #{i + 1}
                </td>
                <td style={{ padding: "14px 22px", color: "#ede8db", fontSize: "14px", fontWeight: "500" }}>
                  {item.name}
                </td>
                <td style={{ padding: "14px 22px" }}>
                  <span
                    style={{
                      background: "#251c0d",
                      color: "#FAC775",
                      fontSize: "11px",
                      fontWeight: "600",
                      padding: "3px 9px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.category}
                  </span>
                </td>
                <td style={{ padding: "14px 22px", color: "#ede8db", fontSize: "14px" }}>
                  {item.orders}
                </td>
                <td style={{ padding: "14px 22px", color: "#FAC775", fontSize: "14px", fontWeight: "700" }}>
                  Rs {item.revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
