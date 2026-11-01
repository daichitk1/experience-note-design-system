import type { ReactNode } from "react";

export type NoticeTone = "info" | "warning" | "privacy" | "demo";

export type NoticeProps = {
  children: ReactNode;
  /** 補足説明。本文を読まなくても安全上の判断ができる内容は、ここへ入れない。 */
  details?: ReactNode;
  detailsLabel?: string;
  title?: string;
  tone?: NoticeTone;
};

// 色だけで種類を伝えないため、可視の短い語を必ず添える。
const tones: Record<NoticeTone, { word: string; surface: string }> = {
  info: { word: "お知らせ", surface: "border-border bg-surface-subtle" },
  warning: { word: "注意", surface: "border-warning/50 bg-warning/10" },
  privacy: { word: "公開範囲", surface: "border-primary/40 bg-primary/10" },
  demo: { word: "体験版", surface: "border-accent/40 bg-surface-subtle" },
};

/**
 * 事前に知らせておく必要のある情報。
 * 安全・公開範囲に関わる本文は常時表示し、disclosureへ隠さない。
 */
export function Notice({
  children,
  details,
  detailsLabel = "詳しく見る",
  title,
  tone = "info",
}: NoticeProps) {
  const { surface, word } = tones[tone];

  return (
    <section
      className={`rounded-note border p-4 text-sm leading-6 ${surface}`}
      data-notice={tone}
    >
      <p className="m-0 flex flex-wrap items-baseline gap-2">
        <span className="border border-current px-1.5 text-xs font-black">
          {word}
        </span>
        {title ? <span className="font-bold">{title}</span> : null}
      </p>
      <div className="mt-2">{children}</div>
      {details ? (
        <details className="mt-3">
          <summary className="cursor-pointer font-semibold">
            {detailsLabel}
          </summary>
          <div className="mt-2 text-text-muted">{details}</div>
        </details>
      ) : null}
    </section>
  );
}
