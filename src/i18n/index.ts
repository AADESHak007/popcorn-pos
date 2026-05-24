import en, { type Messages } from "./locales/en";
import ar from "./locales/ar";

export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Messages> = { en, ar };

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale] ?? dictionaries.en;
}

type Primitive = string | number;

function getNestedValue(obj: unknown, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

export function translate(
  locale: Locale,
  key: string,
  params?: Record<string, Primitive>
): string {
  const template = getNestedValue(getMessages(locale), key) ?? getNestedValue(dictionaries.en, key) ?? key;
  if (!params) return template;
  return Object.entries(params).reduce(
    (result, [paramKey, value]) => result.replaceAll(`{{${paramKey}}}`, String(value)),
    template
  );
}

export type { Messages };
