# Surface

意味のある面の枠・背景・角丸・影・余白をまとめた部品です。variantは5種類です。

- `outlined` は通常のForm・設定、`subtle` は補助説明、`raised`（`shadow-note-soft`）はDialog内、`danger` は破壊操作の説明、`plain` は見た目のない意味上のまとまりです。
- paddingは `none`、`compact`（16px）、`standard`（20px、`sm` 以上24px）です。角は `radius-note` です。
- 利用側は `children` と、landmarkに合う `as`（`div`・`section`・`article`・`aside`）を渡します。
- 一覧の行を1つずつSurfaceにしない。Page側から枠・背景・角丸・影を再定義しない。

