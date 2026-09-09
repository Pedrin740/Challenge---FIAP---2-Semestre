import { Outlet } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";

import { BottomNav } from "./BottomNav";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const themeStyles = `
[data-theme="light"] [class*="bg-[#09090b]"] {
  background-color: #f4f4f5 !important;
}

[data-theme="light"] [class*="bg-[#0a0a0c]"] {
  background-color: #ffffff !important;
}

[data-theme="light"] [class*="bg-[#0b0b0d]"] {
  background-color: rgba(255, 255, 255, 0.95) !important;
}

[data-theme="light"] [class*="bg-[#0c0c0e]"] {
  background-color: #f8fafc !important;
}

[data-theme="light"] [class*="bg-[#121214]"] {
  background-color: #ffffff !important;
}

[data-theme="light"] [class*="bg-[#151517]"] {
  background-color: #f8fafc !important;
}

[data-theme="light"] [class*="bg-black/20"] {
  background-color: rgba(24, 24, 27, 0.03) !important;
}

[data-theme="light"] [class*="bg-white/[.02]"] {
  background-color: rgba(24, 24, 27, 0.02) !important;
}

[data-theme="light"] [class*="bg-white/[.03]"] {
  background-color: rgba(24, 24, 27, 0.035) !important;
}

[data-theme="light"] [class*="bg-white/[.04]"] {
  background-color: rgba(24, 24, 27, 0.04) !important;
}

[data-theme="light"] [class*="bg-white/[.05]"] {
  background-color: rgba(24, 24, 27, 0.05) !important;
}

[data-theme="light"] [class*="bg-white/[.06]"] {
  background-color: rgba(24, 24, 27, 0.06) !important;
}

[data-theme="light"] [class*="bg-purple-950/20"] {
  background-color: #f5f3ff !important;
}

[data-theme="light"] [class*="bg-lime-400/[.05]"] {
  background-color: rgba(163, 230, 53, 0.14) !important;
}

[data-theme="light"] [class*="bg-lime-400/10"] {
  background-color: rgba(132, 204, 22, 0.12) !important;
}

[data-theme="light"] [class*="from-lime-400/25"][class*="to-[#121214]"] {
  background-image: linear-gradient(135deg, #d9f99d, #ecfccb, #ffffff) !important;
}

[data-theme="light"] [class*="from-purple-950/35"][class*="to-[#121214]"] {
  background-image: linear-gradient(135deg, #f5f3ff, #faf5ff, #ffffff) !important;
}

[data-theme="light"] [class*="border-white/10"] {
  border-color: #e4e4e7 !important;
}

[data-theme="light"] [class*="border-white/5"] {
  border-color: #e4e4e7 !important;
}

[data-theme="light"] [class*="border-purple-500/20"] {
  border-color: #ddd6fe !important;
}

[data-theme="light"] [class*="border-purple-500/25"] {
  border-color: #d8b4fe !important;
}

[data-theme="light"] [class*="text-white"] {
  color: #18181b !important;
}

[data-theme="light"] [class*="text-zinc-200"] {
  color: #27272a !important;
}

[data-theme="light"] [class*="text-zinc-300"] {
  color: #3f3f46 !important;
}

[data-theme="light"] [class*="text-zinc-400"] {
  color: #52525b !important;
}

[data-theme="light"] [class*="text-zinc-500"] {
  color: #71717a !important;
}

[data-theme="light"] [class*="text-zinc-600"] {
  color: #71717a !important;
}

[data-theme="light"] [class*="text-purple-300"] {
  color: #7e22ce !important;
}

[data-theme="light"] [class*="text-lime-300"] {
  color: #4d7c0f !important;
}

[data-theme="light"] [class*="text-lime-400"] {
  color: #65a30d !important;
}

[data-theme="light"] [class*="placeholder:text-zinc-600"]::placeholder {
  color: #a1a1aa !important;
}

[data-theme="light"] input,
[data-theme="light"] textarea,
[data-theme="light"] select {
  color: #18181b !important;
}

[data-theme="light"] input::placeholder,
[data-theme="light"] textarea::placeholder {
  color: #a1a1aa !important;
}

[data-theme="light"] [class*="bg-purple-600"] {
  color: #ffffff !important;
}

[data-theme="medium"] [class*="bg-[#09090b]"] {
  background-color: #18181b !important;
}

[data-theme="medium"] [class*="bg-[#0a0a0c]"] {
  background-color: #18181b !important;
}

[data-theme="medium"] [class*="bg-[#0b0b0d]"] {
  background-color: rgba(24, 24, 27, 0.95) !important;
}

[data-theme="medium"] [class*="bg-[#0c0c0e]"] {
  background-color: #202023 !important;
}

[data-theme="medium"] [class*="bg-[#121214]"] {
  background-color: #27272a !important;
}

[data-theme="medium"] [class*="bg-[#151517]"] {
  background-color: #232326 !important;
}

[data-theme="medium"] [class*="border-white/10"] {
  border-color: #52525b !important;
}

[data-theme="medium"] [class*="border-white/5"] {
  border-color: #52525b !important;
}

[data-theme="medium"] [class*="text-zinc-500"] {
  color: #a1a1aa !important;
}

[data-theme="medium"] [class*="text-zinc-600"] {
  color: #a1a1aa !important;
}

[data-theme="medium"] [class*="text-zinc-400"] {
  color: #d4d4d8 !important;
}
`;

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
      <style>{themeStyles}</style>

      <Header />

      <Sidebar />

      <main className="min-h-screen pt-[68px] lg:pl-[238px]">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}