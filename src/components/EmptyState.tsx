import type { ReactNode } from "react";

export type EmptyStateVariant = "initial" | "filtered";

export type EmptyStateProps = {
  /** 互換用。新規実装では`primaryAction`を使う。 */
  action?: ReactNode;
  /** 互換用。新規実装では`description`を使う。 */
  children?: ReactNode;
  description?: string;
  /** 一覧初期0件では区切り線と大きな上下余白を省き、案内と次の操作を近づける。 */
  compact?: boolean;
  /** 意味を補う装飾。読み上げ対象にはしない。 */
  icon?: ReactNode;
  /** 「追加する」「条件を解除する」など、この状態を抜ける操作。 */
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  title: string;
  /** `initial`はまだ1件もない状態、`filtered`は絞り込み結果が0件の状態。 */
  variant?: EmptyStateVariant;
};

/**
 * 0件の状態と、その先の導線。
 * 「まだ1件もない」と「条件に合うものがない」を必ず区別する。次の操作を持たない空状態を作らない。
 */
export function EmptyState({
  action,
  children,
  description,
  compact = false,
  icon,
  primaryAction,
  secondaryAction,
  title,
  variant = "initial",
}: EmptyStateProps) {
  const copy = description ?? children;
  const primary = primaryAction ?? action;

  return (
    <div
      className={compact ? "py-2" : "border-t border-border py-8"}
      data-empty-state
      data-empty-variant={variant}
    >
      {icon ? (
        <span aria-hidden="true" className="mb-2 block text-text-muted">
          {icon}
        </span>
      ) : null}
      <h3 className="m-0 text-[1.05rem]">{title}</h3>
      {copy ? (
        <p className="mt-2 mb-0 leading-[1.7] text-text-muted">{copy}</p>
      ) : null}
      {primary || secondaryAction ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {primary}
          {secondaryAction}
        </div>
      ) : null}
    </div>
  );
}
