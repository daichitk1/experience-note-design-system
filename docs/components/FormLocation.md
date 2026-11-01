# FormLocation

記入画面で、戻る先の一覧と今の操作を「← 一覧 / 今の操作」の形で示す現在位置です。単独の戻るリンクは `BackLink` です。

- `BackLink` は `color-primary` の14px・600、下線（offset 4px）で、先頭に `aria-hidden` の「←」を付けます。高さは `spacing-control-standard` です。
- `FormLocation` は `nav`（「記入画面の現在位置」）の中の `ol` で、区切りの「/」は `color-text-muted`・`aria-hidden`、今の操作は600で `aria-current="page"` です。色に頼らず位置を示します。
- 利用側は `href`・`listLabel`（「やりたいこと」）・`current`（「やりたいことを入力する」）を渡します。`BackLink` には `href` と `label` を渡します。

