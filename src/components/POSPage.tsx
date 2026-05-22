"use client";
import { useState } from "react";
import { Popcorn, Flame, CupSoda, GlassWater, Droplet, Utensils, ShoppingBag, Search, Plus, Minus, CreditCard, Landmark, Banknote } from "lucide-react";

const posItems = [
  { id: 1, name: "Butter Popcorn", price: 1.5, icon: <Popcorn size={26} color="#f59e0b" />, category: "Popcorn" },
  { id: 2, name: "Caramel Crunch", price: 2.0, icon: <Popcorn size={26} color="#d97706" />, category: "Popcorn" },
  { id: 3, name: "Cheese Blast", price: 1.8, icon: <Popcorn size={26} color="#eab308" />, category: "Popcorn" },
  { id: 4, name: "Saffron Caramel", price: 1.6, icon: <Flame size={26} color="#ef4444" />, category: "Popcorn" },
  { id: 5, name: "Choco Drizzle", price: 2.2, icon: <Popcorn size={26} color="#78350f" />, category: "Popcorn" },
  { id: 6, name: "Caramel + Cheese", price: 2.0, icon: <Popcorn size={26} color="#f59e0b" />, category: "Popcorn" },
  { id: 7, name: "Cola Large", price: 1.5, icon: <CupSoda size={26} color="#ef4444" />, category: "Beverage" },
  { id: 8, name: "Lemonade", price: 1.2, icon: <GlassWater size={26} color="#eab308" />, category: "Beverage" },
  { id: 9, name: "Mineral Water", price: 0.5, icon: <Droplet size={26} color="#3b82f6" />, category: "Beverage" },
  { id: 10, name: "Nachos Basket", price: 3.5, icon: <Utensils size={26} color="#f59e0b" />, category: "Snack" },
  { id: 11, name: "Combo Bucket", price: 7.5, icon: <ShoppingBag size={26} color="#f59e0b" />, category: "Combo" },
  { id: 12, name: "Spicy Chili", price: 1.6, icon: <Popcorn size={26} color="#dc2626" />, category: "Popcorn" },
];

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([
    { name: "Combo Bucket", price: 7.5, qty: 3 },
    { name: "Cola Large", price: 1.5, qty: 2 },
  ]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const filteredItems = posItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const updateQty = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].qty += delta;
    if (newCart[index].qty <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = 0;
  const cartTotal = cartSubtotal + gst;

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8f6f2", overflow: "hidden" }}>
      {/* ── Item Grid ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 32px 32px", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ color: "var(--text)",
                fontFamily: "var(--font-display)",
                fontSize: "28px",
                fontWeight: "800",
                letterSpacing: "-0.6px",
              }}
            >
              Point of Sale
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px", fontWeight: "500" }}>
              Salmiya Branch · <span style={{ color: "#f59e0b", fontWeight: "600" }}>Order #1042</span>
            </p>
          </div>
          <div
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              borderRadius: "8px",
              padding: "6px 12px",
              color: "#f59e0b",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            ● POS SESSION ACTIVE
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "center" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: 1 }}>
            <input
              type="text"
              placeholder="Search cinematic snacks, beverages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px 12px 42px",
                background: "#ffffff",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                color: "var(--text-secondary)",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(245, 158, 11, 0.4)";
                e.target.style.background = "var(--surface-hover)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.06)";
                e.target.style.background = "var(--surface)";
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Search size={16} />
            </span>
          </div>

          {/* Category filters */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap", overflowX: "auto" }}>
            {["All", "Popcorn", "Beverage", "Snack", "Combo"].map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "10px 18px",
                    background: isActive ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" : "rgba(28, 25, 23, 0.04)",
                    border: isActive ? "none" : "1px solid var(--border)",
                    borderRadius: "10px",
                    color: isActive ? "#ffffff" : "var(--muted)",
                    fontSize: "13px",
                    fontWeight: isActive ? "700" : "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    boxShadow: isActive ? "0 4px 15px rgba(245, 158, 11, 0.25)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                      e.currentTarget.style.color = "#ffffff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(28, 25, 23, 0.04)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                      e.currentTarget.style.color = "var(--muted)";
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3×4 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "16px",
            flex: 1,
            alignContent: "start",
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                const existingIndex = cart.findIndex((c) => c.name === item.name);
                if (existingIndex > -1) {
                  updateQty(existingIndex, 1);
                } else {
                  setCart([...cart, { name: item.name, price: item.price, qty: 1 }]);
                }
              }}
              style={{
                background: "#ffffff",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.3)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(245, 158, 11, 0.12)";
                e.currentTarget.style.background = "var(--surface-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "var(--surface)";
              }}
            >
              <div>
                {/* Icon Backdrop */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    background: "rgba(28, 25, 23, 0.03)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                    marginBottom: "16px",
                  }}
                >
                  {item.icon}
                </div>
                <div
                  style={{
                    color: "var(--text)",
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    fontWeight: "700",
                    marginBottom: "12px",
                    lineHeight: 1.3,
                  }}
                >
                  {item.name}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                <span
                  style={{
                    color: "#f59e0b",
                    fontFamily: "var(--font-display)",
                    fontWeight: "800",
                    fontSize: "17px",
                  }}
                >
                  KD {item.price.toFixed(3)}
                </span>
                <span
                  style={{
                    background: "rgba(28, 25, 23, 0.05)",
                    color: "var(--muted)",
                    fontSize: "10px",
                    fontWeight: "700",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-subtle)",
                    letterSpacing: "0.2px",
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
          width: "360px",
          background: "#ffffff",
          borderLeft: "1px solid var(--border)",
          boxShadow: "-4px 0 24px rgba(28, 25, 23, 0.06)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Cart header */}
        <div
          style={{
            padding: "24px 24px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "6px",
            }}
          >
            <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "800" }}>Cart</h2>
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: "800",
                padding: "3px 10px",
                borderRadius: "999px",
                boxShadow: "0 2px 8px rgba(245, 158, 11, 0.2)",
              }}
            >
              {cart.reduce((s, i) => s + i.qty, 0)} items
            </span>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "13px", fontWeight: "500" }}>Order #1042 · Table 4</p>
        </div>

        {/* Cart items */}
        <div style={{ flex: 1, padding: "20px 16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
          {cart.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.4 }}>
              <ShoppingBag size={48} color="var(--muted)" style={{ marginBottom: "12px" }} />
              <p style={{ color: "var(--muted)", fontSize: "14px", fontWeight: "600" }}>Cart is empty</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(28, 25, 23, 0.03)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "12px",
                  padding: "16px",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ color: "var(--text)", fontSize: "14px", fontWeight: "700", letterSpacing: "-0.1px" }}>
                    {item.name}
                  </div>
                  <div style={{ color: "#f59e0b", fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "800" }}>
                    KD {(item.price * item.qty).toFixed(3)}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      onClick={() => updateQty(i, -1)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(28, 25, 23, 0.05)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                        cursor: "pointer",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--surface-muted)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(28, 25, 23, 0.05)";
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <span
                      style={{ color: "var(--text)", fontWeight: "700", fontSize: "14px", minWidth: "20px", textAlign: "center" }}
                    >
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(i, 1)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(28, 25, 23, 0.05)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                        cursor: "pointer",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--surface-muted)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(28, 25, 23, 0.05)";
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span style={{ color: "var(--muted)", fontSize: "11px", fontWeight: "500" }}>@ KD {item.price.toFixed(3)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals + Payment */}
        <div style={{ padding: "20px 24px 24px", borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            {[
              { label: "Subtotal", value: `KD ${cartSubtotal.toFixed(3)}` },
              { label: "VAT (0%)", value: `KD ${gst.toFixed(3)}` },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "var(--muted)", fontSize: "13px", fontWeight: "500" }}>{row.label}</span>
                <span style={{ color: "var(--text)", fontSize: "13px", fontWeight: "600" }}>{row.value}</span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "12px",
                borderTop: "1px solid var(--border)",
              }}
            >
              <span style={{ color: "var(--text)", fontSize: "15px", fontWeight: "700" }}>Total</span>
              <span style={{ color: "#f59e0b", fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "900" }}>
                KD {cartTotal.toFixed(3)}
              </span>
            </div>
          </div>

          {/* Charge button */}
          <button
            className="glowing-btn-active"
            onClick={() => {
              if (cartTotal > 0) {
                alert(`Order processed via ${paymentMethod}! Total: KD ${cartTotal.toFixed(3)}`);
                setCart([]);
              }
            }}
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              border: "none",
              borderRadius: "12px",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "800",
              cursor: "pointer",
              marginBottom: "14px",
              boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(1.1)";
              e.currentTarget.style.transform = "scale(1.01)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "none";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Charge KD {cartTotal.toFixed(3)} →
          </button>
          {/* Payment methods */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {[
              { id: "Cash", icon: <Banknote size={14} /> },
              { id: "K-Net", icon: <Landmark size={14} /> },
              { id: "Card", icon: <CreditCard size={14} /> },
            ].map((m) => {
              const isSelected = paymentMethod === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  style={{
                    padding: "8px 4px",
                    background: isSelected ? "rgba(245, 158, 11, 0.12)" : "rgba(28, 25, 23, 0.03)",
                    border: isSelected ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    color: isSelected ? "#f59e0b" : "var(--muted)",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "rgba(28, 25, 23, 0.06)";
                      e.currentTarget.style.color = "#ffffff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "rgba(28, 25, 23, 0.03)";
                      e.currentTarget.style.color = "var(--muted)";
                    }
                  }}
                >
                  {m.icon}
                  {m.id}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
