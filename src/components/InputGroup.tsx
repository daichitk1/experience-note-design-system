import { cloneElement, type ReactElement, type ReactNode } from "react";
import {
  inputGroupClassName,
  type FormControlSize,
} from "./form-control-styles";
import type { FieldControlProps } from "./form-control-types";

type GroupableControlProps = FieldControlProps & {
  className?: string;
};

export type InputGroupProps = FieldControlProps & {
  children: ReactElement<GroupableControlProps>;
  className?: string;
  controlSize?: FormControlSize;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

function mergeIds(...values: Array<string | undefined>): string | undefined {
  const ids = values
    .flatMap((value) => value?.split(/\s+/u) ?? [])
    .filter(Boolean);

  return ids.length > 0 ? [...new Set(ids)].join(" ") : undefined;
}

function isInvalid(value: FieldControlProps["aria-invalid"]): boolean {
  return value !== undefined && value !== false && value !== "false";
}

export function InputGroup({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  children,
  className,
  controlSize = "standard",
  id,
  prefix,
  required,
  suffix,
}: InputGroupProps) {
  const effectiveInvalid = ariaInvalid ?? children.props["aria-invalid"];
  const control = cloneElement(children, {
    "aria-describedby": mergeIds(
      children.props["aria-describedby"],
      ariaDescribedBy,
    ),
    "aria-invalid": effectiveInvalid,
    controlSize,
    grouped: true,
    id: id ?? children.props.id,
    required: required ?? children.props.required,
  });

  return (
    <div
      className={inputGroupClassName({
        className,
        invalid: isInvalid(effectiveInvalid),
        size: controlSize,
      })}
    >
      {prefix ? (
        <span className="flex shrink-0 items-center border-r border-border bg-surface-subtle px-3 text-sm text-text-muted">
          {prefix}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-1 items-stretch">{control}</div>
      {suffix ? (
        <span className="flex shrink-0 items-center border-l border-border bg-surface-subtle px-3 text-sm text-text-muted">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}
