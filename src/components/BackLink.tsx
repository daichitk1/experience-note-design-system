/** UX-NAV-HEADER-001 (#785): 上位画面へ戻る導線。主操作と競合しない控えめな文字リンク。 */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="inline-flex min-h-control-standard items-center gap-1 self-start text-sm font-semibold text-primary underline underline-offset-4"
      data-back-link
      href={href}
    >
      <span aria-hidden="true">←</span>
      {label}
    </a>
  );
}
