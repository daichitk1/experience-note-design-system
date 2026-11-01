# RowActionMenu

一覧の行の補助操作を `⋯` のボタンにまとめるmenuです。

- triggerは `ghost`・`standard` の `IconButton` と同じ見た目で、16pxの `more` アイコンです。`aria-haspopup="menu"`・`aria-expanded` を持ちます。
- menuは `color-surface` の面、`color-border` の枠、`radius-note-sm`、`shadow-note` です。triggerの右端にそろえ、幅は最小10remです。
- 項目は高さ `spacing-control-compact`（40px）、14px・600です。`destructive` の項目は `color-danger` の文字で、hoverで10%の面になります。disabledは60%の濃さです。
- 利用側は `label`（「「◯◯」の操作」のように対象を含める）、`items`（`label` と、`href` か `onSelect` のどちらか、任意の `tone`・`disabled`）、任意の `triggerId` を渡します。画面遷移する項目は `href` にしてリンクとして描画します。
- 開くと最初の有効な項目へfocusします。↑↓・Home・Endで移動し、Escで閉じてtriggerへfocusを戻します。外側のクリックでも閉じます。
- 項目から開いたDialogを閉じたら、`triggerId` の要素へfocusを戻します。

