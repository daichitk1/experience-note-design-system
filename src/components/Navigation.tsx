import type { ComponentType, ReactNode, SVGProps } from "react";

export type NavigationItemState = "idle" | "section" | "page";
export type NavigationLayout = "primary" | "stacked" | "tabs";
export type NavigationIcon = ComponentType<
  Omit<SVGProps<SVGSVGElement>, "children">
>;

export function navigationItemState(
  currentPath: string,
  href: string,
  sectionAware = false,
): NavigationItemState {
  if (currentPath === href) return "page";
  if (sectionAware && currentPath.startsWith(`${href}/`)) return "section";
  return "idle";
}

const listLayouts: Record<NavigationLayout, string> = {
  // #988: 狭い幅・文字拡大では項目を折り返し、横scrollや重なりを作らない。
  primary: "m-0 flex list-none flex-wrap gap-1 p-0 lg:flex-col lg:flex-nowrap",
  stacked: "m-0 grid list-none gap-1 p-0",
  tabs: "m-0 flex list-none flex-wrap gap-x-6 gap-y-2 border-b border-border p-0",
};

export function NavigationList({
  children,
  layout = "stacked",
}: {
  children: ReactNode;
  layout?: NavigationLayout;
}) {
  return <ul className={listLayouts[layout]}>{children}</ul>;
}

export function NavigationSection({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      {children}
    </nav>
  );
}

export function navigationItemClassName({
  className,
  disabled = false,
  layout = "stacked",
  state = "idle",
}: {
  className?: string;
  disabled?: boolean;
  layout?: NavigationLayout;
  state?: NavigationItemState;
} = {}): string {
  const base =
    layout === "tabs"
      ? "relative inline-flex min-h-control-standard items-center border-b-2 px-1 py-2 text-sm no-underline"
      : "relative flex min-h-control-standard w-full items-center justify-center rounded-note-sm border border-transparent px-1.5 py-1 text-center text-xs no-underline lg:justify-start lg:px-3 lg:text-left lg:text-sm";
  const stateClass =
    state === "page"
      ? layout === "tabs"
        ? "border-primary font-bold text-primary"
        : "border-primary/30 bg-primary/10 font-bold text-primary"
      : state === "section"
        ? layout === "tabs"
          ? "border-primary/50 font-bold text-primary"
          : "border-primary/20 bg-surface-subtle font-bold text-primary"
        : layout === "tabs"
          ? "border-transparent font-semibold text-text hover:text-primary"
          : "font-semibold text-text-muted hover:bg-surface-subtle hover:text-text";
  const disabledClass = disabled
    ? " cursor-not-allowed opacity-50"
    : " cursor-pointer";

  return `${base} ${stateClass}${disabledClass}${
    className ? ` ${className}` : ""
  }`;
}

export function NavigationItemVisual({
  icon: Icon,
  label,
  layout = "stacked",
  state = "idle",
}: {
  icon?: NavigationIcon;
  label: string;
  layout?: NavigationLayout;
  state?: NavigationItemState;
}) {
  return (
    <span
      className={`relative flex min-w-0 items-center ${
        layout === "tabs"
          ? "gap-2"
          : "flex-col gap-1 leading-tight lg:flex-row lg:gap-2 lg:leading-normal"
      }`}
    >
      {Icon ? <Icon className="size-4 shrink-0" /> : null}
      <span className="min-w-0 break-keep">{label}</span>
      {layout !== "tabs" && state !== "idle" ? (
        <span
          aria-hidden="true"
          className={`absolute -bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-note-sm bg-primary lg:top-1/2 lg:bottom-auto lg:left-0 lg:w-0.5 lg:translate-x-0 lg:-translate-y-1/2 ${
            state === "page" ? "w-8 lg:h-6" : "w-4 opacity-60 lg:h-4"
          }`}
        />
      ) : null}
    </span>
  );
}
