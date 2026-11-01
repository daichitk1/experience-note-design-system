# LoadingState

何を待っているかを可視の文で示し、読み上げる読込中の表示です。

- `color-primary` の8pxの点と、14pxの `color-text-muted` の文を、44pxの高さに並べます。`role="status"`・`aria-live="polite"` です。
- 利用側は `label` を渡します。何を待っているかを書きます（「記録を読み込んでいます。」「ログイン状態を確認しています。」）。
- 進捗率を装いません。測れない割合を出しません。
- Data領域の中に置き、HeaderやNavigationまで置き換えません。
- 一覧の読込中は `RecordsLoadingState` を使います。`LoadingState` の下に、一覧と同じ区切り線で3行分の `color-surface-subtle` の帯を並べ、`aria-busy="true"` にします。帯は飾りで `aria-hidden` です。高さを一覧に合わせ、読み込み後に画面が跳ねないようにします。

