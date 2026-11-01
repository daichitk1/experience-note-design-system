import type { ReactNode } from "react";

export type RecordListElement = "ol" | "ul";

export type RecordListProps = {
  /** 順序自体に意味がある一覧だけ`ol`にする。 */
  as?: RecordListElement;
  children: ReactNode;
  className?: string;
  /** 一覧のaccessible name。何の一覧かを示す。 */
  label: string;
};

/**
 * 一覧の面と行区切りの規則。行の中身は`RecordRow`が持つ。
 * Empty / Loading / Errorはこの部品ではなく共通State部品が担当する。
 */
export function RecordList({
  as: Component = "ul",
  children,
  className,
  label,
}: RecordListProps) {
  return (
    <Component
      aria-label={label}
      className={`m-0 list-none divide-y divide-border border-y border-border bg-surface p-0${
        className ? ` ${className}` : ""
      }`}
      data-record-list
    >
      {children}
    </Component>
  );
}
