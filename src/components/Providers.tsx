"use client";

import { Suspense } from "react";
import { LocaleProvider } from "@/contexts/LocaleContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <LocaleProvider>{children}</LocaleProvider>
    </Suspense>
  );
}
