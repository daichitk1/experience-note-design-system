import { cloneElement, type ReactElement, type ReactNode } from "react";
import type { FieldControlProps } from "./form-control-types";

export type FieldRequirement = "required" | "optional";

export type FieldProps = {
  children: ReactElement<FieldControlProps>;
  className?: string;
  description?: ReactNode;
  error?: ReactNode;
  id: string;
  label: ReactNode;
  requirement?: FieldRequirement;
};

function hasContent(value: ReactNode): boolean {
  return (
    value !== undefined &&
    value !== null &&
    value !== "" &&
    typeof value !== "boolean"
  );
}

function mergeIds(...values: Array<string | undefined>): string | undefined {
  const ids = values
    .flatMap((value) => value?.split(/\s+/u) ?? [])
    .filter(Boolean);

  return ids.length > 0 ? [...new Set(ids)].join(" ") : undefined;
}

export function Field({
  children,
  className,
  description,
  error,
  id,
  label,
  requirement,
}: FieldProps) {
  const descriptionVisible = hasContent(description);
  const errorVisible = hasContent(error);
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const controlId = children.props.id ?? id;
  const describedBy = mergeIds(
    children.props["aria-describedby"],
    descriptionVisible ? descriptionId : undefined,
    errorVisible ? errorId : undefined,
  );
  const required =
    requirement === "required"
      ? true
      : requirement === "optional"
        ? false
        : children.props.required;

  const control = cloneElement(children, {
    "aria-describedby": describedBy,
    "aria-invalid": errorVisible ? true : children.props["aria-invalid"],
    id: controlId,
    required,
  });

  return (
    <div
      className={`grid min-w-0 grid-cols-[minmax(0,1fr)] gap-1.5${className ? ` ${className}` : ""}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label className="text-sm font-bold text-text" htmlFor={controlId}>
          {label}
        </label>
        {requirement ? (
          <span className="text-xs font-semibold text-text-muted">
            {requirement === "required" ? "必須" : "任意"}
          </span>
        ) : null}
      </div>

      {descriptionVisible ? (
        <p className="m-0 text-xs leading-5 text-text-muted" id={descriptionId}>
          {description}
        </p>
      ) : null}

      {control}

      {errorVisible ? (
        <p
          className="m-0 text-xs leading-5 font-semibold text-danger"
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
