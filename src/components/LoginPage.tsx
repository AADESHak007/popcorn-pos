"use client";
import { Popcorn } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

      <div style={{ width: "100%", maxWidth: "420px", padding: "0 24px", position: "relative" }}>
        {/* Logo block */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              background: "#ffffff",
              border: "1.5px solid #e5e7eb",
              borderRadius: "20px",
              fontSize: "34px",
              marginBottom: "18px",
              boxShadow: "0 0 40px rgba(245, 158, 11, 0.1)",
            }}
          >
            <Popcorn size={34} />
          </div>
          <h1
            style={{
              color: "#111827",
              fontSize: "28px",
              fontWeight: "800",
              letterSpacing: "-0.6px",
              marginBottom: "6px",
            }}
          >
            Popcorn Place
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>
            Point of Sale System
          </p>
        </div>

        {/* Form card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "18px",
            padding: "32px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          }}
        >
          <h2 style={{ color: "#111827", fontSize: "18px", fontWeight: "700", marginBottom: "4px" }}>
            Welcome back
          </h2>
          <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "28px" }}>
            Sign in to access your POS dashboard
          </p>

          {/* Role */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                color: "#6b7280",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                marginBottom: "8px",
              }}
            >
              Role
            </label>
            <select
              defaultValue="Branch Manager"
              style={{
                width: "100%",
                padding: "11px 14px",
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
              <option>Cashier</option>
              <option>Inventory Staff</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Username */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                color: "#6b7280",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                marginBottom: "8px",
              }}
            >
              Username
            </label>
            <input
              type="text"
              defaultValue="raj.kumar"
              style={{
                width: "100%",
                padding: "11px 14px",
                background: "#fef3c7",
                border: "1px solid #e5e7eb",
                borderRadius: "9px",
                color: "#111827",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "28px" }}>
            <label
              style={{
                display: "block",
                color: "#6b7280",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              defaultValue="password"
              style={{
                width: "100%",
                padding: "11px 14px",
                background: "#fef3c7",
                border: "1px solid #e5e7eb",
                borderRadius: "9px",
                color: "#111827",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          {/* Login button */}
          <button
            id="login-btn"
            onClick={onLogin}
            style={{
              width: "100%",
              padding: "13px",
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

        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "12px", marginTop: "24px" }}>
          Popcorn Place POS v2.0 · Multi-Branch Edition
        </p>
      </div>
    </div>
  );
}
