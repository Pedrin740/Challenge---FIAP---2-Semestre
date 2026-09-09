import { Outlet } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";

import { BottomNav } from "./BottomNav";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const { theme } = useTheme();

  const pageBackground =
    theme === "light"
      ? "min-h-screen bg-zinc-100 text-zinc-900"
      : theme === "medium"
        ? "min-h-screen bg-zinc-800 text-zinc-100"
        : "min-h-screen bg-[#09090b] text-white";

  return (
    <div data-theme={theme} className={pageBackground}>
      <Header />

      <Sidebar />

      <main className="min-h-screen pt-[68px] lg:pl-[238px]">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}