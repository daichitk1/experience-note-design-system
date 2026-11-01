import type { ReactNode } from "react";

export type FormActionsAlign = "start" | "end" | "between";

export type FormActionsProps = {
  align?: FormActionsAlign;
  children: ReactNode;
  className?: string;
  feedback?: ReactNode;
};

const alignment: Record<FormActionsAlign, string> = {
  start: "sm:justify-start",
  end: "sm:justify-end",
  between: "sm:justify-between",
};

export function FormActions({
  align = "end",
  children,
  className,
  feedback,
}: FormActionsProps) {
  return (
    <div className={`grid gap-3${className ? ` ${className}` : ""}`}>
      {feedback ? <div>{feedback}</div> : null}
      <div
        className={`flex flex-col gap-2 [&>*]:w-full sm:flex-row sm:flex-wrap sm:items-center sm:[&>*]:w-auto ${alignment[align]}`}
      >
        {children}
      </div>
    </div>
  );
}
