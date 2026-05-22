"use client";
import { useState } from "react";
import { Popcorn, Copy, LogIn, Sparkles } from "lucide-react";

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
    color: "#1e3a5f",
  },
  {
    initials: "AM",
    name: "Ahmad Al-Mutairi",
    role: "HEAD OFFICE ADMIN",
    email: "ho.admin@popcornkw.com",
    location: "Head Office",
    description: "Multi-branch reports, transfers, supplier ledger.",
    tab: "head-office" as TabFilter,
    color: "#1e3a5f",
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
        background: "#f3f4f6",
        color: "#6b7280",
        fontSize: "10px",
        fontWeight: "700",
        padding: "2px 7px",
        borderRadius: "4px",
        letterSpacing: "0.4px",
        textTransform: "uppercase" as const,
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
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "48px",
        paddingBottom: "48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glows */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-8%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo block */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            background: "#ffffff",
            border: "1.5px solid #e5e7eb",
            borderRadius: "18px",
            marginBottom: "16px",
            boxShadow: "0 0 40px rgba(245, 158, 11, 0.12)",
          }}
        >
          <Popcorn size={30} color="#f59e0b" />
        </div>
        <h1
          style={{
            color: "#111827",
            fontSize: "26px",
            fontWeight: "800",
            letterSpacing: "-0.6px",
            marginBottom: "4px",
          }}
        >
          Popcorn Place Kuwait
        </h1>
        <p style={{ color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>
          Multi-Branch POS System
        </p>
      </div>

      {/* Login form card */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "18px",
          padding: "28px 28px 24px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          marginBottom: "32px",
        }}
      >
        <h2 style={{ color: "#111827", fontSize: "17px", fontWeight: "700", marginBottom: "4px" }}>
          Welcome back
        </h2>
        <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "22px" }}>
          Sign in to access your POS dashboard
        </p>

        <div style={{ marginBottom: "14px" }}>
          <label
            style={{
              display: "block",
              color: "#6b7280",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              marginBottom: "7px",
            }}
          >
            Role
          </label>
          <select
            defaultValue="Branch Manager"
            style={{
              width: "100%",
              padding: "10px 13px",
              background: "#fef3c7",
              border: "1px solid #e5e7eb",
              borderRadius: "9px",
              color: "#111827",
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

        <div style={{ marginBottom: "14px" }}>
          <label
            style={{
              display: "block",
              color: "#6b7280",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              marginBottom: "7px",
            }}
          >
            Username
          </label>
          <input
            type="text"
            defaultValue="yousef.anjari"
            style={{
              width: "100%",
              padding: "10px 13px",
              background: "#fef3c7",
              border: "1px solid #e5e7eb",
              borderRadius: "9px",
              color: "#111827",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "22px" }}>
          <label
            style={{
              display: "block",
              color: "#6b7280",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              marginBottom: "7px",
            }}
          >
            Password
          </label>
          <input
            type="password"
            defaultValue="password"
            style={{
              width: "100%",
              padding: "10px 13px",
              background: "#fef3c7",
              border: "1px solid #e5e7eb",
              borderRadius: "9px",
              color: "#111827",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          id="login-btn"
          onClick={() => onLogin()}
          style={{
            width: "100%",
            padding: "12px",
            background: "#f59e0b",
            border: "none",
            borderRadius: "10px",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
            letterSpacing: "-0.2px",
          }}
        >
          Sign In to Dashboard →
        </button>
      </div>

      {/* ── Try the Demo section ── */}
      <div
        style={{
          width: "100%",
          maxWidth: "840px",
          padding: "0 20px",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "20px",
            padding: "26px 28px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
          {/* Badge + headline */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#fef3c7",
                border: "1px solid #fde68a",
                borderRadius: "999px",
                padding: "4px 12px",
                marginBottom: "10px",
              }}
            >
              <Sparkles size={13} color="#f59e0b" />
              <span
                style={{
                  color: "#92400e",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "0.3px",
                }}
              >
                TRY THE DEMO
              </span>
            </div>
            <p style={{ color: "#374151", fontSize: "14px", fontWeight: "500", margin: 0 }}>
              Pick a role to explore Popcorn Place Kuwait with realistic data — no setup needed.
            </p>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginBottom: "20px",
              background: "#f3f4f6",
              borderRadius: "10px",
              padding: "4px",
              width: "fit-content",
            }}
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "7px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: activeTab === t.id ? "700" : "500",
                  background: activeTab === t.id ? "#1e3a5f" : "transparent",
                  color: activeTab === t.id ? "#ffffff" : "#6b7280",
                  transition: "all 0.15s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {t.label}
                <span
                  style={{
                    background: activeTab === t.id ? "rgba(255,255,255,0.2)" : "#e5e7eb",
                    color: activeTab === t.id ? "#ffffff" : "#6b7280",
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
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "16px 18px",
                  background: "#fafafa",
                  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#f59e0b";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(245,158,11,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Card top */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
                  <Avatar initials={acc.initials} color={acc.color} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" as const }}>
                      <span
                        style={{
                          color: "#111827",
                          fontSize: "14px",
                          fontWeight: "700",
                          letterSpacing: "-0.2px",
                        }}
                      >
                        {acc.name}
                      </span>
                      <RoleBadge role={acc.role} />
                    </div>
                    <div style={{ color: "#9ca3af", fontSize: "12px", marginTop: "2px" }}>
                      {acc.email}
                    </div>
                    <div style={{ color: "#6b7280", fontSize: "12px", marginTop: "3px" }}>
                      <span style={{ color: "#111827", fontWeight: "500" }}>{acc.location}</span>
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
                      borderRadius: "7px",
                      border: "1px solid #e5e7eb",
                      background: "#ffffff",
                      color: copiedEmail === acc.email ? "#10b981" : "#6b7280",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "color 0.15s",
                    }}
                  >
                    <Copy size={13} />
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
                      borderRadius: "7px",
                      border: "none",
                      background: "#1e3a5f",
                      color: "#ffffff",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
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

        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "12px", marginTop: "20px" }}>
          Popcorn Place Kuwait · POS v2.0 · Multi-Branch Edition
        </p>
      </div>
    </div>
  );
}
