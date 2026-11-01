import type { InputHTMLAttributes, Ref } from "react";
import { formControlClassName } from "./form-control-styles";
import type { FieldControlProps } from "./form-control-types";

export type TextInputProps = FieldControlProps & {
  /** focusを戻す先を呼び出し側が決められるようにする。 */
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "size">;

export function TextInput({
  className,
  controlSize = "standard",
  grouped = false,
  type = "text",
  ...rest
}: TextInputProps) {
  // 日付系controlのnative外観は、iOSでCSSの幅・余白と干渉する。
  // typeとpickerは残し、外枠と内部の表示領域をCSSで揃える。
  const calendarInput = [
    "date",
    "datetime-local",
    "month",
    "time",
    "week",
  ].includes(type);
  const inputClassName = calendarInput
    ? `block appearance-none [&::-webkit-date-and-time-value]:min-h-[1.5em] [&::-webkit-date-and-time-value]:min-w-0 [&::-webkit-date-and-time-value]:text-left${className ? ` ${className}` : ""}`
    : className;
  return (
    <input
      {...rest}
      className={formControlClassName({
        className: inputClassName,
        grouped,
        size: controlSize,
      })}
      type={type}
    />
  );
}

export type SearchInputProps = Omit<TextInputProps, "type">;

export function SearchInput(props: SearchInputProps) {
  return <TextInput {...props} type="search" />;
}
