# Notice

操作の前に知らせる注意・公開範囲・体験版の制約を、語の付いた面で常に表示する部品です。

- toneと語: `info`「お知らせ」（`color-surface-subtle`）、`warning`「注意」（`color-warning` の10%の面、50%の枠）、`privacy`「公開範囲」（`color-primary` の10%の面、40%の枠）、`demo`「体験版」（`color-surface-subtle` に `color-accent` の40%の枠）。
- 利用側は `children`（本文）、任意の `title`、`details`（補足）、`detailsLabel`（既定「詳しく見る」）を渡します。
- 安全と公開範囲に関わる本文は常に表示し、`details` に隠しません。
- Noticeは操作前の説明です。操作後の成功・失敗には `InlineFeedback` を使います。
- Guestの記録をserver認証済み・実公開済みに見せません。

