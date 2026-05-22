"use client";
import { CircleDollarSign, Package, BarChart3, Trophy } from "lucide-react";

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
  { branch: "Salmiya", sales: 840 },
  { branch: "Hawally", sales: 670 },
  { branch: "Farwaniya", sales: 540 },
  { branch: "Fahaheel", sales: 460 },
  { branch: "Jabriya", sales: 335 },
];

const categoryData = [
  { name: "Popcorn", value: 58 },
  { name: "Beverages", value: 22 },
  { name: "Snacks", value: 12 },
  { name: "Combos", value: 8 },
];

const PIE_COLORS = ["#f59e0b", "#d97706", "#b45309", "#8b5cf6"];

const dailySales = [
  { date: "22 May", orders: 198, revenue: 1320, avg: "6.67" },
  { date: "21 May", orders: 215, revenue: 1485, avg: "6.91" },
  { date: "20 May", orders: 176, revenue: 1144, avg: "6.50" },
  { date: "19 May", orders: 203, revenue: 1380, avg: "6.80" },
  { date: "18 May", orders: 245, revenue: 1680, avg: "6.86" },
  { date: "17 May", orders: 189, revenue: 1260, avg: "6.67" },
  { date: "16 May", orders: 222, revenue: 1500, avg: "6.76" },
];

const reportMetrics = [
  { label: "Total Revenue", value: "KD 2,840.000", icon: <CircleDollarSign size={20} color="#f59e0b" />, bg: "rgba(245, 158, 11, 0.08)" },
  { label: "Total Orders", value: "1,248", icon: <Package size={20} color="#8b5cf6" />, bg: "rgba(139, 92, 246, 0.08)" },
  { label: "Avg Order Value", value: "KD 2.280", icon: <BarChart3 size={20} color="#3b82f6" />, bg: "rgba(59, 130, 246, 0.08)" },
  { label: "Best Branch", value: "Salmiya", icon: <Trophy size={20} color="#f59e0b" />, bg: "rgba(245, 158, 11, 0.08)", highlight: true },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BranchTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "10px 14px",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div style={{ color: "var(--muted)", fontSize: "12px", marginBottom: "3px", fontWeight: "600" }}>{label}</div>
        <div style={{ color: "#f59e0b", fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800" }}>
          KD {payload[0].value.toFixed(3)}
        </div>
      </div>
    );
  }
  return null;
};

export default function ReportsPage() {
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
          Sales Reports
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>
          Sales analytics and business intelligence across all branches · May 2026
        </p>
      </div>

      {/* Metric cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {reportMetrics.map((m, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "20px 22px",
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
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "var(--muted)",
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  background: m.bg,
                  borderRadius: "10px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: m.icon.props.color,
                  border: `1px solid ${m.icon.props.color}22`,
                }}
              >
                {m.icon}
              </div>
            </div>
            <div
              style={{
                color: m.highlight ? "#f59e0b" : "var(--text)",
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
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
          marginBottom: "24px",
        }}
      >
        {/* Branch bar chart */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "24px 26px",
          }}
        >
          <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", marginBottom: "3px" }}>
            Branch-wise Revenue
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "20px", fontWeight: "500" }}>
            Total sales by branch this month
          </p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={branchData} barSize={38} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="reportsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(28, 25, 23, 0.04)" vertical={false} />
              <XAxis
                dataKey="branch"
                tick={{ fill: "var(--muted)", fontSize: 11, fontWeight: "600" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--muted)", fontSize: 11, fontWeight: "600" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}`}
              />
              <Tooltip content={<BranchTooltip />} cursor={{ fill: "rgba(28, 25, 23, 0.03)" }} />
              <Bar dataKey="sales" fill="url(#reportsGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category donut */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "24px 26px",
          }}
        >
          <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", marginBottom: "3px" }}>
            Category Split
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "16px", fontWeight: "500" }}>
            Revenue share by category
          </p>
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="44%"
                innerRadius={54}
                outerRadius={78}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="var(--surface)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, "Share"]}
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text)",
                  fontFamily: "var(--font-sans)",
                  boxShadow: "var(--shadow-md)",
                }}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: "var(--muted)", fontSize: "12px", fontWeight: "600", fontFamily: "var(--font-sans)" }}>
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
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700" }}>
            Daily Sales Breakdown
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "3px", fontWeight: "500" }}>
            Last 7 days performance across all branches
          </p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--surface-muted)" }}>
                {["Date", "Orders", "Revenue", "Avg Order Value"].map((h) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {dailySales.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: i < dailySales.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(28, 25, 23, 0.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <td style={{ padding: "16px 24px", color: "var(--text)", fontSize: "14px", fontWeight: "600" }}>
                    {row.date}
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--text)", fontSize: "14px", fontWeight: "500" }}>
                    {row.orders}
                  </td>
                  <td style={{ padding: "16px 24px", color: "#f59e0b", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "800" }}>
                    KD {row.revenue.toFixed(3)}
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--muted)", fontSize: "14px", fontWeight: "500" }}>
                    KD {parseFloat(row.avg).toFixed(3)}
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
