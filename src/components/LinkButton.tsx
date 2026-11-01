import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export type LinkButtonProps = {
  children: ReactNode;
  href: string;
  leadingIcon?: ReactNode;
  size?: ButtonSize;
  trailingIcon?: ReactNode;
  variant?: ButtonVariant;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href">;

export function LinkButton({
  children,
  className,
  href,
  leadingIcon,
  size = "large",
  trailingIcon,
  variant = "secondary",
  ...rest
}: LinkButtonProps) {
  return (
    <a
      {...rest}
      className={buttonClassName({ className, size, variant })}
      href={href}
    >
      {leadingIcon ? (
        <span aria-hidden="true" className="shrink-0">
          {leadingIcon}
        </span>
      ) : null}
      {children}
      {trailingIcon ? (
        <span aria-hidden="true" className="shrink-0">
          {trailingIcon}
        </span>
      ) : null}
    </a>
  );
}
