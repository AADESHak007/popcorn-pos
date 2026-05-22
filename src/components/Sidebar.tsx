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

/* ── Inline SVG icons ── */

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

  const allowedNavItems = navItems.filter(item => {
    if (role === "SUPER ADMIN") return true;
    if (role === "HEAD OFFICE ADMIN") return item.id !== "pos";
    if (role === "BRANCH MANAGER") return item.id !== "branches";
    if (role === "BRANCH STAFF") return item.id === "pos";
    if (role === "COMMISSARY MANAGER") return item.id === "inventory" || item.id === "stock-transfer" || item.id === "reports";
    return true;
  });
  return (
    <aside
      style={{
        background: "#ffffff",
        width: "240px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #e5e7eb",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
      }}
    >
      {/* ── Logo ── */}
      <div style={{ padding: "24px 20px 18px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
          <div
            style={{
              background: "#f59e0b",
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
            <Popcorn size={21} />
          </div>
          <div>
            <div style={{ color: "#f59e0b", fontWeight: "800", fontSize: "15px", letterSpacing: "-0.3px", lineHeight: 1.2 }}>
              Popcorn Place KW
            </div>
            <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: "500", marginTop: "1px" }}>
              POS System
            </div>
          </div>
        </div>
      </div>

      {/* ── Active Branch ── */}
      <div style={{ padding: "14px 14px 6px" }}>
        <div
          style={{
            background: "#f3f4f6",
            borderRadius: "8px",
            padding: "10px 13px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ color: "#6b7280", fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "2px" }}>
            Location
          </div>
          <div style={{ color: "#111827", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {user?.location || "Head Office"}
            <span style={{ color: "#6b7280", fontSize: "11px" }}>▾</span>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav style={{ padding: "10px 10px", flex: 1, overflowY: "auto" }}>
        <div style={{ color: "#6b7280", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.8px", padding: "4px 8px 8px" }}>
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
                padding: "9px 11px",
                borderRadius: "8px",
                marginBottom: "2px",
                border: "none",
                cursor: "pointer",
                background: isActive ? "#f59e0b" : "transparent",
                color: isActive ? "#ffffff" : "#6b7280",
                fontWeight: isActive ? "600" : "400",
                fontSize: "13.5px",
                textAlign: "left",
                transition: "all 0.12s ease",
              }}
            >
              <span style={{ opacity: isActive ? 1 : 0.7, flexShrink: 0 }}>
                <Icon size={17} />
              </span>
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span
                  style={{
                    background: isActive ? "#ffffff" : "#f59e0b",
                    color: isActive ? "#f59e0b" : "#ffffff",
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
      <div style={{ padding: "12px 14px", borderTop: "1px solid #e5e7eb" }}>
        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: user?.color || "#e5e7eb",
              border: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: user?.color ? "#ffffff" : "#f59e0b",
              fontWeight: "800",
              fontSize: "14px",
              flexShrink: 0,
            }}
          >
            {user?.initials || "SA"}
          </div>
          <div style={{ minWidth: 0, overflow: "hidden" }}>
            <div style={{ color: "#111827", fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              {user?.name || "Super Admin"}
            </div>
            <div style={{ color: "#6b7280", fontSize: "10px", fontWeight: "600", letterSpacing: "0.2px" }}>
              {user?.role || "SUPER ADMIN"}
            </div>
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
            border: "1px solid #e5e7eb",
            cursor: "pointer",
            background: "transparent",
            color: "#6b7280",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
