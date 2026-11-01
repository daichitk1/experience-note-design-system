/**
 * UX2-PRIVATE-NOTE-001 (#793): 入力中の文字数と上限。
 * 契約のmaxと同じくJavaScriptの文字列長（UTF-16）で数える。
 */
export function CharacterCount({ max, value }: { max: number; value: string }) {
  const over = value.length > max;
  return (
    <p
      className={`m-0 text-right text-xs ${over ? "font-semibold text-danger" : "text-text-muted"}`}
      data-character-count
    >
      {value.length}/{max}文字
    </p>
  );
}
