# Dialog

操作の確認や短い入力を、画面の上に重ねて受け付けるmodalです。確認だけなら、Dialogに2つのButtonを組んだ `ConfirmDialog` を使います。

- 面は `color-surface`、`color-border` の枠、`radius-note`、`shadow-note` です。背景は `color-text` の35%で暗くします。強い影やglowは使いません。
- 幅は `small`（最大24rem、既定）と `medium`（28rem）です。高さは画面から2remを引いた分までで、中身はDialogの中でscrollします。
- 見出しは明朝の20px・600（行の高さ28px）、説明は14pxの `color-text-muted` です。順序は 見出し → 説明 → 中身 → footer です。
- `ConfirmDialog` のfooterは `FormActions` で、「キャンセル」（secondary）→ 確定（`confirmVariant`、既定primary）の順に並べます。確定の文言は動詞で書きます（「やりたいことへ戻す」）。取り消せない操作は `destructive` にし、中に `Notice tone="warning"` で変わることを書きます。
- 利用側は `title`・`onClose`、任意の `description`・`children`・`footer`・`size`・`busy`・`accessibleLabel` を渡します。`ConfirmDialog` には `confirmLabel`・`onConfirm`・`onCancel`・`busyLabel`（「戻しています…」）・`confirmDisabled`・`focusConfirm` も渡します。
- 開くと `data-dialog-initial-focus` の要素か最初の操作へfocusし、閉じると開いた元へ戻します。Escで閉じますが、`busy` の間は閉じません。
- 未保存の入力がある画面から離れるときは `LeaveConfirmDialog` を使います。見出し「保存していない変更があります」、説明「移動すると、この画面で保存していない入力は失われます。」、操作「編集を続ける」→「破棄して移動」（destructive）です。
- 破壊操作で `focusConfirm={false}` にすると、最初のfocusが確定ボタンではなく安全な側に置かれます。

