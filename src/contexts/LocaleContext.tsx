"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  defaultLocale,
  getDirection,
  getMessages,
  translate,
  type Locale,
  type Messages,
} from "@/i18n";
import {
  LANG_QUERY_KEY,
  localeFromParam,
  withLangParam,
} from "@/lib/locale-url";

const STORAGE_KEY = "popcorn-pos-locale";

type TranslateParams = Record<string, string | number>;

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  localeHref: (locale: Locale) => string;
  t: (key: string, params?: TranslateParams) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "ar" || stored === "en" ? stored : defaultLocale;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const localeHref = useCallback(
    (target: Locale) => withLangParam(pathname, searchParams, target),
    [pathname, searchParams],
  );

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      localStorage.setItem(STORAGE_KEY, next);
      router.replace(withLangParam(pathname, searchParams, next), {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  // Sync locale from `?lang=` (supports direct links and browser back/forward)
  useEffect(() => {
    const fromUrl = localeFromParam(searchParams.get(LANG_QUERY_KEY));

    if (fromUrl) {
      setLocaleState(fromUrl);
      localStorage.setItem(STORAGE_KEY, fromUrl);
      return;
    }

    const fallback = readStoredLocale();
    setLocaleState(fallback);
    router.replace(withLangParam(pathname, searchParams, fallback), {
      scroll: false,
    });
  }, [pathname, router, searchParams]);

  const dir = getDirection(locale);
  const isRtl = dir === "rtl";
  const messages = getMessages(locale);

  const t = useCallback(
    (key: string, params?: TranslateParams) => translate(locale, key, params),
    [locale],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const value = useMemo(
    () => ({ locale, dir, isRtl, messages, setLocale, localeHref, t }),
    [locale, dir, isRtl, messages, setLocale, localeHref, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useTranslation() {
  const { t, locale, dir, isRtl, setLocale, localeHref, messages } =
    useLocale();
  return { t, locale, dir, isRtl, setLocale, localeHref, messages };
}
