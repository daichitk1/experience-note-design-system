export type LoadingStateProps = {
  /** 「記録を読み込んでいます。」のように、何を待っているかを書く。 */
  label: string;
};

/**
 * 読込中の共通表示。
 * 進捗率を装わない。実際に測れない割合を出すと、利用者の待ち時間の判断を誤らせる。
 */
export function LoadingState({ label }: LoadingStateProps) {
  return (
    <p
      aria-live="polite"
      className="m-0 flex min-h-control-standard items-center gap-2 text-sm text-text-muted"
      data-loading-state
      role="status"
    >
      <span
        aria-hidden="true"
        className="block size-2 shrink-0 rounded-full bg-primary"
      />
      {label}
    </p>
  );
}
