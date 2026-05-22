"use client";
import { useState } from "react";
import { Popcorn, Flame, CupSoda, GlassWater, Droplet, Utensils, ShoppingBag, Search, Plus, Minus, CreditCard, Landmark, Banknote } from "lucide-react";

const posItems = [
  { id: 1, name: "Butter Popcorn", price: 1.5, icon: <Popcorn size={26} color="#f97316" />, category: "Popcorn" },
  { id: 2, name: "Caramel Crunch", price: 2.0, icon: <Popcorn size={26} color="#ea580c" />, category: "Popcorn" },
  { id: 3, name: "Cheese Blast", price: 1.8, icon: <Popcorn size={26} color="#eab308" />, category: "Popcorn" },
  { id: 4, name: "Saffron Caramel", price: 1.6, icon: <Flame size={26} color="#ef4444" />, category: "Popcorn" },
  { id: 5, name: "Choco Drizzle", price: 2.2, icon: <Popcorn size={26} color="#78350f" />, category: "Popcorn" },
  { id: 6, name: "Caramel + Cheese", price: 2.0, icon: <Popcorn size={26} color="#f97316" />, category: "Popcorn" },
  { id: 7, name: "Cola Large", price: 1.5, icon: <CupSoda size={26} color="#ef4444" />, category: "Beverage" },
  { id: 8, name: "Lemonade", price: 1.2, icon: <GlassWater size={26} color="#eab308" />, category: "Beverage" },
  { id: 9, name: "Mineral Water", price: 0.5, icon: <Droplet size={26} color="#3b82f6" />, category: "Beverage" },
  { id: 10, name: "Nachos Basket", price: 3.5, icon: <Utensils size={26} color="#f97316" />, category: "Snack" },
  { id: 11, name: "Combo Bucket", price: 7.5, icon: <ShoppingBag size={26} color="#f97316" />, category: "Combo" },
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
    <div style={{ display: "flex", height: "100vh", background: "var(--bg)", overflow: "hidden" }}>
      {/* Item Grid */}
      <div style={{ flex: 1, overflowY: "auto", padding: "36px 40px", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "20px" }}>
          <div>
            <h1 className="page-title">Point of Sale</h1>
            <p className="page-subtitle">
              Salmiya Branch · <span style={{ color: "var(--amber-light)", fontWeight: "600" }}>Order #1042</span>
            </p>
          </div>
          <span className="status-chip status-chip-active">POS Session Active</span>
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "28px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "280px" }}>
            <input
              type="text"
              className="search-input"
              placeholder="Search cinematic snacks, beverages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span
              style={{
                position: "absolute",
                left: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <Search size={18} />
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap", overflowX: "auto", paddingBottom: "2px" }}>
            {["All", "Popcorn", "Beverage", "Snack", "Combo"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pill ${selectedCategory === cat ? "pill-active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
            flex: 1,
            alignContent: "start",
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => {
                const existingIndex = cart.findIndex((c) => c.name === item.name);
                if (existingIndex > -1) {
                  updateQty(existingIndex, 1);
                } else {
                  setCart([...cart, { name: item.name, price: item.price, qty: 1 }]);
                }
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "52px",
                    height: "52px",
                    background: "linear-gradient(135deg, var(--surface-muted) 0%, var(--surface) 100%)",
                    borderRadius: "14px",
                    marginBottom: "18px",
                    boxShadow: "var(--shadow-xs)",
                  }}
                >
                  {item.icon}
                </div>
                <div
                  style={{
                    color: "var(--text)",
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "4px",
                    lineHeight: 1.35,
                    letterSpacing: "-0.2px",
                  }}
                >
                  {item.name}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
                <span
                  style={{
                    color: "var(--amber)",
                    fontFamily: "var(--font-display)",
                    fontWeight: "800",
                    fontSize: "18px",
                    letterSpacing: "-0.3px",
                  }}
                >
                  KD {item.price.toFixed(3)}
                </span>
                <span style={categoryBadgeStyle}>{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Panel */}
      <div
        style={{
          width: "380px",
          background: "var(--surface)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "28px 28px 24px", borderBottom: "1px solid var(--border-subtle)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <h2 style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", margin: 0, letterSpacing: "-0.4px" }}>
              Cart
            </h2>
            <span
              style={{
                background: "var(--amber-gradient)",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: "800",
                padding: "5px 12px",
                borderRadius: "var(--radius-pill)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              {cart.reduce((s, i) => s + i.qty, 0)} items
            </span>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "14px", fontWeight: "500", margin: 0 }}>Order #1042 · Table 4</p>
        </div>

        <div style={{ flex: 1, padding: "20px 20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          {cart.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.5 }}>
              <ShoppingBag size={48} color="var(--muted)" style={{ marginBottom: "14px" }} />
              <p style={{ color: "var(--muted)", fontSize: "15px", fontWeight: "600" }}>Cart is empty</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface-muted)",
                  borderRadius: "var(--radius-md)",
                  padding: "18px",
                  transition: "background 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <div style={{ color: "var(--text)", fontSize: "14px", fontWeight: "700", letterSpacing: "-0.1px" }}>
                    {item.name}
                  </div>
                  <div style={{ color: "var(--amber)", fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800" }}>
                    KD {(item.price * item.qty).toFixed(3)}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button className="qty-btn" onClick={() => updateQty(i, -1)}>
                      <Minus size={14} />
                    </button>
                    <span style={{ color: "var(--text)", fontWeight: "700", fontSize: "15px", minWidth: "24px", textAlign: "center" }}>
                      {item.qty}
                    </span>
                    <button className="qty-btn" onClick={() => updateQty(i, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <span style={{ color: "var(--muted)", fontSize: "12px", fontWeight: "500" }}>@ KD {item.price.toFixed(3)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div
          style={{
            padding: "24px 28px 28px",
            borderTop: "1px solid var(--border-subtle)",
            background: "var(--surface)",
            boxShadow: "0 -8px 24px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "22px" }}>
            {[
              { label: "Subtotal", value: `KD ${cartSubtotal.toFixed(3)}` },
              { label: "VAT (0%)", value: `KD ${gst.toFixed(3)}` },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--muted)", fontSize: "14px", fontWeight: "500" }}>{row.label}</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "600" }}>{row.value}</span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "16px",
                marginTop: "4px",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <span style={{ color: "var(--text)", fontSize: "16px", fontWeight: "700" }}>Total</span>
              <span style={{ color: "var(--amber)", fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }}>
                KD {cartTotal.toFixed(3)}
              </span>
            </div>
          </div>

          <button
            className="btn-primary glowing-btn-active"
            onClick={() => {
              if (cartTotal > 0) {
                alert(`Order processed via ${paymentMethod}! Total: KD ${cartTotal.toFixed(3)}`);
                setCart([]);
              }
            }}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              fontWeight: "800",
              borderRadius: "var(--radius-md)",
              marginBottom: "16px",
              letterSpacing: "-0.2px",
            }}
          >
            Charge KD {cartTotal.toFixed(3)} →
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {[
              { id: "Cash", icon: <Banknote size={15} /> },
              { id: "K-Net", icon: <Landmark size={15} /> },
              { id: "Card", icon: <CreditCard size={15} /> },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`pay-btn ${paymentMethod === m.id ? "pay-btn-active" : ""}`}
              >
                {m.icon}
                {m.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const categoryBadgeStyle: React.CSSProperties = {
  background: "var(--surface-muted)",
  color: "var(--muted)",
  fontSize: "10px",
  fontWeight: "700",
  padding: "4px 10px",
  borderRadius: "var(--radius-pill)",
};
