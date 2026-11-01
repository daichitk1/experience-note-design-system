import type { ReactNode } from "react";

export type RecordToolbarProps = {
  /** 一覧に対する追加操作。件数の右側へ置く。 */
  actions?: ReactNode;
  /** 絞り込み条件を解除する操作。条件が有効なときだけ渡す。 */
  clearAction?: ReactNode;
  /** 「12件表示しています。」のような可視の件数文言。 */
  count?: ReactNode;
  /** 件数通知のaccessible name。支援技術が同じ画面の複数通知を区別できるようにする。 */
  countLabel?: string;
  /** 期限・月・公開状態などの絞り込みControl。 */
  filters?: ReactNode;
  /** Toolbar全体のaccessible name。画面ごとに何の絞り込みかを示す。 */
  label: string;
  /** 検索と少数の絞り込み操作をMobileでも横に並べ、狭い場合は折り返す。 */
  layout?: "stacked" | "inline";
  /** 検索Control。`SearchInput`を想定する。 */
  search?: ReactNode;
};

/**
 * 一覧の検索・絞り込み・件数・補助操作の配置規則。
 * 何で絞り込むか、件数をどう数えるかはFeature側が決める。
 */
export function RecordToolbar({
  actions,
  clearAction,
  count,
  countLabel,
  filters,
  label,
  layout = "stacked",
  search,
}: RecordToolbarProps) {
  const hasSummary =
    count !== undefined || clearAction !== undefined || actions !== undefined;

  return (
    <div
      aria-label={label}
      className={
        layout === "inline"
          ? "flex min-w-0 flex-wrap items-end gap-2"
          : "flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center"
      }
      data-record-toolbar
      role="group"
    >
      {search ? (
        <div
          className={
            layout === "inline"
              ? "min-w-0 basis-40 grow md:basis-60 md:grow-0"
              : "min-w-0 md:w-60 md:shrink-0"
          }
        >
          {search}
        </div>
      ) : null}
      {filters ? (
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {filters}
        </div>
      ) : null}
      {hasSummary ? (
        <div className="flex min-w-0 flex-wrap items-center gap-2 md:ml-auto">
          {count !== undefined ? (
            <p
              aria-label={countLabel}
              aria-live="polite"
              className="m-0 min-w-0 text-xs text-text-muted"
              role="status"
            >
              {count}
            </p>
          ) : null}
          {clearAction}
          {actions}
        </div>
      ) : null}
    </div>
  );
}
