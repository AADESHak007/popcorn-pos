"use client";
import { Popcorn, Flame, CupSoda, GlassWater, Droplet, Utensils, ShoppingBag, Search } from "lucide-react";

const posItems = [
  { id: 1, name: "Butter Popcorn", price: 50, icon: <Popcorn size={30} color="#f59e0b" />, category: "Popcorn" },
  { id: 2, name: "Caramel Crunch", price: 65, icon: <Popcorn size={30} color="#d97706" />, category: "Popcorn" },
  { id: 3, name: "Cheese Blast", price: 60, icon: <Popcorn size={30} color="#eab308" />, category: "Popcorn" },
  { id: 4, name: "Masala Magic", price: 55, icon: <Flame size={30} color="#ef4444" />, category: "Popcorn" },
  { id: 5, name: "Choco Drizzle", price: 75, icon: <Popcorn size={30} color="#78350f" />, category: "Popcorn" },
  { id: 6, name: "Caramel + Cheese", price: 70, icon: <Popcorn size={30} color="#f59e0b" />, category: "Popcorn" },
  { id: 7, name: "Cola Large", price: 50, icon: <CupSoda size={30} color="#ef4444" />, category: "Beverage" },
  { id: 8, name: "Lemonade", price: 40, icon: <GlassWater size={30} color="#eab308" />, category: "Beverage" },
  { id: 9, name: "Mineral Water", price: 20, icon: <Droplet size={30} color="#3b82f6" />, category: "Beverage" },
  { id: 10, name: "Nachos Basket", price: 120, icon: <Utensils size={30} color="#f59e0b" />, category: "Snack" },
  { id: 11, name: "Combo Bucket", price: 250, icon: <ShoppingBag size={30} color="#f59e0b" />, category: "Combo" },
  { id: 12, name: "Tangy Tomato", price: 55, icon: <Popcorn size={30} color="#dc2626" />, category: "Popcorn" },
];

const cartItems = [
  { name: "Combo Bucket", price: 250, qty: 3 },
  { name: "Cola Large", price: 50, qty: 2 },
];

const cartSubtotal = 850;
const gst = Math.round(cartSubtotal * 0.05); // 43
const cartTotal = cartSubtotal + gst; // 893

export default function POSPage() {
  return (
    <div style={{ display: "flex", height: "100vh", background: "#f9fafb", overflow: "hidden" }}>
      {/* ── Item Grid ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 28px" }}>
        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              color: "#111827",
              fontSize: "24px",
              fontWeight: "800",
              letterSpacing: "-0.5px",
            }}
          >
            Point of Sale
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "2px" }}>
            Andheri East · Order #1042
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "18px" }}>
          <input
            type="text"
            placeholder="Search items..."
            readOnly
            style={{
              width: "100%",
              padding: "10px 16px 10px 38px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "9px",
              color: "#111827",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "13px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "15px",
            }}
          >
            <Search size={15} />
          </span>
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: "7px", marginBottom: "18px", flexWrap: "wrap" }}>
          {["All", "Popcorn", "Beverage", "Snack", "Combo"].map((cat, i) => (
            <button
              key={cat}
              style={{
                padding: "5px 13px",
                background: i === 0 ? "#f59e0b" : "#ffffff",
                border: "1px solid " + (i === 0 ? "#f59e0b" : "#e5e7eb"),
                borderRadius: "20px",
                color: i === 0 ? "#ffffff" : "#6b7280",
                fontSize: "12px",
                fontWeight: i === 0 ? "700" : "400",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3×4 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
          }}
        >
          {posItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "18px",
                cursor: "pointer",
                transition: "border-color 0.12s, background 0.12s",
              }}
            >
              <div style={{ fontSize: "30px", marginBottom: "10px", lineHeight: 1 }}>
                {item.icon}
              </div>
              <div
                style={{
                  color: "#111827",
                  fontSize: "13.5px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  lineHeight: 1.3,
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ color: "#f59e0b", fontWeight: "800", fontSize: "16px" }}
                >
                  Rs {item.price}
                </span>
                <span
                  style={{
                    background: "#fef3c7",
                    color: "#6b7280",
                    fontSize: "10px",
                    fontWeight: "600",
                    padding: "2px 7px",
                    borderRadius: "4px",
                  }}
                >
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Cart Panel ── */}
      <div
        style={{
          width: "320px",
          background: "#ffffff",
          borderLeft: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Cart header */}
        <div
          style={{
            padding: "22px 20px 18px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <h2 style={{ color: "#111827", fontSize: "18px", fontWeight: "800" }}>Cart</h2>
            <span
              style={{
                background: "#f59e0b",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: "800",
                padding: "3px 9px",
                borderRadius: "999px",
              }}
            >
              2 items
            </span>
          </div>
          <p style={{ color: "#6b7280", fontSize: "12px" }}>Order #1042 · Table 4</p>
        </div>

        {/* Cart items */}
        <div style={{ flex: 1, padding: "14px", overflowY: "auto" }}>
          {cartItems.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fef3c7",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "13px",
                marginBottom: "9px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ color: "#111827", fontSize: "13.5px", fontWeight: "600" }}>
                  {item.name}
                </div>
                <div style={{ color: "#f59e0b", fontSize: "14px", fontWeight: "800" }}>
                  Rs {item.price * item.qty}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                  <button
                    style={{
                      width: "27px",
                      height: "27px",
                      borderRadius: "6px",
                      background: "#e5e7eb",
                      border: "none",
                      color: "#111827",
                      cursor: "pointer",
                      fontSize: "17px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{ color: "#111827", fontWeight: "700", fontSize: "14px", minWidth: "14px", textAlign: "center" }}
                  >
                    {item.qty}
                  </span>
                  <button
                    style={{
                      width: "27px",
                      height: "27px",
                      borderRadius: "6px",
                      background: "#e5e7eb",
                      border: "none",
                      color: "#111827",
                      cursor: "pointer",
                      fontSize: "17px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +
                  </button>
                </div>
                <span style={{ color: "#6b7280", fontSize: "11px" }}>@ Rs {item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Totals + Payment */}
        <div style={{ padding: "16px 18px 20px", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
            {[
              { label: "Subtotal", value: `Rs ${cartSubtotal}`, highlight: false },
              { label: "GST (5%)", value: `Rs ${gst}`, highlight: false },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#6b7280", fontSize: "13px" }}>{row.label}</span>
                <span style={{ color: "#111827", fontSize: "13px" }}>{row.value}</span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "10px",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <span style={{ color: "#111827", fontSize: "16px", fontWeight: "700" }}>Total</span>
              <span style={{ color: "#f59e0b", fontSize: "22px", fontWeight: "800" }}>
                Rs {cartTotal}
              </span>
            </div>
          </div>

          {/* Charge button */}
          <button
            style={{
              width: "100%",
              padding: "13px",
              background: "#f59e0b",
              border: "none",
              borderRadius: "10px",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "800",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Charge Rs {cartTotal}
          </button>
          {/* Payment methods */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "7px" }}>
            {["Cash", "UPI", "Card"].map((m) => (
              <button
                key={m}
                style={{
                  padding: "8px",
                  background: "#fef3c7",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  color: "#6b7280",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
