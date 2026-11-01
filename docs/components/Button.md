# Button

その場で処理する文字付きの操作です。別URLへ移るCTAは、同じ見た目を `<a>` に付けた `LinkButton` を使います。

## 使い分け
- `primary`（`color-primary` の塗り、`color-white` の文字）はその画面の主要操作です。原則1画面に1つです。
- `secondary`（`color-border` の輪郭）は主要操作に添える操作です。
- `ghost`（透明、`color-primary` の文字）は行内やToolbarの軽い補助操作です。
- `destructive`（`color-danger` の輪郭と文字、hoverで塗り）は削除など取り消せない操作です。何を消すかをlabelに書きます。
- size: `large` 48pxはPrimary actionとMarketing CTA、`standard` 44pxは通常の操作、`compact` 40pxは一覧行の中の操作です。移行中は未指定が `large` になるため、sizeを明示します。

## 利用側が渡すもの
- `children`: 動詞で終わる可視の文字（「保存する」「やりたいことを入力する」）。
- `busy` と `busyLabel`（「保存中…」「削除中…」）: 二重操作を止め、`aria-busy="true"` を付けてdisabledにします。
- `leadingIcon`・`trailingIcon`: 装飾で、`aria-hidden` になります。
- `type` の既定は `button` です。Form送信だけ `type="submit"` にします。
- `className` で変えてよいのはmargin・width・responsive配置だけです。色・高さ・角丸・hover・font weightを上書きしません。

## しないこと
- 文中の通常のリンクをButton風にしない。
- 同じ重要度に見えるPrimary Buttonを1画面に2つ置かない。

