"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const branchData = [
  { branch: "Andheri E", sales: 24500 },
  { branch: "Bandra W", sales: 19800 },
  { branch: "Dadar", sales: 16200 },
  { branch: "Thane", sales: 13700 },
  { branch: "Juhu", sales: 10000 },
];

const categoryData = [
  { name: "Popcorn", value: 58 },
  { name: "Beverages", value: 22 },
  { name: "Snacks", value: 12 },
  { name: "Combos", value: 8 },
];

const PIE_COLORS = ["#FAC775", "#f97316", "#a3e635", "#60a5fa"];

const dailySales = [
  { date: "22 May", orders: 198, revenue: 13200, avg: "66.7" },
  { date: "21 May", orders: 215, revenue: 14850, avg: "69.1" },
  { date: "20 May", orders: 176, revenue: 11440, avg: "65.0" },
  { date: "19 May", orders: 203, revenue: 13800, avg: "68.0" },
  { date: "18 May", orders: 245, revenue: 16800, avg: "68.6" },
  { date: "17 May", orders: 189, revenue: 12600, avg: "66.7" },
  { date: "16 May", orders: 222, revenue: 15000, avg: "67.6" },
];

const reportMetrics = [
  { label: "Total Revenue", value: "Rs 84,200", icon: "💰", amber: false },
  { label: "Total Orders", value: "1,248", icon: "📦", amber: false },
  { label: "Avg Order Value", value: "Rs 67.5", icon: "📊", amber: false },
  { label: "Best Branch", value: "Andheri E", icon: "🏆", amber: true },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BranchTooltip = ({ active, payload, label }: any) => {
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

export default function ReportsPage() {
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
          Reports
        </h1>
        <p style={{ color: "#5a4e3a", fontSize: "14px", marginTop: "3px" }}>
          Sales analytics across all branches · May 2026
        </p>
      </div>

      {/* Metric cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "14px",
          marginBottom: "22px",
        }}
      >
        {reportMetrics.map((m, i) => (
          <div
            key={i}
            style={{
              background: "#1c1a10",
              border: "1px solid #2e2918",
              borderRadius: "14px",
              padding: "22px",
            }}
          >
            <span style={{ fontSize: "22px", display: "block", marginBottom: "12px" }}>
              {m.icon}
            </span>
            <div
              style={{
                color: "#5a4e3a",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "5px",
              }}
            >
              {m.label}
            </div>
            <div
              style={{
                color: m.amber ? "#FAC775" : "#ede8db",
                fontSize: "22px",
                fontWeight: "800",
                letterSpacing: "-0.3px",
              }}
            >
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "16px",
          marginBottom: "22px",
        }}
      >
        {/* Branch bar chart */}
        <div
          style={{
            background: "#1c1a10",
            border: "1px solid #2e2918",
            borderRadius: "14px",
            padding: "26px",
          }}
        >
          <h2 style={{ color: "#ede8db", fontSize: "16px", fontWeight: "700", marginBottom: "3px" }}>
            Branch-wise Revenue
          </h2>
          <p style={{ color: "#5a4e3a", fontSize: "13px", marginBottom: "20px" }}>
            Total sales by branch this month
          </p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={branchData} barSize={38} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e2918" vertical={false} />
              <XAxis
                dataKey="branch"
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
              <Tooltip content={<BranchTooltip />} cursor={{ fill: "rgba(250,199,117,0.05)" }} />
              <Bar dataKey="sales" fill="#FAC775" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category donut */}
        <div
          style={{
            background: "#1c1a10",
            border: "1px solid #2e2918",
            borderRadius: "14px",
            padding: "26px",
          }}
        >
          <h2 style={{ color: "#ede8db", fontSize: "16px", fontWeight: "700", marginBottom: "3px" }}>
            Category Split
          </h2>
          <p style={{ color: "#5a4e3a", fontSize: "13px", marginBottom: "6px" }}>
            Revenue share by category
          </p>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="44%"
                innerRadius={58}
                outerRadius={82}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, "Share"]}
                contentStyle={{
                  background: "#1c1a10",
                  border: "1px solid #3d3118",
                  borderRadius: "8px",
                  color: "#ede8db",
                  fontFamily: "DM Sans",
                }}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: "#8a7d69", fontSize: "12px", fontFamily: "DM Sans" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily sales table */}
      <div
        style={{
          background: "#1c1a10",
          border: "1px solid #2e2918",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #2e2918" }}>
          <h2 style={{ color: "#ede8db", fontSize: "16px", fontWeight: "700" }}>
            Daily Sales Breakdown
          </h2>
          <p style={{ color: "#5a4e3a", fontSize: "13px", marginTop: "2px" }}>
            Last 7 days performance across all branches
          </p>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#171510" }}>
              {["Date", "Orders", "Revenue", "Avg Order Value"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    color: "#5a4e3a",
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    padding: "12px 22px",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dailySales.map((row, i) => (
              <tr key={i} style={{ borderTop: "1px solid #2e2918" }}>
                <td style={{ padding: "13px 22px", color: "#ede8db", fontSize: "14px", fontWeight: "500" }}>
                  {row.date}
                </td>
                <td style={{ padding: "13px 22px", color: "#ede8db", fontSize: "14px" }}>
                  {row.orders}
                </td>
                <td style={{ padding: "13px 22px", color: "#FAC775", fontSize: "14px", fontWeight: "700" }}>
                  Rs {row.revenue.toLocaleString()}
                </td>
                <td style={{ padding: "13px 22px", color: "#8a7d69", fontSize: "14px" }}>
                  Rs {row.avg}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
