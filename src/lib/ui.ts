/** Shared inline style snippets for consistent UI across pages */
export const pageStyles = {
  wrap: {
    padding: "36px 40px",
    minHeight: "100vh" as const,
    background: "var(--bg)",
    display: "flex" as const,
    flexDirection: "column" as const,
  },
  header: {
    marginBottom: "32px",
    display: "flex" as const,
    justifyContent: "space-between" as const,
    alignItems: "flex-end" as const,
    gap: "20px",
  },
  title: {
    color: "var(--text)",
    fontFamily: "var(--font-display)",
    fontSize: "32px",
    fontWeight: "800" as const,
    letterSpacing: "-0.8px",
    lineHeight: 1.15,
    margin: 0,
  },
  subtitle: {
    color: "var(--muted)",
    fontSize: "15px",
    marginTop: "6px",
    fontWeight: "500" as const,
    lineHeight: 1.5,
  },
};

export const cardStyles = {
  base: {
    background: "var(--surface)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-md)",
    border: "none",
  },
  section: {
    padding: "24px 28px",
  },
  sectionHeader: {
    padding: "24px 28px",
    borderBottom: "1px solid var(--border-subtle)",
  },
};

export const badgeStyles = {
  category: {
    background: "var(--amber-soft)",
    color: "var(--amber)",
    fontSize: "11px",
    fontWeight: "700" as const,
    padding: "4px 10px",
    borderRadius: "var(--radius-pill)",
    border: "none",
  },
  muted: {
    background: "var(--surface-muted)",
    color: "var(--muted)",
    fontSize: "11px",
    fontWeight: "600" as const,
    padding: "4px 10px",
    borderRadius: "var(--radius-pill)",
    border: "none",
  },
};
