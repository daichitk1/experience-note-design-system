import type { HTMLAttributes } from "react";

export type BadgeTone =
  "neutral" | "primary" | "success" | "warning" | "danger";

export type BadgeProps = {
  children: string;
  tone?: BadgeTone;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children">;

const tones: Record<BadgeTone, string> = {
  neutral: "border-border bg-surface-subtle text-text-muted",
  primary: "border-primary/30 bg-primary/10 text-primary",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-danger/30 bg-danger/10 text-danger",
};

export function Badge({
  children,
  className,
  tone = "neutral",
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      className={`inline-flex min-h-6 items-center rounded-note-sm border px-2 py-0.5 text-xs font-semibold ${tones[tone]}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </span>
  );
}
