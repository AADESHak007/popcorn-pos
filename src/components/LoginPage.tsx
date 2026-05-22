"use client";
import { useState } from "react";
import { Popcorn, Copy, LogIn, Sparkles, Check } from "lucide-react";
import { colors, shadows } from "@/lib/theme";

interface LoginPageProps {
  onLogin: (role?: string) => void;
}

export type TabFilter = "all" | "head-office" | "branches" | "commissary";

export const demoAccounts = [
  {
    initials: "SA",
    name: "Super Admin",
    role: "SUPER ADMIN",
    email: "superadmin@popcornkw.com",
    location: "Head Office",
    description: "Unrestricted access to every branch, module and setting.",
    tab: "head-office" as TabFilter,
    color: "#ea580c",
  },
  {
    initials: "AM",
    name: "Ahmad Al-Mutairi",
    role: "HEAD OFFICE ADMIN",
    email: "ho.admin@popcornkw.com",
    location: "Head Office",
    description: "Multi-branch reports, transfers, supplier ledger.",
    tab: "head-office" as TabFilter,
    color: "#c2410c",
  },
  {
    initials: "YA",
    name: "Yousef Al-Anjari",
    role: "BRANCH MANAGER",
    email: "salmiya.manager@popcornkw.com",
    location: "Salmiya Branch",
    description: "Branch ops + stock transfer requests + commissary follow-up.",
    tab: "branches" as TabFilter,
    color: "#f97316",
  },
  {
    initials: "NA",
    name: "Noura Al-Ajmi",
    role: "BRANCH STAFF",
    email: "salmiya.staff@popcornkw.com",
    location: "Salmiya Branch",
    description: "POS counter — daily sales, customers, order billing.",
    tab: "branches" as TabFilter,
    color: "#10b981",
  },
  {
    initials: "KR",
    name: "Khaled Al-Rashidi",
    role: "BRANCH MANAGER",
    email: "hawally.manager@popcornkw.com",
    location: "Hawally Branch",
    description: "Branch ops + stock transfer requests + commissary follow-up.",
    tab: "branches" as TabFilter,
    color: "#f97316",
  },
  {
    initials: "LF",
    name: "Layla Al-Fadhli",
    role: "BRANCH STAFF",
    email: "hawally.staff@popcornkw.com",
    location: "Hawally Branch",
    description: "POS counter — daily sales, customers, order billing.",
    tab: "branches" as TabFilter,
    color: "#10b981",
  },
  {
    initials: "BO",
    name: "Bader Al-Otaibi",
    role: "BRANCH MANAGER",
    email: "farwaniya.manager@popcornkw.com",
    location: "Farwaniya Branch",
    description: "Branch ops + stock transfer requests + commissary follow-up.",
    tab: "branches" as TabFilter,
    color: "#f97316",
  },
  {
    initials: "DS",
    name: "Dana Al-Sharhan",
    role: "BRANCH STAFF",
    email: "farwaniya.staff@popcornkw.com",
    location: "Farwaniya Branch",
    description: "POS counter — daily sales, customers, order billing.",
    tab: "branches" as TabFilter,
    color: "#10b981",
  },
  {
    initials: "MH",
    name: "Mohammed Al-Harbi",
    role: "COMMISSARY MANAGER",
    email: "commissary@popcornkw.com",
    location: "Commissary / Production",
    description: "Production planning, raw material issuance, dispatch control.",
    tab: "commissary" as TabFilter,
    color: "#8b5cf6",
  },
];

