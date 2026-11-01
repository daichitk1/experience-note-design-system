# IconButton

行のmenu `⋯` などに使う、アイコンだけの正方形の補助操作です。

- 一覧やToolbarの補助操作に使います。`primary` は受け取りません。主要操作には必ず可視の文字を付けます。
- 利用側は `icon`（`src/components/icons.tsx` の線画。`aria-hidden` で描画）と、必須の `label`（accessible name）を渡します。行ごとに並ぶときは対象を名前に含めます（「「京都で朝の散歩をする」の操作」）。
- 既定は `ghost`・`standard`（44 × 44px）です。行の中では `compact`（40px）にします。
- `busy` と `busyLabel` で名前を切り替え、disabledにします。

