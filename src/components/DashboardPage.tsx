"use client";
import { CircleDollarSign, Package, AlertTriangle, FileText, ArrowRightLeft, CreditCard, Percent, Calendar, RefreshCw, ChevronDown, TrendingUp, BarChart3, Users, Receipt, ArrowUp, ArrowDown } from "lucide-react";
import { cardStyles } from "@/lib/ui";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const salesOverviewData = [
  { day: "1 May", thisMonth: 120000, lastMonth: 90000 },
  { day: "6 May", thisMonth: 140000, lastMonth: 100000 },
  { day: "11 May", thisMonth: 160000, lastMonth: 110000 },
  { day: "16 May", thisMonth: 210000, lastMonth: 130000 },
  { day: "18 May", thisMonth: 312540, lastMonth: 150000 },
];

const salesByBranchData = [
  { branch: "Salmiya", sales: 42568.750, vsLastMonth: 6.4, vsBudget: 5.2, transactions: 520, aov: 5.46 },
  { branch: "Al Rai", sales: 39125.300, vsLastMonth: 11.8, vsBudget: 6.5, transactions: 470, aov: 5.52 },
  { branch: "Fahaheel", sales: 28964.250, vsLastMonth: 3.5, vsBudget: -2.1, transactions: 310, aov: 5.76 },
  { branch: "Avenues", sales: 26450.800, vsLastMonth: -5.5, vsBudget: 1.2, transactions: 235, aov: 5.32 },
  { branch: "Sabah Al Salem", sales: 15420.000, vsLastMonth: -9.3, vsBudget: -3.3, transactions: 265, aov: 5.47 },
];

const hourlySalesData = [
  { hour: "12 AM", thisMonth: 5000, lastMonth: 4000 },
  { hour: "4 AM", thisMonth: 2000, lastMonth: 1500 },
  { hour: "8 AM", thisMonth: 10000, lastMonth: 9000 },
  { hour: "12 PM", thisMonth: 15000, lastMonth: 14000 },
  { hour: "4 PM", thisMonth: 25000, lastMonth: 22000 },
  { hour: "8 PM", thisMonth: 35000, lastMonth: 30000 },
  { hour: "11 PM", thisMonth: 12000, lastMonth: 10000 },
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
  { name: "Caramel Popcorn (Large)", category: "Popcorn", orders: 342, vsLastMonth: 13.5, vsBudget: 8.1, revenue: 28480.750 },
  { name: "Cheese Popcorn (Large)", category: "Popcorn", orders: 289, vsLastMonth: 11.3, vsBudget: 7.3, revenue: 21372.000 },
  { name: "Combo 1", category: "Combos", orders: 256, vsLastMonth: 9.5, vsBudget: -6.2, revenue: 17846.000 },
  { name: "Iced Coffee (Large)", category: "Beverages", orders: 198, vsLastMonth: 7.7, vsBudget: 4.1, revenue: 14568.000 },
  { name: "Chocolate Box (Large)", category: "Confections", orders: 187, vsLastMonth: 6.5, vsBudget: 3.8, revenue: 12355.000 },
];

