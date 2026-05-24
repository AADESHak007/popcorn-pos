"use client";
import { CircleDollarSign, Package, BarChart3, Trophy } from "lucide-react";
import { cardStyles } from "@/lib/ui";
import { useTranslation } from "@/contexts/LocaleContext";
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

const PIE_COLORS = ["#fb923c", "#f97316", "#ea580c", "#8b5cf6"];

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
  { labelKey: "reports.totalRevenue", value: "2,840.000", icon: <CircleDollarSign size={20} color="#f97316" />, bg: "var(--amber-soft)", isMoney: true },
  { labelKey: "reports.totalOrders", value: "1,248", icon: <Package size={20} color="#8b5cf6" />, bg: "rgba(139, 92, 246, 0.1)" },
  { labelKey: "reports.avgOrderValue", value: "2.280", icon: <BarChart3 size={20} color="#3b82f6" />, bg: "rgba(59, 130, 246, 0.1)", isMoney: true },
  { labelKey: "reports.bestBranch", valueKey: "branchesNames.salmiya", icon: <Trophy size={20} color="#f97316" />, bg: "var(--amber-soft)", highlight: true },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BranchTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--surface)", borderRadius: "var(--radius-md)", padding: "12px 16px", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ color: "var(--muted)", fontSize: "12px", marginBottom: "4px", fontWeight: "600" }}>{label}</div>
        <div style={{ color: "var(--amber)", fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "800" }}>
          KD {payload[0].value.toFixed(3)}
        </div>
      </div>
    );
  }
  return null;
};

export default function ReportsPage() {
  const { t } = useTranslation();
  return (
    <div className="page-wrap">
      <div style={{ marginBottom: "32px" }}>
        <h1 className="page-title">{t("reports.title")}</h1>
        <p className="page-subtitle">{t("reports.subtitle")}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "28px" }}>
        {reportMetrics.map((m, i) => (
          <div key={i} className="metric-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>
                {t(m.labelKey)}
              </div>
              <div style={{ background: m.bg, borderRadius: "12px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {m.icon}
              </div>
            </div>
            <div
              style={{
                color: m.highlight ? "var(--amber)" : "var(--text)",
                fontFamily: "var(--font-display)",
                fontSize: "26px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
              }}
            >
              {"valueKey" in m ? t((m as any).valueKey) : m.isMoney ? `${t("common.currency")} ${m.value}` : m.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "28px" }}>
        <div className="card" style={{ padding: "28px" }}>
          <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: "0 0 4px" }}>{t("reports.branchRevenue")}</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "24px", fontWeight: "500" }}>{t("reports.branchRevenueSub")}</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={branchData} barSize={40} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="reportsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.04)" vertical={false} />
              <XAxis dataKey="branch" tick={{ fill: "var(--muted)", fontSize: 11, fontWeight: "600" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--muted)", fontSize: 11, fontWeight: "600" }} axisLine={false} tickLine={false} />
              <Tooltip content={<BranchTooltip />} cursor={{ fill: "var(--surface-muted)" }} />
              <Bar dataKey="sales" fill="url(#reportsGrad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: "28px" }}>
          <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: "0 0 4px" }}>{t("reports.categorySplit")}</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "20px", fontWeight: "500" }}>{t("reports.categorySplitSub")}</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="44%" innerRadius={54} outerRadius={78} paddingAngle={3} dataKey="value">
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="var(--surface)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, t("common.share")]}
                contentStyle={{
                  background: "var(--surface)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  color: "var(--text)",
                  fontFamily: "var(--font-sans)",
                  boxShadow: "var(--shadow-lg)",
                }}
              />
              <Legend formatter={(value) => <span style={{ color: "var(--muted)", fontSize: "12px", fontWeight: "600" }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={cardStyles.sectionHeader}>
          <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", margin: 0 }}>{t("reports.dailyBreakdown")}</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>{t("reports.dailyBreakdownSub")}</p>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t("reports.table.date")}</th>
                <th>{t("reports.table.orders")}</th>
                <th>{t("reports.table.revenue")}</th>
                <th>{t("reports.table.avgOrder")}</th>
              </tr>
            </thead>
            <tbody>
              {dailySales.map((row, i) => (
                <tr key={i}>
                  <td style={{ color: "var(--text)", fontWeight: "600" }}>{row.date}</td>
                  <td style={{ color: "var(--text-secondary)", fontWeight: "500" }}>{row.orders}</td>
                  <td style={{ color: "var(--amber)", fontFamily: "var(--font-display)", fontWeight: "800" }}>{t("common.currency")} {row.revenue.toFixed(3)}</td>
                  <td style={{ color: "var(--muted)", fontWeight: "500" }}>{t("common.currency")} {parseFloat(row.avg).toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
