"use client";
import { CircleDollarSign, Package, AlertTriangle, FileText, ArrowRightLeft, CreditCard, Percent } from "lucide-react";

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
          background: "var(--surface-muted)",
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
        { label: "Today's Sales", value: "KD 196.000", sub: "+5.2% vs yesterday", up: true, icon: <CircleDollarSign size={19} />, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.08)" },
        { label: "Today's Orders", value: "42", sub: "+2.1% vs yesterday", up: true, icon: <Package size={19} />, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.08)" },
        { label: "Stock Alerts", value: displayedAlerts.length.toString(), sub: "Requires attention", up: false, icon: <AlertTriangle size={19} />, color: "#ef4444", bg: "rgba(239, 68, 68, 0.08)" },
        { label: "Cash in Drawer", value: "KD 85.500", sub: "Expected cash", up: true, icon: <CreditCard size={19} />, color: "#10b981", bg: "rgba(16, 185, 129, 0.08)" },
      ]
    : [
        { label: "Global Sales", value: "KD 2,840.000", sub: "+12.4% vs yesterday", up: true, icon: <CircleDollarSign size={19} />, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.08)" },
        { label: "Global Orders", value: "138", sub: "+8.2% vs yesterday", up: true, icon: <Package size={19} />, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.08)" },
        { label: "HO Stock Alerts", value: "4", sub: "Global shortages", up: false, icon: <AlertTriangle size={19} />, color: "#ef4444", bg: "rgba(239, 68, 68, 0.08)" },
        { label: "Overall COGS %", value: "32.5%", sub: "Healthy margin", up: true, icon: <Percent size={19} />, color: "#10b981", bg: "rgba(16, 185, 129, 0.08)" },
      ];

  const chartData = isBranch ? branchWeeklyData : weeklyData;
  const chartTitle = isBranch ? "Branch Weekly Sales" : "Global Weekly Sales";
  const chartSubtitle = isBranch ? "Revenue for this location · This week" : "Revenue across all branches · This week";

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
            {isBranch ? `${branchShortName} Branch Dashboard` : "Head Office Dashboard"}
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>
            Welcome back, <span style={{ color: "var(--text)", fontWeight: "700" }}>{user?.name || "Yousef Al-Anjari"}</span> · Thursday, 22 May 2026
          </p>
        </div>
        <div
          style={{
            background: "rgba(28, 25, 23, 0.04)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "8px 16px",
            color: "#f59e0b",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.5px",
          }}
        >
          {locationName.toUpperCase()}
        </div>
      </div>

      {/* Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {metrics.map((m, i) => (
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
                  color: m.color,
                  border: `1px solid ${m.color}22`,
                }}
              >
                {m.icon}
              </div>
            </div>
            <div
              style={{
                color: "var(--text)",
                fontFamily: "var(--font-display)",
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
                fontWeight: "600",
                color: m.up ? "#10b981" : "#ef4444",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: m.up ? "#10b981" : "#ef4444"
              }}/>
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Alerts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Weekly Bar Chart */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "24px 26px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <div>
              <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700" }}>
                {chartTitle}
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "3px", fontWeight: "500" }}>
                {chartSubtitle}
              </p>
            </div>
            <div
              style={{
                background: "rgba(28, 25, 23, 0.03)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "6px 12px",
                fontSize: "11px",
                fontWeight: "700",
                color: "var(--muted)",
                letterSpacing: "0.2px",
              }}
            >
              MAY 2026
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={chartData} barSize={34} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(28, 25, 23, 0.04)" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "var(--muted)", fontSize: 11, fontWeight: "600" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--muted)", fontSize: 11, fontWeight: "600" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(28, 25, 23, 0.03)" }} />
              <Bar dataKey="sales" fill="url(#salesGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Alerts Panel */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700" }}>
              Stock Alerts
            </h2>
            <span
              style={{
                background: "rgba(239, 68, 68, 0.12)",
                color: "#ef4444",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                fontSize: "11px",
                fontWeight: "800",
                padding: "3px 10px",
                borderRadius: "999px",
                letterSpacing: "0.2px",
              }}
            >
              {displayedAlerts.length} ACTIVE
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {displayedAlerts.map((a, i) => {
              const isCritical = a.level === "critical";
              return (
                <div
                  key={i}
                  style={{
                    background: "rgba(28, 25, 23, 0.03)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{ color: "var(--text)", fontSize: "14px", fontWeight: "700" }}
                      >
                        {a.item}
                      </div>
                      <div style={{ color: "var(--muted)", fontSize: "11px", marginTop: "3px", fontWeight: "500" }}>
                        {!isBranch && a.branch}
                        {isBranch && "Current Branch"}
                      </div>
                    </div>
                    <span
                      style={{
                        background: isCritical ? "rgba(239, 68, 68, 0.1)" : "rgba(245, 158, 11, 0.1)",
                        color: isCritical ? "#ef4444" : "#f59e0b",
                        border: isCritical ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid rgba(245, 158, 11, 0.2)",
                        fontSize: "11px",
                        fontWeight: "800",
                        padding: "3px 9px",
                        borderRadius: "6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {a.stock}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conditional Bottom Row: Top Items & POs (for HO) OR Transfers (for Branch) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isBranch ? "1fr 1fr" : "2fr 1fr",
          gap: "16px",
          flex: 1,
        }}
      >
        {/* Top Items Table */}
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
          <div style={{ padding: "24px 26px", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700" }}>
              {isBranch ? "Branch Top Items" : "Global Top Selling Items"}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "3px", fontWeight: "500" }}>
              Best performers this week
            </p>
          </div>
          <div style={{ overflowX: "auto", flex: 1 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--surface-muted)" }}>
                  {["Rank", "Item Name", "Category", "Orders"].map((h) => (
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
                  {!isBranch && (
                    <th
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
                      Revenue
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {topItems.map((item, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i < topItems.length - 1 ? "1px solid var(--border-subtle)" : "none",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(28, 25, 23, 0.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <td style={{ padding: "16px 24px", color: "var(--muted)", fontSize: "13px", fontWeight: "700" }}>
                      #{i + 1}
                    </td>
                    <td style={{ padding: "16px 24px", color: "var(--text)", fontSize: "14px", fontWeight: "600" }}>
                      {item.name}
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <span
                        style={{
                          background: "rgba(245, 158, 11, 0.1)",
                          color: "#f59e0b",
                          border: "1px solid rgba(245, 158, 11, 0.2)",
                          fontSize: "11px",
                          fontWeight: "700",
                          padding: "3px 9px",
                          borderRadius: "6px",
                        }}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px", color: "var(--text)", fontSize: "14px", fontWeight: "500" }}>
                      {isBranch ? Math.floor(item.orders / 5) : item.orders}
                    </td>
                    {!isBranch && (
                      <td style={{ padding: "16px 24px", color: "#f59e0b", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "800" }}>
                        KD {item.revenue.toFixed(3)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Panel 2: Purchase Orders (HO) OR Stock Transfers (Branch) */}
        {!isBranch ? (
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
            <div style={{ padding: "24px 26px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700" }}>Purchase Orders</h2>
                <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "3px", fontWeight: "500" }}>Supplier procurement</p>
              </div>
              <FileText size={20} color="#f59e0b" />
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {purchaseOrders.map((po, i) => (
                <div
                  key={i}
                  style={{
                    padding: "16px",
                    background: "rgba(28, 25, 23, 0.03)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: "700", color: "var(--text)", fontSize: "14px" }}>{po.id}</span>
                    <span style={{
                      color: po.status === "Delivered" ? "#10b981" : "#f59e0b",
                      fontWeight: "800",
                      fontSize: "11px",
                      letterSpacing: "0.2px",
                      background: po.status === "Delivered" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                      border: po.status === "Delivered" ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(245, 158, 11, 0.2)",
                      padding: "2px 8px",
                      borderRadius: "5px"
                    }}>{po.status.toUpperCase()}</span>
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "12px", marginBottom: "8px", fontWeight: "500" }}>{po.supplier}</div>
                  <div style={{ color: "#f59e0b", fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "800" }}>KD {po.amount.toFixed(3)}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
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
            <div style={{ padding: "24px 26px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700" }}>Stock Transfers</h2>
                <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "3px", fontWeight: "500" }}>Recent STNs for this branch</p>
              </div>
              <ArrowRightLeft size={20} color="#f59e0b" />
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentTransfers.map((stn, i) => (
                <div
                  key={i}
                  style={{
                    padding: "16px",
                    background: "rgba(28, 25, 23, 0.03)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: "700", color: "var(--text)", fontSize: "14px" }}>{stn.id}</span>
                    <span style={{
                      color: stn.status === "Delivered" ? "#10b981" : "#3b82f6",
                      fontWeight: "800",
                      fontSize: "11px",
                      letterSpacing: "0.2px",
                      background: stn.status === "Delivered" ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.1)",
                      border: stn.status === "Delivered" ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(59, 130, 246, 0.2)",
                      padding: "2px 8px",
                      borderRadius: "5px"
                    }}>
                      {stn.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "12px", marginBottom: "6px", fontWeight: "500" }}>From: {stn.from}</div>
                  <div style={{ color: "var(--text)", fontSize: "13px", fontWeight: "700" }}>{stn.item}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
