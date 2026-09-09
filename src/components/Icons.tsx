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