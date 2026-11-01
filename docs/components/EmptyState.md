# EmptyState

一覧が0件のときに、今の状態と次の操作を示す部品です。

- 「まだ1件もない」（`variant="initial"`）と「条件に合うものがない」（`variant="filtered"`）を必ず分けます。initialには最初の1件を作る導線、filteredには条件を解除する導線を置きます。
- 見出しは `state-title`（1.05rem）、説明は `color-text-muted`（行の高さ1.7）です。上に `color-border` の区切り線、上下32pxの余白を取ります。一覧の初期0件では `compact` で線と余白を省きます。
- 利用側は `title`、任意の `description`、`primaryAction`・`secondaryAction`、`icon`（意味を補うときだけ。`aria-hidden`）、`compact` を渡します。
- 次の操作を持たない空の状態を作りません。

文言の例は brand book の「文言」の表を参照します。

