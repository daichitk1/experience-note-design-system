import type { SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

// 装飾用の線画icon。文字の代わりに使わず、常にaria-hidden。
function baseProps(props: IconProps): IconProps {
  return {
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.6,
    viewBox: "0 0 24 24",
    ...props,
  };
}

export function PencilIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 20.5 4.7 17 15.3 6.4a1.8 1.8 0 0 1 2.6 0l1.7 1.7a1.8 1.8 0 0 1 0 2.6L9 21.3 4 20.5Z" />
      <path d="m13.5 8.2 2.3 2.3" />
    </svg>
  );
}

export function MountainIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m3.5 18 6-9.6 4.3 5.7" />
      <path d="m11.5 18 6-10 3 10" />
      <circle cx="15.7" cy="6.5" r="1.3" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 5.5c1.8-1 4.4-1 6.5 0v13c-2.1-1-4.7-1-6.5 0v-13Z" />
      <path d="M17 5.5c-1.8-1-4.4-1-6.5 0v13c2.1-1 4.7-1 6.5 0v-13Z" />
      <path d="M17 5.5c1.1-.6 2-.8 3-.6v13c-1-.2-1.9 0-3 .6" />
    </svg>
  );
}

export function ListIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01" />
      <path d="M9 6.5h10.5M9 12h10.5M9 17.5h10.5" />
    </svg>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect height="12" rx="1.4" width="18" x="3" y="4" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </svg>
  );
}

export function MoreIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="5.5" cy="12" fill="currentColor" r="1.5" stroke="none" />
      <circle cx="12" cy="12" fill="currentColor" r="1.5" stroke="none" />
      <circle cx="18.5" cy="12" fill="currentColor" r="1.5" stroke="none" />
    </svg>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
