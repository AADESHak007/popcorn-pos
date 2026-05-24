import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Popcorn Place POS",
  description: "Multi-branch Point of Sale system for Popcorn Place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="h-full" suppressHydrationWarning style={{ colorScheme: "light", background: "var(--bg)" }}>
      <body className="h-full" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
