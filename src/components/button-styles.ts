export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

export type ButtonSize = "compact" | "standard" | "large";

const buttonBase =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-note-sm border text-center no-underline transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary font-semibold text-white hover:border-primary-strong hover:bg-primary-strong",
  secondary:
    "border-border bg-surface font-semibold text-text hover:bg-surface-subtle",
  ghost:
    "border-transparent bg-transparent font-semibold text-primary hover:bg-primary/10",
  destructive:
    "border-danger bg-surface font-semibold text-danger hover:bg-danger hover:text-white",
};

const buttonSizes: Record<ButtonSize, string> = {
  compact: "min-h-control-compact px-3 text-xs",
  standard: "min-h-control-standard px-4 text-sm",
  large: "min-h-control-large px-5 text-[0.95rem]",
};

const iconButtonSizes: Record<ButtonSize, string> = {
  compact: "size-control-compact p-0 text-sm",
  standard: "size-control-standard p-0 text-base",
  large: "size-control-large p-0 text-lg",
};

type ButtonClassNameOptions = {
  className?: string;
  iconOnly?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function buttonClassName({
  className,
  iconOnly = false,
  size = "large",
  variant = "secondary",
}: ButtonClassNameOptions = {}): string {
  const sizing = iconOnly ? iconButtonSizes[size] : buttonSizes[size];

  return `${buttonBase} ${buttonVariants[variant]} ${sizing}${
    className ? ` ${className}` : ""
  }`;
}
