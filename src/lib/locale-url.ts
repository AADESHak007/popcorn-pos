import { defaultLocale, type Locale } from "@/i18n";

export const LANG_QUERY_KEY = "lang";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "ar";
}

export function localeFromParam(value: string | null | undefined): Locale | null {
  return isLocale(value) ? value : null;
}

/** Build a path + query string with `lang` set (preserves other query params). */
export function withLangParam(
  pathname: string,
  searchParams: URLSearchParams | string | null | undefined,
  locale: Locale = defaultLocale
): string {
  const params = new URLSearchParams(
    searchParams == null ? "" : typeof searchParams === "string" ? searchParams : searchParams.toString()
  );
  params.set(LANG_QUERY_KEY, locale);
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
