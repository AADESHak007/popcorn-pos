"use client";

import { useState } from "react";
import Sidebar, { type NavPage } from "@/components/Sidebar";
import LoginPage from "@/components/LoginPage";
import DashboardPage from "@/components/DashboardPage";
import POSPage from "@/components/POSPage";
import InventoryPage from "@/components/InventoryPage";
import ReportsPage from "@/components/ReportsPage";
import StockTransferPage from "@/components/StockTransferPage";
import BranchesPage from "@/components/BranchesPage";

type Page = "login" | NavPage;

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("login");

  const handleLogin = () => setCurrentPage("dashboard");

  const handleNavigate = (page: NavPage | "login") => {
    setCurrentPage(page);
  };

  /* ── Login: full-page, no sidebar ── */
  if (currentPage === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  /* ── App shell: sidebar + content ── */
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f0e09" }}>
      <Sidebar
        currentPage={currentPage as NavPage}
        onNavigate={handleNavigate}
      />
      <main
        style={{
          marginLeft: "240px",
          flex: 1,
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {currentPage === "dashboard" && <DashboardPage />}
        {currentPage === "pos" && <POSPage />}
        {currentPage === "inventory" && <InventoryPage />}
        {currentPage === "reports" && <ReportsPage />}
        {currentPage === "stock-transfer" && <StockTransferPage />}
        {currentPage === "branches" && <BranchesPage />}
      </main>
    </div>
  );
}
