import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export type IconButtonProps = {
  busy?: boolean;
  busyLabel?: string;
  icon: ReactNode;
  label: string;
  size?: ButtonSize;
  variant?: Exclude<ButtonVariant, "primary">;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "children">;

export function IconButton({
  busy = false,
  busyLabel,
  className,
  disabled,
  icon,
  label,
  size = "standard",
  type = "button",
  variant = "ghost",
  ...rest
}: IconButtonProps) {
  const accessibleLabel = busy && busyLabel ? busyLabel : label;

  return (
    <button
      {...rest}
      aria-busy={busy ? "true" : undefined}
      aria-label={accessibleLabel}
      className={buttonClassName({ className, iconOnly: true, size, variant })}
      disabled={disabled === true || busy}
      type={type}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}
