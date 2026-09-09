import { Link, useLocation } from "react-router-dom";
import { Icon } from "./Icons";

export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-white/10 bg-[#0b0b0d]/95 px-2 py-2 backdrop-blur-xl lg:hidden">
      <Link
        to="/"
        className={`flex flex-col items-center gap-1 py-1 text-[10px] transition ${
          isActive("/")
            ? "text-white"
            : "text-zinc-500 hover:text-white"
        }`}
      >
        <Icon name="home" size={18} />
        <span>Início</span>
      </Link>
    </nav>
  );
}