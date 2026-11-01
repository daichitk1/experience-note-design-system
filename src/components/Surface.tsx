import type { HTMLAttributes, ReactNode } from "react";

export type SurfaceVariant =
  "plain" | "outlined" | "subtle" | "raised" | "danger";

export type SurfacePadding = "none" | "compact" | "standard";

type SurfaceElement = "div" | "section" | "article" | "aside";

export type SurfaceProps = {
  as?: SurfaceElement;
  children: ReactNode;
  padding?: SurfacePadding;
  variant?: SurfaceVariant;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

const variants: Record<SurfaceVariant, string> = {
  plain: "bg-transparent",
  outlined: "rounded-note border border-border bg-surface",
  subtle: "rounded-note border border-transparent bg-surface-subtle",
  raised: "rounded-note border border-border/70 bg-surface shadow-note-soft",
  danger: "rounded-note border border-danger/60 bg-surface",
};

const paddings: Record<SurfacePadding, string> = {
  none: "p-0",
  compact: "p-4",
  standard: "p-5 sm:p-6",
};

export function Surface({
  as: Component = "div",
  children,
  className,
  padding = "standard",
  variant = "outlined",
  ...rest
}: SurfaceProps) {
  return (
    <Component
      {...rest}
      className={`${variants[variant]} ${paddings[padding]}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </Component>
  );
}
