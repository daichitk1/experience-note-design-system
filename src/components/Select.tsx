import type { SelectHTMLAttributes } from "react";
import { formControlClassName } from "./form-control-styles";
import type { FieldControlProps } from "./form-control-types";

export type SelectProps = FieldControlProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">;

export function Select({
  className,
  controlSize = "standard",
  grouped = false,
  ...rest
}: SelectProps) {
  return (
    <select
      {...rest}
      className={formControlClassName({
        className,
        grouped,
        size: controlSize,
      })}
    />
  );
}
