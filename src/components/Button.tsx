import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export type { ButtonSize, ButtonVariant } from "./button-styles";

export type ButtonProps = {
  busy?: boolean;
  busyLabel?: string;
  children: ReactNode;
  leadingIcon?: ReactNode;
  size?: ButtonSize;
  trailingIcon?: ReactNode;
  variant?: ButtonVariant;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function Button({
  busy = false,
  busyLabel,
  children,
  className,
  disabled,
  leadingIcon,
  size = "large",
  trailingIcon,
  type = "button",
  variant = "secondary",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      aria-busy={busy ? "true" : undefined}
      className={buttonClassName({ className, size, variant })}
      disabled={disabled === true || busy}
      type={type}
    >
      {leadingIcon ? (
        <span aria-hidden="true" className="shrink-0">
          {leadingIcon}
        </span>
      ) : null}
      {busy && busyLabel ? busyLabel : children}
      {trailingIcon ? (
        <span aria-hidden="true" className="shrink-0">
          {trailingIcon}
        </span>
      ) : null}
    </button>
  );
}
