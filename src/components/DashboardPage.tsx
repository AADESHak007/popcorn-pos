"use client";
import { CircleDollarSign, Package, AlertTriangle, FileText, ArrowRightLeft, CreditCard, Percent } from "lucide-react";
import { cardStyles } from "@/lib/ui";
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
      <div style={{ ...cardStyles.base, padding: "12px 16px", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ color: "var(--muted)", fontSize: "12px", marginBottom: "4px", fontWeight: "600" }}>{label}</div>
        <div style={{ color: "var(--amber)", fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "800" }}>
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
  const branchShortName = locationName.split(" ")[0];

  let displayedAlerts = isBranch ? stockAlerts.filter((a) => a.branch.includes(branchShortName)) : stockAlerts;
  if (displayedAlerts.length === 0 && isBranch) {
    displayedAlerts = [{ item: "Paper Cups (M)", branch: branchShortName, stock: "50 pcs", level: "low" }];
  }

  const metrics = isBranch
    ? [
        { label: "Today's Sales", value: "KD 196.000", sub: "+5.2% vs yesterday", up: true, icon: <CircleDollarSign size={20} />, color: "#f97316", bg: "var(--amber-soft)" },
        { label: "Today's Orders", value: "42", sub: "+2.1% vs yesterday", up: true, icon: <Package size={20} />, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)" },
        { label: "Stock Alerts", value: displayedAlerts.length.toString(), sub: "Requires attention", up: false, icon: <AlertTriangle size={20} />, color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" },
        { label: "Cash in Drawer", value: "KD 85.500", sub: "Expected cash", up: true, icon: <CreditCard size={20} />, color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
      ]
    : [
        { label: "Global Sales", value: "KD 2,840.000", sub: "+12.4% vs yesterday", up: true, icon: <CircleDollarSign size={20} />, color: "#f97316", bg: "var(--amber-soft)" },
        { label: "Global Orders", value: "138", sub: "+8.2% vs yesterday", up: true, icon: <Package size={20} />, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)" },
        { label: "HO Stock Alerts", value: "4", sub: "Global shortages", up: false, icon: <AlertTriangle size={20} />, color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" },
        { label: "Overall COGS %", value: "32.5%", sub: "Healthy margin", up: true, icon: <Percent size={20} />, color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
      ];

  const chartData = isBranch ? branchWeeklyData : weeklyData;
  const chartTitle = isBranch ? "Branch Weekly Sales" : "Global Weekly Sales";
  const chartSubtitle = isBranch ? "Revenue for this location · This week" : "Revenue across all branches · This week";

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div>
          <h1 className="page-title">{isBranch ? `${branchShortName} Branch Dashboard` : "Head Office Dashboard"}</h1>
          <p className="page-subtitle">
            Welcome back, <span style={{ color: "var(--text)", fontWeight: "700" }}>{user?.name || "Yousef Al-Anjari"}</span> · Thursday, 22 May 2026
          </p>
        </div>
        <span className="status-chip" style={{ background: "var(--surface-muted)", color: "var(--amber)", fontWeight: "700" }}>
          {locationName}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "28px" }}>
        {metrics.map((m, i) => (
          <div key={i} className="metric-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>
                {m.label}
              </div>
              <div
                style={{
                  background: m.bg,
                  borderRadius: "12px",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: m.color,
                }}
              >
                {m.icon}
              </div>
            </div>
            <div style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px", marginBottom: "8px" }}>
              {m.value}
            </div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: m.up ? "#10b981" : "#ef4444", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: m.up ? "#10b981" : "#ef4444" }} />
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", marginBottom: "28px" }}>
        <div className="card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
            <div>
              <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0 }}>{chartTitle}</h2>
              <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>{chartSubtitle}</p>
            </div>
            <span style={{ background: "var(--surface-muted)", borderRadius: "var(--radius-pill)", padding: "6px 14px", fontSize: "11px", fontWeight: "700", color: "var(--muted)" }}>
              MAY 2026
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barSize={36} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.04)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "var(--muted)", fontSize: 11, fontWeight: "600" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--muted)", fontSize: 11, fontWeight: "600" }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-muted)" }} />
              <Bar dataKey="sales" fill="url(#salesGrad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px" }}>
            <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0 }}>Stock Alerts</h2>
            <span style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", fontSize: "11px", fontWeight: "800", padding: "4px 12px", borderRadius: "var(--radius-pill)" }}>
              {displayedAlerts.length} active
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {displayedAlerts.map((a, i) => {
              const isCritical = a.level === "critical";
              return (
                <div key={i} style={{ background: "var(--surface-muted)", borderRadius: "var(--radius-md)", padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ color: "var(--text)", fontSize: "14px", fontWeight: "700" }}>{a.item}</div>
                      <div style={{ color: "var(--muted)", fontSize: "12px", marginTop: "4px", fontWeight: "500" }}>
                        {!isBranch && a.branch}
                        {isBranch && "Current Branch"}
                      </div>
                    </div>
                    <span
                      style={{
                        background: isCritical ? "rgba(239, 68, 68, 0.1)" : "var(--amber-soft)",
                        color: isCritical ? "#ef4444" : "var(--amber)",
                        fontSize: "11px",
                        fontWeight: "800",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-pill)",
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

      <div style={{ display: "grid", gridTemplateColumns: isBranch ? "1fr 1fr" : "2fr 1fr", gap: "20px", flex: 1 }}>
        <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={cardStyles.sectionHeader}>
            <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0 }}>
              {isBranch ? "Branch Top Items" : "Global Top Selling Items"}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>Best performers this week</p>
          </div>
          <div className="table-wrap" style={{ flex: 1 }}>
            <table className="data-table">
              <thead>
                <tr>
                  {["Rank", "Item Name", "Category", "Orders"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                  {!isBranch && <th>Revenue</th>}
                </tr>
              </thead>
              <tbody>
                {topItems.map((item, i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--muted)", fontWeight: "700" }}>#{i + 1}</td>
                    <td style={{ color: "var(--text)", fontWeight: "600" }}>{item.name}</td>
                    <td>
                      <span style={{ background: "var(--amber-soft)", color: "var(--amber)", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-secondary)", fontWeight: "500" }}>{isBranch ? Math.floor(item.orders / 5) : item.orders}</td>
                    {!isBranch && (
                      <td style={{ color: "var(--amber)", fontFamily: "var(--font-display)", fontWeight: "800" }}>KD {item.revenue.toFixed(3)}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {!isBranch ? (
          <div className="card" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ ...cardStyles.sectionHeader, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0 }}>Purchase Orders</h2>
                <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>Supplier procurement</p>
              </div>
              <FileText size={22} color="var(--amber)" />
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {purchaseOrders.map((po, i) => (
                <div key={i} style={{ padding: "18px", background: "var(--surface-muted)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: "700", color: "var(--text)", fontSize: "14px" }}>{po.id}</span>
                    <span
                      style={{
                        color: po.status === "Delivered" ? "#10b981" : "var(--amber)",
                        fontWeight: "800",
                        fontSize: "10px",
                        background: po.status === "Delivered" ? "rgba(16, 185, 129, 0.1)" : "var(--amber-soft)",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-pill)",
                      }}
                    >
                      {po.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "8px", fontWeight: "500" }}>{po.supplier}</div>
                  <div style={{ color: "var(--amber)", fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800" }}>KD {po.amount.toFixed(3)}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ ...cardStyles.sectionHeader, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0 }}>Stock Transfers</h2>
                <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>Recent STNs for this branch</p>
              </div>
              <ArrowRightLeft size={22} color="var(--amber)" />
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {recentTransfers.map((stn, i) => (
                <div key={i} style={{ padding: "18px", background: "var(--surface-muted)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: "700", color: "var(--text)", fontSize: "14px" }}>{stn.id}</span>
                    <span
                      style={{
                        color: stn.status === "Delivered" ? "#10b981" : "#3b82f6",
                        fontWeight: "800",
                        fontSize: "10px",
                        background: stn.status === "Delivered" ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.1)",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-pill)",
                      }}
                    >
                      {stn.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "6px", fontWeight: "500" }}>From: {stn.from}</div>
                  <div style={{ color: "var(--text)", fontSize: "14px", fontWeight: "700" }}>{stn.item}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
