import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full" style={{ colorScheme: "light", background: "#f8f6f2" }}>
      <body className="h-full" style={{ background: "#f8f6f2", color: "#1c1917" }}>{children}</body>
    </html>
  );
}
