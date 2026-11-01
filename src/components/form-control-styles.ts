export type FormControlSize = "compact" | "standard";

type ControlClassNameOptions = {
  className?: string;
  grouped?: boolean;
  size?: FormControlSize;
};

const controlBase =
  "box-border w-full min-w-0 max-w-full text-text placeholder:text-text-muted disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-text-muted disabled:opacity-70 aria-invalid:text-text";

const standaloneControl =
  "rounded-note-sm border border-border bg-surface aria-invalid:border-danger";

const groupedControl = "rounded-none border-0 bg-transparent";

const controlSizes: Record<FormControlSize, string> = {
  compact: "min-h-control-compact px-2.5 text-base",
  standard: "min-h-control-standard px-3 text-base",
};

const textAreaSizes: Record<FormControlSize, string> = {
  compact: "min-h-20 p-2.5 text-base",
  standard: "min-h-24 p-3 text-base",
};

export function formControlClassName({
  className,
  grouped = false,
  size = "standard",
}: ControlClassNameOptions = {}): string {
  return `${controlBase} ${
    grouped ? groupedControl : standaloneControl
  } ${controlSizes[size]}${className ? ` ${className}` : ""}`;
}

export function textAreaClassName({
  className,
  grouped = false,
  size = "standard",
}: ControlClassNameOptions = {}): string {
  return `${controlBase} resize-y ${
    grouped ? groupedControl : standaloneControl
  } ${textAreaSizes[size]}${className ? ` ${className}` : ""}`;
}

export function inputGroupClassName({
  className,
  invalid = false,
  size = "standard",
}: {
  className?: string;
  invalid?: boolean;
  size?: FormControlSize;
} = {}): string {
  const height =
    size === "compact" ? "min-h-control-compact" : "min-h-control-standard";

  return `flex w-full min-w-0 items-stretch rounded-note-sm border bg-surface ${height} ${
    invalid ? "border-danger" : "border-border"
  }${className ? ` ${className}` : ""}`;
}
