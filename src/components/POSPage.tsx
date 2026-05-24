"use client";
import { useState } from "react";
import { Popcorn, Flame, CupSoda, GlassWater, Droplet, Utensils, ShoppingBag, Search, Plus, Minus, CreditCard, Landmark, Banknote } from "lucide-react";
import { useTranslation } from "@/contexts/LocaleContext";

const posItems = [
  { id: 1, nameKey: "products.butterPopcorn", price: 1.5, icon: <Popcorn size={26} color="#f97316" />, category: "popcorn" },
  { id: 2, nameKey: "products.caramelCrunch", price: 2.0, icon: <Popcorn size={26} color="#ea580c" />, category: "popcorn" },
  { id: 3, nameKey: "products.cheeseBlast", price: 1.8, icon: <Popcorn size={26} color="#eab308" />, category: "popcorn" },
  { id: 4, nameKey: "products.saffronCaramel", price: 1.6, icon: <Flame size={26} color="#ef4444" />, category: "popcorn" },
  { id: 5, nameKey: "products.chocoDrizzle", price: 2.2, icon: <Popcorn size={26} color="#78350f" />, category: "popcorn" },
  { id: 6, nameKey: "products.caramelCheese", price: 2.0, icon: <Popcorn size={26} color="#f97316" />, category: "popcorn" },
  { id: 7, nameKey: "products.colaLarge", price: 1.5, icon: <CupSoda size={26} color="#ef4444" />, category: "beverage" },
  { id: 8, nameKey: "products.lemonade", price: 1.2, icon: <GlassWater size={26} color="#eab308" />, category: "beverage" },
  { id: 9, nameKey: "products.mineralWater", price: 0.5, icon: <Droplet size={26} color="#3b82f6" />, category: "beverage" },
  { id: 10, nameKey: "products.nachosBasket", price: 3.5, icon: <Utensils size={26} color="#f97316" />, category: "snack" },
  { id: 11, nameKey: "products.comboBucket", price: 7.5, icon: <ShoppingBag size={26} color="#f97316" />, category: "combo" },
  { id: 12, nameKey: "products.spicyChili", price: 1.6, icon: <Popcorn size={26} color="#dc2626" />, category: "popcorn" },
];

export default function POSPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "popcorn" | "beverage" | "snack" | "combo">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([
    { nameKey: "products.comboBucket", price: 7.5, qty: 3 },
    { nameKey: "products.colaLarge", price: 1.5, qty: 2 },
  ]);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "knet" | "card">("cash");

  const filteredItems = posItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = t(item.nameKey).toLowerCase().includes(searchQuery.toLowerCase());
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
            <h1 className="page-title">{t("pos.title")}</h1>
            <p className="page-subtitle">
              {t("pos.branchOrder", { branch: t("login.locations.salmiya"), order: 1042 })}
            </p>
          </div>
          <span className="status-chip status-chip-active">{t("pos.sessionActive")}</span>
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "28px", alignItems: "center", flexWrap: "wrap" }}>
          <div className="search-input-wrap">
            <input
              type="text"
              className="search-input"
              placeholder={t("pos.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-input-icon">
              <Search size={18} />
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap", overflowX: "auto", paddingBottom: "2px" }}>
            {([
              { id: "all", labelKey: "categories.all" },
              { id: "popcorn", labelKey: "categories.popcorn" },
              { id: "beverage", labelKey: "categories.beverage" },
              { id: "snack", labelKey: "categories.snack" },
              { id: "combo", labelKey: "categories.combo" },
            ] as const).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`pill ${selectedCategory === cat.id ? "pill-active" : ""}`}
              >
                {t(cat.labelKey)}
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
                const existingIndex = cart.findIndex((c) => c.nameKey === item.nameKey);
                if (existingIndex > -1) {
                  updateQty(existingIndex, 1);
                } else {
                  setCart([...cart, { nameKey: item.nameKey, price: item.price, qty: 1 }]);
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
                  {t(item.nameKey)}
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
                  {t("common.currency")} {item.price.toFixed(3)}
                </span>
                <span style={categoryBadgeStyle}>{t(`categories.${item.category}`)}</span>
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
              {t("pos.cart")}
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
              {cart.reduce((s, i) => s + i.qty, 0)} {t("common.items")}
            </span>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "14px", fontWeight: "500", margin: 0 }}>{t("pos.orderTable", { order: 1042, table: 4 })}</p>
        </div>

        <div style={{ flex: 1, padding: "20px 20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          {cart.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.5 }}>
              <ShoppingBag size={48} color="var(--muted)" style={{ marginBottom: "14px" }} />
              <p style={{ color: "var(--muted)", fontSize: "15px", fontWeight: "600" }}>{t("pos.cartEmpty")}</p>
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
                    {t(item.nameKey)}
                  </div>
                  <div style={{ color: "var(--amber)", fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800" }}>
                    {t("common.currency")} {(item.price * item.qty).toFixed(3)}
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
                  <span style={{ color: "var(--muted)", fontSize: "12px", fontWeight: "500" }}>{t("pos.atPrice", { price: item.price.toFixed(3) })}</span>
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
              { label: t("pos.subtotal"), value: `${t("common.currency")} ${cartSubtotal.toFixed(3)}` },
              { label: t("pos.vat"), value: `${t("common.currency")} ${gst.toFixed(3)}` },
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
              <span style={{ color: "var(--text)", fontSize: "16px", fontWeight: "700" }}>{t("pos.total")}</span>
              <span style={{ color: "var(--amber)", fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }}>
                {t("common.currency")} {cartTotal.toFixed(3)}
              </span>
            </div>
          </div>

          <button
            className="btn-primary glowing-btn-active"
            onClick={() => {
              if (cartTotal > 0) {
                alert(
                  t("pos.processed", {
                    method: t(`payment.${paymentMethod}`),
                    amount: cartTotal.toFixed(3),
                  })
                );
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
            {t("pos.charge", { amount: cartTotal.toFixed(3) })}
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {(
              [
                { id: "cash", icon: <Banknote size={15} /> },
                { id: "knet", icon: <Landmark size={15} /> },
                { id: "card", icon: <CreditCard size={15} /> },
              ] as const
            ).map((m) => {
              const isSelected = paymentMethod === m.id;
              return (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`pay-btn ${isSelected ? "pay-btn-active" : ""}`}
              >
                {m.icon}
                {t(`payment.${m.id}`)}
              </button>
              );
            })}
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
