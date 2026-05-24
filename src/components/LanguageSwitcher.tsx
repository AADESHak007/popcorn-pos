"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { useTranslation } from "@/contexts/LocaleContext";
import type { Locale } from "@/i18n";

interface LanguageSwitcherProps {
  compact?: boolean;
}

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { locale, localeHref, t } = useTranslation();

  const otherLocale: Locale = locale === "en" ? "ar" : "en";

  if (compact) {
    return (
      <Link
        href={localeHref(otherLocale)}
        scroll={false}
        className="btn-secondary"
        title={t("language.switch")}
        aria-label={t("language.switch")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          padding: "8px 12px",
          fontSize: "12px",
          fontWeight: "700",
          textDecoration: "none",
        }}
      >
        <Languages size={15} />
        {locale === "en" ? "عربي" : "EN"}
      </Link>
    );
  }

  return (
    <div
      style={{
        display: "inline-flex",
        background: "var(--surface-muted)",
        borderRadius: "var(--radius-pill)",
        padding: "4px",
        gap: "4px",
      }}
      role="group"
      aria-label={t("language.switch")}
    >
      {(["en", "ar"] as Locale[]).map((code) => (
        <Link
          key={code}
          href={localeHref(code)}
          scroll={false}
          className={`pill ${locale === code ? "pill-active" : ""}`}
          style={{
            padding: "6px 14px",
            fontSize: "12px",
            boxShadow: locale === code ? undefined : "none",
            background: locale === code ? undefined : "transparent",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
          }}
          aria-current={locale === code ? "true" : undefined}
        >
          {t(`language.${code}`)}
        </Link>
      ))}
    </div>
  );
}
