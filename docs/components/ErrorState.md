# ErrorState

Dataの取得・再取得に失敗したときに、何が起きたかと回復の手段を示す部品です。

- `scope="page"` は初回取得の失敗です（上に区切り線、上下32px）。`scope="operation"` は表示中のDataを残したままの再取得の失敗です（`color-danger` の60%の枠、`radius-note`、16pxの余白）。
- 見出しは `color-danger` の `state-title`、説明は `color-text-muted` です。`role="alert"` で伝えます。
- 利用側は `title`、`description`（次に何をすればよいかが分かる短い文）、再試行で回復し得るときだけ `onRetry`、任意の `retryLabel`（既定「再試行する」）を渡します。
- requestId・stack・HTTP status・内部の名前を表示しません。401・403・404は全画面の状態ページへ分けます。
- 保存・公開などの操作の失敗には使いません。操作の結果は `InlineFeedback` に出します。

