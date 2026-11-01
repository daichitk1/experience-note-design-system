import type { ReactNode } from "react";

export type RecordRowProps = {
  /** 行の補助操作。`RowActionMenu`か少数のButtonを想定する。 */
  actions?: ReactNode;
  /** 編集Formや削除確認など、行の下へ展開する領域。 */
  children?: ReactNode;
  /** 行の主操作または視覚要素。達成の丸、著者の頭文字など。 */
  leading?: ReactNode;
  /** 日付や作成者などの短い補足。 */
  meta?: ReactNode;
  metaFirst?: boolean;
  /** 体験一覧ではタイトル・補足・抜粋・操作を縦に読む。既定の行は変更しない。 */
  layout?: "default" | "stacked";
  /** UX2-FORM-SAFETY-001: 直前に記入画面で保存した行。色だけに頼らず見出し横の文言でも示す。 */
  recentlySaved?: boolean;
  /** 公開用コメントなどの本文抜粋。 */
  summary?: ReactNode;
  /** 公開中・期限などの`Badge`。複数渡してよい。 */
  status?: ReactNode;
  title: ReactNode;
  /** 行見出しを他の要素から参照するときのid。 */
  titleId?: string;
  /**
   * 行見出しの階層。既定は`h3`。
   * 月などの見出しで一覧を区切る画面では`4`を渡し、見出しの入れ子を正しく保つ。
   */
  titleLevel?: 3 | 4;
};

/**
 * 一覧行のVisual grammar。
 * 表示してよいか、操作してよいかの判断はFeature側が行い、この部品は結果を並べるだけ。
 */
export function RecordRow({
  actions,
  children,
  leading,
  meta,
  metaFirst = false,
  layout = "default",
  recentlySaved = false,
  status,
  summary,
  title,
  titleId,
  titleLevel = 3,
}: RecordRowProps) {
  const stacked = layout === "stacked";
  const Title = `h${titleLevel}` as const;

  return (
    <li
      className={
        recentlySaved
          ? `min-h-record-row border-l-2 border-primary pl-3 ${stacked ? "py-2" : "py-3"}`
          : `min-h-record-row ${stacked ? "py-2" : "py-3"}`
      }
      data-record-layout={stacked ? "stacked" : undefined}
      data-record-row
      data-recently-saved={recentlySaved ? "true" : undefined}
    >
      <div className="flex min-h-record-row items-start gap-3">
        {leading ? <div className="shrink-0">{leading}</div> : null}
        <div
          className={
            stacked
              ? "grid min-w-0 flex-1 grid-cols-1 gap-1"
              : "grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1"
          }
        >
          {meta && metaFirst && !stacked ? (
            <div className="col-start-1 row-start-1 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
              {meta}
            </div>
          ) : null}
          <div
            className={
              stacked
                ? "min-w-0"
                : `col-span-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 sm:col-span-1 ${metaFirst ? "row-start-2" : "row-start-1"}`
            }
          >
            <Title
              className="m-0 min-w-0 break-words font-sans text-record-title font-semibold [overflow-wrap:anywhere]"
              id={titleId}
            >
              {title}
            </Title>
            {status && !stacked ? (
              <span className="flex flex-wrap items-center gap-1">
                {status}
              </span>
            ) : null}
          </div>
          {(meta || (stacked && status)) && (!metaFirst || stacked) ? (
            <div
              className={
                stacked
                  ? "flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted"
                  : "col-start-1 row-start-2 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted"
              }
            >
              {meta}
              {stacked ? status : null}
            </div>
          ) : null}
          {summary ? (
            <p
              className={
                stacked
                  ? "m-0 line-clamp-3 break-words whitespace-pre-wrap text-sm leading-6 text-text"
                  : "col-span-2 col-start-1 row-start-3 mt-1.5 mb-0 line-clamp-3 break-words whitespace-pre-wrap text-sm leading-6 text-text sm:col-span-1"
              }
            >
              {summary}
            </p>
          ) : null}
          {actions ? (
            <div
              className={
                stacked
                  ? "flex flex-wrap items-center justify-end gap-2"
                  : `col-start-2 flex items-center justify-end gap-2 sm:row-span-3 sm:row-start-1 ${metaFirst ? "row-start-1" : "row-start-2"}`
              }
            >
              {actions}
            </div>
          ) : null}
        </div>
      </div>
      {children ? <div className="pt-2 pb-1">{children}</div> : null}
    </li>
  );
}
