"use client";
import { LayoutDashboard, Monitor, Package, FileText, ArrowRightLeft, Building2, LogOut, Popcorn } from "lucide-react";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

const navItems: { id: NavPage; label: string; Icon: React.ElementType; badge?: string }[] = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "pos", label: "Point of Sale", Icon: Monitor, badge: "LIVE" },
  { id: "inventory", label: "Inventory", Icon: Package },
  { id: "reports", label: "Reports", Icon: FileText },
  { id: "stock-transfer", label: "Stock Transfer", Icon: ArrowRightLeft },
  { id: "branches", label: "Branches", Icon: Building2 },
];

export default function Sidebar({ currentPage, onNavigate, user }: SidebarProps) {
  const role = user?.role || "SUPER ADMIN";

  const allowedNavItems = navItems.filter((item) => {
    if (role === "SUPER ADMIN") return true;
    if (role === "HEAD OFFICE ADMIN") return item.id !== "pos";
    if (role === "BRANCH MANAGER") return item.id !== "branches";
    if (role === "BRANCH STAFF") return item.id === "pos";
    if (role === "COMMISSARY MANAGER")
      return item.id === "inventory" || item.id === "stock-transfer" || item.id === "reports";
    return true;
  });

  return (
    <aside
      style={{
        background: "#ffffff",
        width: "248px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
      }}
    >
      <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              borderRadius: "12px",
              width: "42px",
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(217, 119, 6, 0.25)",
            }}
          >
            <Popcorn size={22} color="#ffffff" />
          </div>
          <div>
            <div
              style={{
                color: "var(--text)",
                fontFamily: "var(--font-display)",
                fontWeight: "800",
                fontSize: "15px",
                letterSpacing: "-0.3px",
                lineHeight: 1.2,
              }}
            >
              Popcorn Place KW
            </div>
            <div style={{ color: "var(--muted)", fontSize: "11px", fontWeight: "600", marginTop: "2px" }}>
              POS System
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 14px 6px" }}>
        <div
          style={{
            background: "var(--surface-muted)",
            borderRadius: "10px",
            padding: "10px 13px",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              color: "var(--muted)",
              fontSize: "9px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "3px",
            }}
          >
            Location
          </div>
          <div
            style={{
              color: "var(--text)",
              fontSize: "13px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {user?.location || "Head Office"}
            <span style={{ color: "var(--amber-light)", fontSize: "11px" }}>▾</span>
          </div>
        </div>
      </div>

      <nav style={{ padding: "10px 12px", flex: 1, overflowY: "auto" }}>
        <div
          style={{
            color: "var(--muted)",
            fontSize: "10px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            padding: "4px 8px 8px",
          }}
        >
          Navigation
        </div>
        {allowedNavItems.map(({ id, label, Icon, badge }) => {
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
                padding: "10px 12px",
                borderRadius: "10px",
                marginBottom: "4px",
                border: "none",
                cursor: "pointer",
                background: isActive
                  ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                  : "transparent",
                color: isActive ? "#ffffff" : "var(--muted)",
                fontWeight: isActive ? "600" : "500",
                fontSize: "13.5px",
                textAlign: "left",
                transition: "all 0.2s ease",
                boxShadow: isActive ? "0 4px 12px rgba(217, 119, 6, 0.22)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "var(--surface-muted)";
                  e.currentTarget.style.color = "var(--text)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--muted)";
                }
              }}
            >
              <span style={{ opacity: isActive ? 1 : 0.85, flexShrink: 0 }}>
                <Icon size={17} color={isActive ? "#ffffff" : "var(--muted)"} />
              </span>
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span
                  style={{
                    background: isActive ? "rgba(255,255,255,0.25)" : "rgba(245, 158, 11, 0.12)",
                    color: isActive ? "#ffffff" : "var(--amber)",
                    fontSize: "9px",
                    fontWeight: "800",
                    padding: "2px 6px",
                    borderRadius: "5px",
                    letterSpacing: "0.5px",
                    border: isActive ? "none" : "1px solid rgba(245, 158, 11, 0.25)",
                  }}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div
        style={{
          padding: "14px 16px",
          borderTop: "1px solid var(--border)",
          background: "var(--surface-muted)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: user?.color || "#d97706",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: "800",
              fontSize: "13px",
              flexShrink: 0,
            }}
          >
            {user?.initials || "SA"}
          </div>
          <div style={{ minWidth: 0, overflow: "hidden" }}>
            <div
              style={{
                color: "var(--text)",
                fontSize: "13px",
                fontWeight: "700",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {user?.name || "Super Admin"}
            </div>
            <div style={{ color: "var(--muted)", fontSize: "10px", fontWeight: "600" }}>
              {user?.role || "SUPER ADMIN"}
            </div>
          </div>
        </div>
        <button
          onClick={() => onNavigate("login")}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 10px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            cursor: "pointer",
            background: "#ffffff",
            color: "var(--muted)",
            fontSize: "13px",
            fontWeight: "600",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fef2f2";
            e.currentTarget.style.borderColor = "#fecaca";
            e.currentTarget.style.color = "#dc2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--surface)";
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--muted)";
          }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
