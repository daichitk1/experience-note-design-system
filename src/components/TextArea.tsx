import type { TextareaHTMLAttributes } from "react";
import { textAreaClassName } from "./form-control-styles";
import type { FieldControlProps } from "./form-control-types";

export type TextAreaProps = FieldControlProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({
  className,
  controlSize = "standard",
  grouped = false,
  ...rest
}: TextAreaProps) {
  return (
    <textarea
      {...rest}
      className={textAreaClassName({
        className,
        grouped,
        size: controlSize,
      })}
    />
  );
}