const slowMovers = [
  { name: "Rainbow Candy", category: "Confections", revenue: 112000, vsLastMonth: -19.4, vsBudget: -14.2 },
  { name: "Butter Toffee", category: "Confections", revenue: 142000, vsLastMonth: -12.5, vsBudget: -9.3 },
  { name: "Vanilla Wafers", category: "Confections", revenue: 98500, vsLastMonth: -8.2, vsBudget: -6.1 },
  { name: "Strawberry Syrup", category: "Beverages", revenue: 156200, vsLastMonth: -6.7, vsBudget: -4.8 },
  { name: "Lemonade (Bottle)", category: "Beverages", revenue: 173800, vsLastMonth: -4.2, vsBudget: -2.9 },
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
      { label: "Total Sales (MTD)", value: "KWD 312,540.200", sub: "+8.4% vs Last Month", up: true, icon: <BarChart3 size={20} />, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)" },
      { label: "Total Sales (YTD)", value: "KWD 1,785,620.750", sub: "+15.2% vs Last Year", up: true, icon: <CircleDollarSign size={20} />, color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
      { label: "Gross Profit (MTD)", value: "KWD 98,765.300", sub: "+6.9% vs Last Month", up: true, icon: <Percent size={20} />, color: "#f97316", bg: "rgba(249, 115, 22, 0.1)" },
      { label: "Total Transactions (MTD)", value: "2,350", sub: "+9.1% vs Last Month", up: true, icon: <Receipt size={20} />, color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" },
      { label: "Avg. Order Value (MTD)", value: "KWD 5.47", sub: "+3.2% vs Last Month", up: true, icon: <FileText size={20} />, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)" },
    ];

  const chartData = isBranch ? branchWeeklyData : salesOverviewData;
  const chartTitle = isBranch ? "Branch Weekly Sales" : "Sales Overview";
  const chartSubtitle = isBranch ? "Revenue for this location · This week" : "Comparing actual sales against previous periods";

  return (
    <div className="page-wrap">
      <div className="page-header" style={{ alignItems: "center" }}>
        <div>
          <h1 className="page-title">{isBranch ? `${branchShortName} Branch Dashboard` : "Owner Dashboard"}</h1>
          <p className="page-subtitle">
            Live overview of your business
          </p>
        </div>

        {!isBranch && (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--surface)", padding: "8px 16px", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
              <Calendar size={16} color="var(--muted)" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "10px", color: "var(--muted)", fontWeight: "600", textTransform: "uppercase" }}>Time Period</span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "14px", fontWeight: "700" }}>
                  MTD <ChevronDown size={14} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--surface)", padding: "8px 16px", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
              <ArrowRightLeft size={16} color="var(--muted)" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "10px", color: "var(--muted)", fontWeight: "600", textTransform: "uppercase" }}>Compare With</span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "14px", fontWeight: "700" }}>
                  Last Month <ChevronDown size={14} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--surface)", padding: "8px 16px", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
              <Calendar size={16} color="var(--muted)" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "10px", color: "var(--muted)", fontWeight: "600", textTransform: "uppercase" }}>Date Range</span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "14px", fontWeight: "700" }}>
                  01 May 2026 - 18 May 2026 <ChevronDown size={14} />
                </div>
              </div>
            </div>

            <button className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px" }}>
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        )}

        {isBranch && (
          <span className="status-chip" style={{ background: "var(--surface-muted)", color: "var(--amber)", fontWeight: "700" }}>
            {locationName}
          </span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isBranch ? "repeat(4, 1fr)" : "repeat(5, 1fr)", gap: "20px", marginBottom: "28px" }}>
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
            <div style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "800", letterSpacing: "-0.5px", marginBottom: "8px" }}>
              {m.value}
            </div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: m.up ? "#10b981" : "#ef4444", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: m.up ? "#10b981" : "#ef4444" }} />
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isBranch ? "1fr 340px" : "1fr", gap: "20px", marginBottom: "28px" }}>
        <div className="card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
            <div>
              <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0 }}>{chartTitle}</h2>
              <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>{chartSubtitle}</p>
            </div>
            {!isBranch ? (
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--surface-muted)", padding: "6px 12px", borderRadius: "var(--radius-md)", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                  MTD <ChevronDown size={14} />
                </div>
              </div>
            ) : (
              <span style={{ background: "var(--surface-muted)", borderRadius: "var(--radius-pill)", padding: "6px 14px", fontSize: "11px", fontWeight: "700", color: "var(--muted)" }}>
                MAY 2026
              </span>
            )}
          </div>
          <ResponsiveContainer width="100%" height={260}>
            {isBranch ? (
              <BarChart data={branchWeeklyData} barSize={36} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
            ) : (
              <LineChart data={salesOverviewData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.04)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "var(--muted)", fontSize: 11, fontWeight: "600" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted)", fontSize: 11, fontWeight: "600" }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '600' }} />
                <Line type="monotone" dataKey="thisMonth" name="This Month" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="lastMonth" name="Last Month" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {isBranch && (
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
        )}
      </div>

      {!isBranch && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "28px" }}>
          <div className="card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
              <div>
                <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0 }}>Sales by Branch (MTD)</h2>
              </div>
            </div>
            <div className="table-wrap" style={{ flex: 1 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Actual Sales</th>
                    <th>vs Last Month</th>
                    <th>vs Budget</th>
                    <th>Txns</th>
                  </tr>
                </thead>
                <tbody>
                  {salesByBranchData.map((b, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--text)", fontWeight: "600" }}>{b.branch}</td>
                      <td style={{ fontWeight: "700" }}>{b.sales.toFixed(3)}</td>
                      <td>
                        <span style={{ color: b.vsLastMonth >= 0 ? "#10b981" : "#ef4444", fontWeight: "600", fontSize: "13px", display: "flex", alignItems: "center", gap: "2px" }}>
                          {b.vsLastMonth >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                          {Math.abs(b.vsLastMonth)}%
                        </span>
                      </td>
                      <td>
                        <span style={{ color: b.vsBudget >= 0 ? "#10b981" : "#ef4444", fontWeight: "600", fontSize: "13px", display: "flex", alignItems: "center", gap: "2px" }}>
                          {b.vsBudget >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                          {Math.abs(b.vsBudget)}%
                        </span>
                      </td>
                      <td style={{ color: "var(--muted)", fontWeight: "600" }}>{b.transactions}</td>
                    </tr>
                  ))}
                  <tr style={{ background: "var(--surface-muted)" }}>
                    <td style={{ fontWeight: "800" }}>Total</td>
                    <td style={{ fontWeight: "800" }}>195,604.700</td>
                    <td><span style={{ color: "#10b981", fontWeight: "700", fontSize: "13px" }}>+8.4%</span></td>
                    <td><span style={{ color: "#10b981", fontWeight: "700", fontSize: "13px" }}>+3.6%</span></td>
                    <td style={{ fontWeight: "700" }}>2,350</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                  <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0, whiteSpace: "nowrap" }}>Sales Summary (MTD)</h2>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text)", fontWeight: "600", fontSize: "13px", whiteSpace: "nowrap" }}>Actual Sales</span>
                  <span style={{ fontWeight: "800", fontSize: "14px", whiteSpace: "nowrap" }}>KWD 312,540.200</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text)", fontWeight: "600", fontSize: "13px" }}>Budget</span>
                  <span style={{ fontWeight: "800", fontSize: "14px", whiteSpace: "nowrap" }}>KWD 340,000.000</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "4px" }}>
                  <span style={{ color: "var(--text)", fontWeight: "600", fontSize: "13px" }}>Variance</span>
                  <span style={{ color: "#ef4444", fontWeight: "800", fontSize: "13px", display: "flex", alignItems: "center", gap: "2px", whiteSpace: "nowrap" }}>
                    <ArrowDown size={14} /> KWD 27,459.800 (-8.1%)
                  </span>
                </div>
              </div>

              <div style={{ marginTop: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--text)", fontWeight: "700", fontSize: "13px", whiteSpace: "nowrap" }}>Budget Achieved</span>
                  <span style={{ fontWeight: "800", fontSize: "13px" }}>91.9%</span>
                </div>
                <div style={{ width: "100%", height: "8px", background: "var(--surface-muted)", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{ width: "91.9%", height: "100%", background: "#10b981", borderRadius: "99px" }} />
                </div>
              </div>
            </div>
        </div>
      )}

      {/* ── Row 3: Product Performance + Hourly Trend (owner) ── */}
      {!isBranch ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
          {/* Top 5 Products */}
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={cardStyles.sectionHeader}>
              <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", margin: 0 }}>Product Performance (MTD)</h2>
              <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px", fontWeight: "500" }}>Top 5 selling products</p>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Sales (KWD)</th>
                    <th>vs LM</th>
                    <th>vs Budget</th>
                  </tr>
                </thead>
                <tbody>
                  {topItems.map((item, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--text)", fontWeight: "600", fontSize: "13px" }}>{item.name}</td>
                      <td>
                        <span style={{ background: "var(--amber-soft)", color: "var(--amber)", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "var(--radius-pill)", whiteSpace: "nowrap" }}>
                          {item.category}
                        </span>
                      </td>
                      <td style={{ fontWeight: "700", fontSize: "13px" }}>{(item.revenue / 1000).toFixed(3)}</td>
                      <td>
                        <span style={{ color: item.vsLastMonth >= 0 ? "#10b981" : "#ef4444", fontWeight: "600", fontSize: "12px", display: "flex", alignItems: "center", gap: "2px" }}>
                          {item.vsLastMonth >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{Math.abs(item.vsLastMonth)}%
                        </span>
                      </td>
                      <td>
                        <span style={{ color: item.vsBudget >= 0 ? "#10b981" : "#ef4444", fontWeight: "600", fontSize: "12px", display: "flex", alignItems: "center", gap: "2px" }}>
                          {item.vsBudget >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{Math.abs(item.vsBudget)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ borderTop: "1px solid var(--border)", padding: "14px 24px" }}>
              <p style={{ color: "var(--muted)", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>Slow Moving Products (Bottom 5)</p>
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Sales (KWD)</th>
                      <th>vs LM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slowMovers.map((item, i) => (
                      <tr key={i}>
                        <td style={{ color: "var(--text)", fontWeight: "600", fontSize: "13px" }}>{item.name}</td>
                        <td>
                          <span style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "var(--radius-pill)", whiteSpace: "nowrap" }}>
                            {item.category}
                          </span>
                        </td>
                        <td style={{ fontWeight: "700", fontSize: "13px" }}>{(item.revenue / 1000).toFixed(3)}</td>
                        <td>
                          <span style={{ color: "#ef4444", fontWeight: "600", fontSize: "12px", display: "flex", alignItems: "center", gap: "2px" }}>
                            <ArrowDown size={12} />{Math.abs(item.vsLastMonth)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Hourly Sales Trend */}
          <div className="card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
              <div>
                <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", margin: 0 }}>Hourly Sales Trend (MTD)</h2>
                <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px", fontWeight: "500" }}>Average sales volume by hour of day</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--surface-muted)", padding: "6px 12px", borderRadius: "var(--radius-md)", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                  MTD <ChevronDown size={14} />
                </div>
              </div>
            </div>

            <div style={{ flex: 1, minHeight: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlySalesData} barGap={4} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="hourGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="hourGradLast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.04)" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fill: "var(--muted)", fontSize: 10, fontWeight: "600" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--muted)", fontSize: 10, fontWeight: "600" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: '600' }} />
                  <Bar dataKey="thisMonth" name="This Month" fill="url(#hourGrad)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="lastMonth" name="Last Month" fill="url(#hourGradLast)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
              <div style={{ flex: 1, background: "var(--surface-muted)", borderRadius: "var(--radius-md)", padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(79,70,229,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TrendingUp size={18} color="#4f46e5" />
                </div>
                <div>
                  <div style={{ color: "var(--muted)", fontSize: "11px", fontWeight: "600", textTransform: "uppercase" }}>Peak Hour</div>
                  <div style={{ color: "var(--text)", fontWeight: "800", fontSize: "15px" }}>7 PM – 9 PM</div>
                </div>
              </div>
              <div style={{ flex: 1, background: "var(--surface-muted)", borderRadius: "var(--radius-md)", padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(249,115,22,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BarChart3 size={18} color="var(--amber)" />
                </div>
                <div>
                  <div style={{ color: "var(--muted)", fontSize: "11px", fontWeight: "600", textTransform: "uppercase" }}>Peak Sales (MTD)</div>
                  <div style={{ color: "var(--text)", fontWeight: "800", fontSize: "15px" }}>KWD 38,750</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Branch: original top items + transfers */
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px", flex: 1 }}>
          <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={cardStyles.sectionHeader}>
              <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0 }}>Branch Top Items</h2>
              <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>Best performers this week</p>
            </div>
            <div className="table-wrap" style={{ flex: 1 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    {["Rank", "Item Name", "Category", "Orders"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
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
                      <td style={{ color: "var(--text-secondary)", fontWeight: "500" }}>{Math.floor(item.orders / 5)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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
                    <span style={{ color: stn.status === "Delivered" ? "#10b981" : "#3b82f6", fontWeight: "800", fontSize: "10px", background: stn.status === "Delivered" ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.1)", padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>
                      {stn.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "6px", fontWeight: "500" }}>From: {stn.from}</div>
                  <div style={{ color: "var(--text)", fontSize: "14px", fontWeight: "700" }}>{stn.item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Row 4: Alerts & Notifications banner (owner only) ── */}
      {!isBranch && (
        <div className="card" style={{ padding: "28px", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", margin: 0 }}>Alerts &amp; Notifications</h2>
            <button className="btn-ghost" style={{ fontSize: "13px", fontWeight: "700", color: "var(--amber)", padding: "6px 14px" }}>View All Alerts →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
            {[
              { label: "Low Stock Items", count: 23, sub: "23 items", color: "#f97316", bg: "rgba(249,115,22,0.1)", icon: <AlertTriangle size={22} color="#f97316" /> },
              { label: "Out of Stock Items", count: 7, sub: "7 items", color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: <Package size={22} color="#ef4444" /> },
              { label: "Price Changes", count: 3, sub: "3 items", color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: <Receipt size={22} color="#10b981" /> },
              { label: "Branch Transfers", count: 2, sub: "2 in transit", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: <ArrowRightLeft size={22} color="#3b82f6" /> },
              { label: "B2B Payments Due", count: 1, sub: "1 payment", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", icon: <CreditCard size={22} color="#8b5cf6" /> },
            ].map((alert, i) => (
              <div key={i} style={{ background: "var(--surface-muted)", borderRadius: "var(--radius-md)", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: alert.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {alert.icon}
                </div>
                <div>
                  <div style={{ color: "var(--text)", fontWeight: "800", fontSize: "24px", fontFamily: "var(--font-display)", lineHeight: 1 }}>{alert.count}</div>
                  <div style={{ color: "var(--text)", fontWeight: "600", fontSize: "14px", marginTop: "4px" }}>{alert.label}</div>
                  <div style={{ color: "var(--muted)", fontSize: "12px", marginTop: "2px" }}>{alert.sub}</div>
                </div>
                <button className="btn-ghost" style={{ fontSize: "12px", fontWeight: "700", color: alert.color, padding: "4px 0", textAlign: "left" }}>View Details</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
