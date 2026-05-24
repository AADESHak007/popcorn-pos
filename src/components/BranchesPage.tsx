"use client";
import { useTranslation } from "@/contexts/LocaleContext";

const branches = [
  { name: "Salmiya", manager: "Yousef Al-Anjari", city: "Kuwait City", sales: 840, orders: 342, stock: "OK", items: 45, rank: 1 },
  { name: "Hawally", manager: "Khaled Al-Rashidi", city: "Hawally", sales: 670, orders: 287, stock: "Low", items: 38, rank: 2 },
  { name: "Farwaniya", manager: "Bader Al-Otaibi", city: "Farwaniya", sales: 540, orders: 231, stock: "OK", items: 42, rank: 3 },
  { name: "Fahaheel", manager: "Tariq Al-Enezy", city: "Al-Ahmadi", sales: 460, orders: 195, stock: "Warning", items: 36, rank: 4 },
  { name: "Jabriya", manager: "Sara Al-Sabah", city: "Hawally", sales: 335, orders: 193, stock: "OK", items: 40, rank: 5 },
];

const stockConfig: Record<string, { bg: string; color: string; glow: string }> = {
  OK: { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981", glow: "#10b981" },
  Low: { bg: "var(--amber-soft)", color: "var(--amber)", glow: "#f97316" },
  Warning: { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444", glow: "#ef4444" },
};

const accentColors: Record<string, string> = {
  OK: "#10b981",
  Low: "#f97316",
  Warning: "#ef4444",
};

function StockBadge({ status }: { status: string }) {
  const cfg = stockConfig[status] || stockConfig.OK;
  return (
    <span
      style={{
        background: cfg.bg,
        color: cfg.color,
        fontSize: "11px",
        fontWeight: "800",
        padding: "4px 10px",
        borderRadius: "var(--radius-pill)",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        textTransform: "uppercase",
      }}
    >
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: cfg.glow, boxShadow: `0 0 6px ${cfg.glow}` }} />
      {status}
    </span>
  );
}

export default function BranchesPage() {
  const { t } = useTranslation();
  const totalSales = branches.reduce((s, b) => s + b.sales, 0);
  const totalOrders = branches.reduce((s, b) => s + b.orders, 0);

  const cityKey: Record<string, string> = {
    "Kuwait City": "branchesNames.kuwaitCity",
    Hawally: "branchesNames.hawally",
    Farwaniya: "branchesNames.farwaniya",
    "Al-Ahmadi": "branchesNames.alAhmadi",
  };

  return (
    <div className="page-wrap">
      <div style={{ marginBottom: "32px" }}>
        <h1 className="page-title">{t("branches.title")}</h1>
        <p className="page-subtitle">{t("branches.subtitle")}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "32px" }}>
        {[
          { label: t("branches.totalBranches"), value: t("branches.activeCount"), icon: "🏪", sub: t("branches.allOperational") },
          { label: t("branches.combinedRevenue"), value: `${t("common.currency")} ${totalSales.toFixed(3)}`, icon: "💰", sub: t("branches.todayAggregate") },
          { label: t("branches.combinedOrders"), value: totalOrders.toString(), icon: "📦", sub: t("branches.todaySalesCount") },
        ].map((s, i) => (
          <div key={i} className="metric-card" style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <span
              style={{
                fontSize: "24px",
                background: "var(--surface-muted)",
                borderRadius: "14px",
                width: "52px",
                height: "52px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {s.icon}
            </span>
            <div>
              <div style={{ color: "var(--muted)", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                {s.label}
              </div>
              <div style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "800", letterSpacing: "-0.3px" }}>
                {s.value}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "12px", marginTop: "2px", fontWeight: "500" }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
        {branches.map((branch, i) => (
          <div
            key={i}
            className="card card-hover"
            style={{ padding: "28px", position: "relative", overflow: "hidden" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${accentColors[branch.stock]}, transparent)`,
                borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
              }}
            />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", marginTop: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "var(--surface-muted)",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    flexShrink: 0,
                  }}
                >
                  🏪
                </div>
                <div>
                  <div style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", letterSpacing: "-0.3px" }}>
                    {t(`branchesNames.${branch.name.toLowerCase()}` as any) ?? branch.name}
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px", fontWeight: "500" }}>
                    {t(cityKey[branch.city] ?? "branchesNames.kuwaitCity")} ·{" "}
                    <span style={{ color: "var(--text-secondary)", fontWeight: "600" }}>{branch.manager}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                <span style={{ color: "#10b981", fontSize: "12px", fontWeight: "700" }}>{t("common.open")}</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "22px" }}>
              <div style={{ background: "var(--surface-muted)", borderRadius: "var(--radius-md)", padding: "14px" }}>
                <div style={{ color: "var(--muted)", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>{t("branches.sales")}</div>
                <div style={{ color: "var(--amber)", fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "800" }}>{t("common.currency")} {branch.sales.toFixed(3)}</div>
              </div>
              <div style={{ background: "var(--surface-muted)", borderRadius: "var(--radius-md)", padding: "14px" }}>
                <div style={{ color: "var(--muted)", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>{t("branches.orders")}</div>
                <div style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "800" }}>{branch.orders}</div>
              </div>
              <div style={{ background: "var(--surface-muted)", borderRadius: "var(--radius-md)", padding: "14px" }}>
                <div style={{ color: "var(--muted)", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>{t("branches.stock")}</div>
                <StockBadge status={branch.stock} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)", fontSize: "13px", fontWeight: "500" }}>{t("branches.activeSkus", { count: branch.items })}</span>
              <button className="btn-secondary" style={{ padding: "8px 16px", fontSize: "12px", fontWeight: "700", color: "var(--amber)" }}>
                {t("branches.viewFeed")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
