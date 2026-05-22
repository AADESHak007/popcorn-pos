"use client";

const posItems = [
  { id: 1, name: "Butter Popcorn", price: 50, emoji: "🍿", category: "Popcorn" },
  { id: 2, name: "Caramel Crunch", price: 65, emoji: "🍯", category: "Popcorn" },
  { id: 3, name: "Cheese Blast", price: 60, emoji: "🧀", category: "Popcorn" },
  { id: 4, name: "Masala Magic", price: 55, emoji: "🌶️", category: "Popcorn" },
  { id: 5, name: "Choco Drizzle", price: 75, emoji: "🍫", category: "Popcorn" },
  { id: 6, name: "Caramel + Cheese", price: 70, emoji: "🍿", category: "Popcorn" },
  { id: 7, name: "Cola Large", price: 50, emoji: "🥤", category: "Beverage" },
  { id: 8, name: "Lemonade", price: 40, emoji: "🍋", category: "Beverage" },
  { id: 9, name: "Mineral Water", price: 20, emoji: "💧", category: "Beverage" },
  { id: 10, name: "Nachos Basket", price: 120, emoji: "🌮", category: "Snack" },
  { id: 11, name: "Combo Bucket", price: 250, emoji: "🪣", category: "Combo" },
  { id: 12, name: "Tangy Tomato", price: 55, emoji: "🍅", category: "Popcorn" },
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
    <div style={{ display: "flex", height: "100vh", background: "#0f0e09", overflow: "hidden" }}>
      {/* ── Item Grid ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 28px" }}>
        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              color: "#ede8db",
              fontSize: "24px",
              fontWeight: "800",
              letterSpacing: "-0.5px",
            }}
          >
            Point of Sale
          </h1>
          <p style={{ color: "#5a4e3a", fontSize: "14px", marginTop: "2px" }}>
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
              background: "#1c1a10",
              border: "1px solid #2e2918",
              borderRadius: "9px",
              color: "#ede8db",
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
            🔍
          </span>
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: "7px", marginBottom: "18px", flexWrap: "wrap" }}>
          {["All", "Popcorn", "Beverage", "Snack", "Combo"].map((cat, i) => (
            <button
              key={cat}
              style={{
                padding: "5px 13px",
                background: i === 0 ? "#FAC775" : "#1c1a10",
                border: "1px solid " + (i === 0 ? "#FAC775" : "#2e2918"),
                borderRadius: "20px",
                color: i === 0 ? "#1a1208" : "#8a7d69",
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
                background: "#1c1a10",
                border: "1px solid #2e2918",
                borderRadius: "12px",
                padding: "18px",
                cursor: "pointer",
                transition: "border-color 0.12s, background 0.12s",
              }}
            >
              <div style={{ fontSize: "30px", marginBottom: "10px", lineHeight: 1 }}>
                {item.emoji}
              </div>
              <div
                style={{
                  color: "#ede8db",
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
                  style={{ color: "#FAC775", fontWeight: "800", fontSize: "16px" }}
                >
                  Rs {item.price}
                </span>
                <span
                  style={{
                    background: "#251c0d",
                    color: "#8a7d69",
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
          background: "#1c1a10",
          borderLeft: "1px solid #2e2918",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Cart header */}
        <div
          style={{
            padding: "22px 20px 18px",
            borderBottom: "1px solid #2e2918",
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
            <h2 style={{ color: "#ede8db", fontSize: "18px", fontWeight: "800" }}>Cart</h2>
            <span
              style={{
                background: "#FAC775",
                color: "#1a1208",
                fontSize: "11px",
                fontWeight: "800",
                padding: "3px 9px",
                borderRadius: "999px",
              }}
            >
              2 items
            </span>
          </div>
          <p style={{ color: "#5a4e3a", fontSize: "12px" }}>Order #1042 · Table 4</p>
        </div>

        {/* Cart items */}
        <div style={{ flex: 1, padding: "14px", overflowY: "auto" }}>
          {cartItems.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#251c0d",
                border: "1px solid #3d3118",
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
                <div style={{ color: "#ede8db", fontSize: "13.5px", fontWeight: "600" }}>
                  {item.name}
                </div>
                <div style={{ color: "#FAC775", fontSize: "14px", fontWeight: "800" }}>
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
                      background: "#3d3118",
                      border: "none",
                      color: "#ede8db",
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
                    style={{ color: "#ede8db", fontWeight: "700", fontSize: "14px", minWidth: "14px", textAlign: "center" }}
                  >
                    {item.qty}
                  </span>
                  <button
                    style={{
                      width: "27px",
                      height: "27px",
                      borderRadius: "6px",
                      background: "#3d3118",
                      border: "none",
                      color: "#ede8db",
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
                <span style={{ color: "#5a4e3a", fontSize: "11px" }}>@ Rs {item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Totals + Payment */}
        <div style={{ padding: "16px 18px 20px", borderTop: "1px solid #2e2918" }}>
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
                <span style={{ color: "#8a7d69", fontSize: "13px" }}>{row.label}</span>
                <span style={{ color: "#ede8db", fontSize: "13px" }}>{row.value}</span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "10px",
                borderTop: "1px solid #2e2918",
              }}
            >
              <span style={{ color: "#ede8db", fontSize: "16px", fontWeight: "700" }}>Total</span>
              <span style={{ color: "#FAC775", fontSize: "22px", fontWeight: "800" }}>
                Rs {cartTotal}
              </span>
            </div>
          </div>

          {/* Charge button */}
          <button
            style={{
              width: "100%",
              padding: "13px",
              background: "#FAC775",
              border: "none",
              borderRadius: "10px",
              color: "#1a1208",
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
                  background: "#251c0d",
                  border: "1px solid #3d3118",
                  borderRadius: "8px",
                  color: "#8a7d69",
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
