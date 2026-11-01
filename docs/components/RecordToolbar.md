# RecordToolbar

一覧の上に、検索・絞り込み・件数・補助操作を決まった並びで置く部品です。

- md以上は 検索（幅15rem）→ 絞り込み → 右寄せの件数と操作 の横一列です。md未満は縦に積みます。`layout="inline"` では検索と少数の絞り込みをモバイルでも横に並べ、狭い幅では折り返します。
- 件数は12pxの `color-text-muted` の文で、`role="status"`・`aria-live="polite"` で読み上げます（「12件表示・続きあり」）。
- 利用側は `label`（何の絞り込みかを示す `group` の名前）と、任意の `search`（`SearchInput`）・`filters`・`count`・`countLabel`・`clearAction`（条件が有効なときだけ）・`actions` を渡します。
- 何で絞り込むか、件数をどう数えるかはFeature側が決めます。条件に合う行が0件なら、一覧の代わりに `EmptyState variant="filtered"` を出します。

