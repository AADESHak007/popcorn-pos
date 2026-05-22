"use client";

export type NavPage =
  | "dashboard"
  | "pos"
  | "inventory"
  | "reports"
  | "stock-transfer"
  | "branches";

interface SidebarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage | "login") => void;
}

/* ── Inline SVG icons ── */
const DashboardIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);
const POSIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const InventoryIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const ReportsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);
const TransferIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);
const BranchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const LogoutIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const navItems: { id: NavPage; label: string; Icon: React.FC; badge?: string }[] = [
  { id: "dashboard", label: "Dashboard", Icon: DashboardIcon },
  { id: "pos", label: "Point of Sale", Icon: POSIcon, badge: "LIVE" },
  { id: "inventory", label: "Inventory", Icon: InventoryIcon },
  { id: "reports", label: "Reports", Icon: ReportsIcon },
  { id: "stock-transfer", label: "Stock Transfer", Icon: TransferIcon },
  { id: "branches", label: "Branches", Icon: BranchIcon },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside
      style={{
        background: "#1a1208",
        width: "240px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #2a2010",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
      }}
    >
      {/* ── Logo ── */}
      <div style={{ padding: "24px 20px 18px", borderBottom: "1px solid #2a2010" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
          <div
            style={{
              background: "#FAC775",
              borderRadius: "10px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "21px",
              flexShrink: 0,
            }}
          >
            🍿
          </div>
          <div>
            <div style={{ color: "#FAC775", fontWeight: "800", fontSize: "15px", letterSpacing: "-0.3px", lineHeight: 1.2 }}>
              Popcorn Place
            </div>
            <div style={{ color: "#5a4e3a", fontSize: "11px", fontWeight: "500", marginTop: "1px" }}>
              POS System
            </div>
          </div>
        </div>
      </div>

      {/* ── Active Branch ── */}
      <div style={{ padding: "14px 14px 6px" }}>
        <div
          style={{
            background: "#221a0c",
            borderRadius: "8px",
            padding: "10px 13px",
            border: "1px solid #3a2e16",
          }}
        >
          <div style={{ color: "#5a4e3a", fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "2px" }}>
            Active Branch
          </div>
          <div style={{ color: "#ede8db", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Andheri East
            <span style={{ color: "#5a4e3a", fontSize: "11px" }}>▾</span>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav style={{ padding: "10px 10px", flex: 1, overflowY: "auto" }}>
        <div style={{ color: "#4a3e2e", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.8px", padding: "4px 8px 8px" }}>
          Navigation
        </div>
        {navItems.map(({ id, label, Icon, badge }) => {
          const isActive = currentPage === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 11px",
                borderRadius: "8px",
                marginBottom: "2px",
                border: "none",
                cursor: "pointer",
                background: isActive ? "#FAC775" : "transparent",
                color: isActive ? "#1a1208" : "#8a7d69",
                fontWeight: isActive ? "600" : "400",
                fontSize: "13.5px",
                textAlign: "left",
                transition: "all 0.12s ease",
              }}
            >
              <span style={{ opacity: isActive ? 1 : 0.7, flexShrink: 0 }}>
                <Icon />
              </span>
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span
                  style={{
                    background: isActive ? "#1a1208" : "#FAC775",
                    color: isActive ? "#FAC775" : "#1a1208",
                    fontSize: "9px",
                    fontWeight: "800",
                    padding: "2px 5px",
                    borderRadius: "4px",
                    letterSpacing: "0.3px",
                  }}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div style={{ padding: "12px 14px", borderTop: "1px solid #2a2010" }}>
        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "#2e2310",
              border: "1px solid #3a2e16",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FAC775",
              fontWeight: "800",
              fontSize: "14px",
              flexShrink: 0,
            }}
          >
            R
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: "#ede8db", fontSize: "13px", fontWeight: "600" }}>Raj Kumar</div>
            <div style={{ color: "#4a3e2e", fontSize: "11px" }}>Branch Manager</div>
          </div>
        </div>
        {/* Sign out */}
        <button
          onClick={() => onNavigate("login")}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 10px",
            borderRadius: "7px",
            border: "1px solid #2a2010",
            cursor: "pointer",
            background: "transparent",
            color: "#5a4e3a",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          <LogoutIcon />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
