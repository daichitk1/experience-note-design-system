import { Button } from "./Button";

export type ErrorStateScope = "page" | "operation";

export type ErrorStateProps = {
  /**
   * 利用者が読んで次に何をすればよいか分かる短い文。
   * requestId・stack・status code・内部の理由は渡さない。
   */
  description: string;
  /** 再試行して回復し得るときだけ渡す。渡さない場合はRetryを出さない。 */
  onRetry?(): void;
  retryLabel?: string;
  /** `page`は画面全体の取得失敗、`operation`は特定操作の失敗。 */
  scope?: ErrorStateScope;
  title: string;
};

const scopes: Record<ErrorStateScope, string> = {
  page: "border-t border-border py-8",
  operation: "rounded-note border border-danger/60 bg-surface p-4",
};

/**
 * 取得・操作の失敗表示。
 * 認証切れ・権限なし・not foundは`SystemStatePage`が担当し、ここでは扱わない。
 */
export function ErrorState({
  description,
  onRetry,
  retryLabel = "再試行する",
  scope = "page",
  title,
}: ErrorStateProps) {
  return (
    <div
      className={scopes[scope]}
      data-error-scope={scope}
      data-error-state
      role="alert"
    >
      <h3 className="m-0 text-[1.05rem] text-danger">{title}</h3>
      <p className="mt-2 mb-0 leading-[1.7] text-text-muted">{description}</p>
      {onRetry ? (
        <div className="mt-4">
          <Button onClick={onRetry} size="standard" variant="secondary">
            {retryLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
