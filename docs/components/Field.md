# Field

1つの入力のlabel・説明・control・errorを決まった順に並べ、支援技術へ結び付ける部品です。

- 順序は常に label（「必須」「任意」）→ 説明 → control → error です。placeholderをlabelの代わりにしません。
- control: `TextInput`（text・date・monthなどnativeの `type`）、`SearchInput`（`type="search"`）、`Select`、`TextArea`。どれも `color-border` の枠、`radius-note-sm`、`color-surface`、16pxの文字、`standard` 44px か `compact` 40px です。invalidは枠が `color-danger`、disabledは `color-surface-subtle` です。
- 利用側は `id`（control・`-description`・`-error` のIDの元）、`label`、任意の `description`・`error`・`requirement`、子に1つのcontrolを渡します。
- errorがあるとcontrolに `aria-invalid="true"` が付き、errorは `role="alert"` で表示されます。説明とerrorのIDは `aria-describedby` に統合されます。
- local ZodとAPIの `fieldErrors` はpathだけを読み、Feature固定の日本語へ変えます。serverの生のmessageを表示しません。送信後は最初の不正なcontrolへfocusします。
- Page側からcontrolの色・高さ・角丸・invalidの枠を再定義しない。

