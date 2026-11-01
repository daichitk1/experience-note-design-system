# Badge

公開中・非公開・期限ありなど、記録の状態を示す短い可視labelです。toneは5種類です。

- `neutral` は `color-surface-subtle` の面に `color-text-muted` の文字です。`primary`・`success`・`warning`・`danger` は、その色の文字、10%の面、30%の枠です。
- 利用側は必須の文字列 `children` を渡します。状態は色ではなく語で読めるようにします。
- Badgeは表示だけを担当します。状態の判定はFeature側で行い、labelとtoneを渡します。
- 角は `radius-note-sm` です。pill（`rounded-full`）にしません。

