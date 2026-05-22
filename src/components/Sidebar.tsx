"use client";
import { LayoutDashboard, Monitor, Package, FileText, ArrowRightLeft, Building2, LogOut, Popcorn, ChevronDown } from "lucide-react";
import { sidebarWidth } from "@/lib/theme";

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
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        width: `${sidebarWidth}px`,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-sm)",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
      }}
    >
      <div style={{ padding: "28px 22px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              background: "var(--amber-gradient)",
              borderRadius: "14px",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "var(--shadow-glow)",
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
            <div style={{ color: "var(--muted)", fontSize: "11px", fontWeight: "600", marginTop: "3px" }}>
              POS System
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 18px 8px" }}>
        <div
          style={{
            background: "var(--surface-muted)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--surface-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--surface-muted)";
          }}
        >
          <div
            style={{
              color: "var(--muted)",
              fontSize: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "4px",
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
            <ChevronDown size={14} color="var(--muted)" />
          </div>
        </div>
      </div>

      <nav style={{ padding: "16px 14px", flex: 1, overflowY: "auto" }}>
        <div
          style={{
            color: "var(--muted)",
            fontSize: "10px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            padding: "0 12px 12px",
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
                gap: "12px",
                padding: "11px 14px",
                borderRadius: "var(--radius-pill)",
                marginBottom: "6px",
                border: "none",
                cursor: "pointer",
                background: isActive ? "var(--amber-soft)" : "transparent",
                color: isActive ? "var(--amber)" : "var(--muted)",
                fontWeight: isActive ? "700" : "500",
                fontSize: "14px",
                textAlign: "left",
                transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isActive ? "var(--shadow-xs)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "var(--surface-muted)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--muted)";
                }
              }}
            >
              <span style={{ flexShrink: 0, display: "flex" }}>
                <Icon size={18} color={isActive ? "var(--amber)" : "var(--muted)"} strokeWidth={isActive ? 2.5 : 2} />
              </span>
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span
                  style={{
                    background: isActive ? "rgba(249, 115, 22, 0.2)" : "var(--amber-soft)",
                    color: isActive ? "var(--amber)" : "var(--amber-light)",
                    fontSize: "9px",
                    fontWeight: "800",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-pill)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "18px 18px 22px" }}>
        <div
          style={{
            background: "var(--surface-muted)",
            borderRadius: "var(--radius-md)",
            padding: "14px",
            marginBottom: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: user?.color || "var(--amber)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "13px",
                flexShrink: 0,
                boxShadow: "var(--shadow-sm)",
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
              <div style={{ color: "var(--muted)", fontSize: "11px", fontWeight: "600", marginTop: "2px" }}>
                {user?.role || "SUPER ADMIN"}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => onNavigate("login")}
          className="btn-secondary"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "11px",
            fontSize: "13px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fef2f2";
            e.currentTarget.style.color = "#dc2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "";
            e.currentTarget.style.color = "";
          }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
