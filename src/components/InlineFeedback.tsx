import type { ReactNode } from "react";

export type FeedbackTone = "success" | "warning" | "error";

export type InlineFeedbackProps = {
  /** 「体験を見る」「公開ページを見る」のように、この結果の次にできる操作。 */
  action?: ReactNode;
  children: ReactNode;
  /** 支援技術が同じ画面の複数通知を区別するための名前。 */
  label: string;
  tone: FeedbackTone;
};

// 色だけで状態を伝えないため、短い日本語を必ず添える。
const tones: Record<FeedbackTone, { word: string; color: string }> = {
  success: { word: "完了", color: "text-success" },
  warning: { word: "注意", color: "text-warning" },
  error: { word: "エラー", color: "text-danger" },
};

function isEmpty(value: ReactNode): boolean {
  return value === "" || value === null || value === undefined;
}

/**
 * 操作の結果を、その操作の近くで伝える。
 * Page全体の取得失敗は`ErrorState`が担当する。
 */
export function InlineFeedback({
  action,
  children,
  label,
  tone,
}: InlineFeedbackProps) {
  const { color, word } = tones[tone];
  const empty = isEmpty(children);

  return (
    <p
      aria-label={label}
      aria-live={tone === "error" ? undefined : "polite"}
      className={`m-0 flex min-h-6 flex-wrap items-baseline gap-2 font-bold ${color}`}
      data-inline-feedback={tone}
      role={tone === "error" ? "alert" : "status"}
    >
      {empty ? null : (
        <>
          <span className="border border-current px-1.5 text-xs font-black">
            {word}
          </span>
          <span className="min-w-0">{children}</span>
          {action ? <span className="font-semibold">{action}</span> : null}
        </>
      )}
    </p>
  );
}
