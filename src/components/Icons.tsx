import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  name: string;
  size?: number;
};

export function Icon({
  name,
  size = 20,
  ...props
}: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };

  const icons: Record<string, ReactElement> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
  };

  return (
    <svg {...common}>
      {icons[name] ?? icons.home}
    </svg>
  );
}
const icons: Record<string, ReactElement> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </>
  ),

  diary: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),

  user: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),

  userSingle: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </>
  ),

  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M14 14a5 5 0 0 1 7.5 4.3" />
    </>
  ),

  calendar: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 9h18" />
    </>
  ),

  content: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),

  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="m16 8 4-4M20 4h-4M20 4v4" />
    </>
  ),

  gift: (
    <>
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13M3 12h18" />
      <path d="M7 8c-2.5-1-2.2-4 0-4 2.5 0 5 4 5 4" />
      <path d="M17 8c2.5-1 2.2-4 0-4-2.5 0-5 4-5 4" />
    </>
  ),

  leaf: (
    <>
      <path d="M20 4C10 4 5 9 5 15c0 3 2 5 5 5 6 0 10-5 10-16Z" />
      <path d="M4 21c3-6 7-9 13-12" />
    </>
  ),
};