const tabs: { id: TabFilter; label: string; count: number }[] = [
  { id: "all", label: "All accounts", count: demoAccounts.length },
  { id: "head-office", label: "Head Office", count: demoAccounts.filter((a) => a.tab === "head-office").length },
  { id: "branches", label: "Branches", count: demoAccounts.filter((a) => a.tab === "branches").length },
  { id: "commissary", label: "Commissary", count: demoAccounts.filter((a) => a.tab === "commissary").length },
];

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontWeight: "800",
        fontSize: "14px",
        flexShrink: 0,
        boxShadow: shadows.sm,
      }}
    >
      {initials}
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  return (
    <span
      style={{
        background: "var(--surface-muted)",
        color: "var(--muted)",
        fontSize: "10px",
        fontWeight: "700",
        padding: "3px 8px",
        borderRadius: "var(--radius-pill)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      {role}
    </span>
  );
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const filtered = activeTab === "all" ? demoAccounts : demoAccounts.filter((a) => a.tab === activeTab);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email).catch(() => {});
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 1500);
  };

  return (
    <div
      className="login-page"
      style={{
        minHeight: "100vh",
        background: colors.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "52px",
        paddingBottom: "52px",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "560px",
          height: "560px",
          background: "radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-8%",
          width: "480px",
          height: "480px",
          background: "radial-gradient(circle, rgba(234, 88, 12, 0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ textAlign: "center", marginBottom: "36px", zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "68px",
            height: "68px",
            background: colors.surface,
            borderRadius: "20px",
            marginBottom: "18px",
            boxShadow: shadows.lg,
          }}
        >
          <Popcorn size={34} color="#f97316" />
        </div>
        <h1 style={{ color: colors.text, fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: "800", letterSpacing: "-0.8px", marginBottom: "6px" }}>
          Popcorn Place Kuwait
        </h1>
        <p style={{ color: colors.muted, fontSize: "15px", fontWeight: "500" }}>Multi-Branch POS System</p>
      </div>

      <div
        className="panel-card"
        style={{
          width: "90%",
          maxWidth: "420px",
          borderRadius: "var(--radius-lg)",
          padding: "32px 32px 28px",
          boxShadow: shadows.lg,
          marginBottom: "36px",
          zIndex: 10,
        }}
      >
        <h2 style={{ color: colors.text, fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", marginBottom: "4px" }}>
          Welcome back
        </h2>
        <p style={{ color: colors.muted, fontSize: "14px", marginBottom: "26px", fontWeight: "500" }}>
          Sign in to access your POS dashboard
        </p>

        {["Role", "Username", "Password"].map((label, idx) => (
          <div key={label} style={{ marginBottom: idx < 2 ? "18px" : "26px" }}>
            <label style={{ display: "block", color: colors.muted, fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
              {label}
            </label>
            {label === "Role" ? (
              <select className="input-field" defaultValue="Branch Manager" style={{ cursor: "pointer" }}>
                <option>Branch Manager</option>
                <option>Cashier / Branch Staff</option>
                <option>Inventory Staff</option>
                <option>Head Office Admin</option>
                <option>Super Admin</option>
                <option>Commissary Manager</option>
              </select>
            ) : (
              <input
                className="input-field"
                type={label === "Password" ? "password" : "text"}
                defaultValue={label === "Username" ? "yousef.anjari" : "password"}
              />
            )}
          </div>
        ))}

        <button
          id="login-btn"
          onClick={() => onLogin()}
          className="btn-primary glowing-btn-active"
          style={{ width: "100%", padding: "15px", fontSize: "15px", borderRadius: "var(--radius-md)" }}
        >
          Sign In to Dashboard →
        </button>
      </div>

      <div style={{ width: "100%", maxWidth: "880px", padding: "0 24px", position: "relative", zIndex: 10 }}>
        <div className="panel-card" style={{ borderRadius: "var(--radius-lg)", padding: "30px 32px", boxShadow: shadows.lg }}>
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--amber-soft)",
                borderRadius: "var(--radius-pill)",
                padding: "6px 14px",
                marginBottom: "14px",
              }}
            >
              <Sparkles size={14} color="#f97316" />
              <span style={{ color: "var(--amber)", fontSize: "11px", fontWeight: "800", letterSpacing: "0.04em" }}>TRY THE DEMO</span>
            </div>
            <p style={{ color: colors.textSecondary, fontSize: "15px", fontWeight: "500", margin: 0, lineHeight: 1.5 }}>
              Pick a demo account below to explore different workspace perspectives with realistic data.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "6px",
              marginBottom: "22px",
              background: "var(--surface-muted)",
              borderRadius: "var(--radius-md)",
              padding: "5px",
              width: "fit-content",
              flexWrap: "wrap",
            }}
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={activeTab === t.id ? "pill pill-active" : "pill"}
                style={{ padding: "8px 16px", fontSize: "13px", boxShadow: activeTab === t.id ? undefined : "none", background: activeTab === t.id ? undefined : "transparent" }}
              >
                {t.label}
                <span
                  style={{
                    background: activeTab === t.id ? "rgba(255,255,255,0.25)" : "var(--surface)",
                    color: activeTab === t.id ? "#fff" : "var(--muted)",
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "2px 7px",
                    borderRadius: "var(--radius-pill)",
                    marginLeft: "6px",
                  }}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
            {filtered.map((acc, i) => (
              <div
                key={i}
                className="card card-hover"
                style={{ padding: "20px 22px", borderRadius: "var(--radius-md)" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "14px" }}>
                  <Avatar initials={acc.initials} color={acc.color} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span style={{ color: colors.text, fontSize: "14px", fontWeight: "700", letterSpacing: "-0.2px" }}>{acc.name}</span>
                      <RoleBadge role={acc.role} />
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: "12px", marginTop: "4px", fontWeight: "500" }}>{acc.email}</div>
                    <div style={{ color: "var(--muted)", fontSize: "12px", marginTop: "6px", lineHeight: 1.45 }}>
                      <span style={{ color: "var(--amber-light)", fontWeight: "600" }}>{acc.location}</span>
                      {" · "}
                      {acc.description}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                  <button
                    onClick={() => handleCopy(acc.email)}
                    className="btn-secondary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "8px 14px",
                      fontSize: "12px",
                      color: copiedEmail === acc.email ? "#10b981" : undefined,
                    }}
                  >
                    {copiedEmail === acc.email ? <Check size={13} /> : <Copy size={13} />}
                    {copiedEmail === acc.email ? "Copied!" : "Copy"}
                  </button>
                  <button
                    id={`demo-login-${acc.initials.toLowerCase()}`}
                    onClick={() => onLogin(acc.role)}
                    className="btn-primary"
                    style={{ display: "flex", alignItems: "center", gap: "5px", padding: "8px 16px", fontSize: "12px", borderRadius: "var(--radius-md)" }}
                  >
                    <LogIn size={13} />
                    Sign in
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: "center", color: colors.muted, fontSize: "13px", marginTop: "24px", fontWeight: "500" }}>
          Popcorn Place Kuwait · POS v2.0 · Multi-Branch Edition
        </p>
      </div>
    </div>
  );
}
