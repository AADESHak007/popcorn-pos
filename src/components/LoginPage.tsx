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
    color: "#d97706",
  },
  {
    initials: "AM",
    name: "Ahmad Al-Mutairi",
    role: "HEAD OFFICE ADMIN",
    email: "ho.admin@popcornkw.com",
    location: "Head Office",
    description: "Multi-branch reports, transfers, supplier ledger.",
    tab: "head-office" as TabFilter,
    color: "#b45309",
  },
  {
    initials: "YA",
    name: "Yousef Al-Anjari",
    role: "BRANCH MANAGER",
    email: "salmiya.manager@popcornkw.com",
    location: "Salmiya Branch",
    description: "Branch ops + stock transfer requests + commissary follow-up.",
    tab: "branches" as TabFilter,
    color: "#f59e0b",
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
    color: "#f59e0b",
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
    color: "#f59e0b",
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
        width: "42px",
        height: "42px",
        borderRadius: "10px",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontWeight: "800",
        fontSize: "14px",
        flexShrink: 0,
        letterSpacing: "0.5px",
        boxShadow: "0 2px 8px rgba(28, 25, 23, 0.12)",
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
        background: "rgba(28, 25, 23, 0.05)",
        color: "var(--muted)",
        fontSize: "10px",
        fontWeight: "700",
        padding: "2px 7px",
        borderRadius: "5px",
        letterSpacing: "0.4px",
        textTransform: "uppercase",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {role}
    </span>
  );
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const filtered =
    activeTab === "all"
      ? demoAccounts
      : demoAccounts.filter((a) => a.tab === activeTab);

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
        paddingTop: "48px",
        paddingBottom: "48px",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-5%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(217, 119, 6, 0.08) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Logo block */}
      <div style={{ textAlign: "center", marginBottom: "32px", zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: "18px",
            marginBottom: "16px",
            boxShadow: shadows.md,
          }}
        >
          <Popcorn size={32} color="#f59e0b" />
        </div>
        <h1
          style={{
            color: colors.text,
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: "800",
            letterSpacing: "-0.6px",
            marginBottom: "4px",
          }}
        >
          Popcorn Place Kuwait
        </h1>
        <p style={{ color: colors.muted, fontSize: "14px", fontWeight: "600", letterSpacing: "0.2px" }}>
          Multi-Branch POS System
        </p>
      </div>

      {/* Login form card */}
      <div
        className="panel-card"
        style={{
          width: "90%",
          maxWidth: "400px",
          borderRadius: "20px",
          padding: "28px 28px 24px",
          boxShadow: shadows.lg,
          marginBottom: "32px",
          zIndex: 10,
          background: colors.surface,
        }}
      >
        <h2 style={{ color: colors.text, fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", marginBottom: "4px" }}>
          Welcome back
        </h2>
        <p style={{ color: colors.muted, fontSize: "13px", marginBottom: "22px", fontWeight: "500" }}>
          Sign in to access your POS dashboard
        </p>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              color: colors.muted,
              fontSize: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "8px",
            }}
          >
            Role
          </label>
          <select
            className="input-field"
            defaultValue="Branch Manager"
            style={{
              width: "100%",
              padding: "11px 14px",
              background: colors.surfaceMuted,
              border: `1px solid ${colors.border}`,
              borderRadius: "10px",
              color: colors.text,
              fontSize: "14px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option>Branch Manager</option>
            <option>Cashier / Branch Staff</option>
            <option>Inventory Staff</option>
            <option>Head Office Admin</option>
            <option>Super Admin</option>
            <option>Commissary Manager</option>
          </select>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              color: colors.muted,
              fontSize: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "8px",
            }}
          >
            Username
          </label>
          <input
            className="input-field"
            type="text"
            defaultValue="yousef.anjari"
            style={{
              width: "100%",
              padding: "11px 14px",
              background: colors.surfaceMuted,
              border: `1px solid ${colors.border}`,
              borderRadius: "10px",
              color: colors.text,
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              color: colors.muted,
              fontSize: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "8px",
            }}
          >
            Password
          </label>
          <input
            className="input-field"
            type="password"
            defaultValue="password"
            style={{
              width: "100%",
              padding: "11px 14px",
              background: colors.surfaceMuted,
              border: `1px solid ${colors.border}`,
              borderRadius: "10px",
              color: colors.text,
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          id="login-btn"
          onClick={() => onLogin()}
          className="glowing-btn-active"
          style={{
            width: "100%",
            padding: "13px",
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            border: "none",
            borderRadius: "10px",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
            letterSpacing: "-0.2px",
            boxShadow: "0 4px 15px rgba(245, 158, 11, 0.35)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.01)";
            e.currentTarget.style.filter = "brightness(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.filter = "none";
          }}
        >
          Sign In to Dashboard →
        </button>
      </div>

      {/* ── Try the Demo section ── */}
      <div
        style={{
          width: "100%",
          maxWidth: "860px",
          padding: "0 20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          className="panel-card"
          style={{
            borderRadius: "24px",
            padding: "26px 28px",
            boxShadow: shadows.lg,
            background: colors.surface,
          }}
        >
          {/* Badge + headline */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                borderRadius: "999px",
                padding: "5px 14px",
                marginBottom: "12px",
              }}
            >
              <Sparkles size={13} color="#f59e0b" />
              <span
                style={{
                  color: "#f59e0b",
                  fontSize: "11px",
                  fontWeight: "800",
                  letterSpacing: "0.5px",
                }}
              >
                TRY THE DEMO
              </span>
            </div>
            <p style={{ color: colors.textSecondary, fontSize: "14px", fontWeight: "600", margin: 0 }}>
              Pick a demo account below to explore different workspace perspectives with realistic data.
            </p>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginBottom: "20px",
              background: colors.surfaceMuted,
              borderRadius: "12px",
              padding: "4px",
              width: "fit-content",
              border: `1px solid ${colors.border}`,
            }}
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: activeTab === t.id ? "700" : "500",
                  background: activeTab === t.id ? "#f59e0b" : "transparent",
                  color: activeTab === t.id ? colors.white : colors.muted,
                  transition: "all 0.15s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {t.label}
                <span
                  style={{
                    background: activeTab === t.id ? "rgba(255,255,255,0.25)" : "rgba(28, 25, 23, 0.05)",
                    color: activeTab === t.id ? colors.white : colors.muted,
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "1px 6px",
                    borderRadius: "999px",
                  }}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Account cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            {filtered.map((acc, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: "14px",
                  padding: "16px 18px",
                  background: colors.surface,
                  boxShadow: shadows.sm,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(245, 158, 11, 0.35)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(245, 158, 11, 0.12)";
                  (e.currentTarget as HTMLElement).style.background = colors.surfaceHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = colors.border;
                  (e.currentTarget as HTMLElement).style.boxShadow = shadows.sm;
                  (e.currentTarget as HTMLElement).style.background = colors.surface;
                }}
              >
                {/* Card top */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                  <Avatar initials={acc.initials} color={acc.color} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          color: colors.text,
                          fontSize: "14px",
                          fontWeight: "700",
                          letterSpacing: "-0.2px",
                        }}
                      >
                        {acc.name}
                      </span>
                      <RoleBadge role={acc.role} />
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: "12px", marginTop: "2px", fontWeight: "500" }}>
                      {acc.email}
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: "12px", marginTop: "4px", lineHeight: "1.4" }}>
                      <span style={{ color: "#f59e0b", fontWeight: "600" }}>{acc.location}</span>
                      {" · "}
                      {acc.description}
                    </div>
                  </div>
                </div>

                {/* Card actions */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                  <button
                    onClick={() => handleCopy(acc.email)}
                    title="Copy email"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 13px",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      background: "rgba(28, 25, 23, 0.03)",
                      color: copiedEmail === acc.email ? "#10b981" : "var(--muted)",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (copiedEmail !== acc.email) {
                        e.currentTarget.style.background = "rgba(28, 25, 23, 0.06)";
                        e.currentTarget.style.color = "#ffffff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (copiedEmail !== acc.email) {
                        e.currentTarget.style.background = "rgba(28, 25, 23, 0.03)";
                        e.currentTarget.style.color = "var(--muted)";
                      }
                    }}
                  >
                    {copiedEmail === acc.email ? <Check size={13} /> : <Copy size={13} />}
                    {copiedEmail === acc.email ? "Copied!" : "Copy"}
                  </button>
                  <button
                    id={`demo-login-${acc.initials.toLowerCase()}`}
                    onClick={() => onLogin(acc.role)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      border: "none",
                      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      color: "#ffffff",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(245, 158, 11, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "brightness(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "none";
                    }}
                  >
                    <LogIn size={13} />
                    Sign in
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: "center", color: colors.muted, fontSize: "12px", marginTop: "20px", fontWeight: "600" }}>
          Popcorn Place Kuwait · POS v2.0 · Multi-Branch Edition
        </p>
      </div>
    </div>
  );
}
