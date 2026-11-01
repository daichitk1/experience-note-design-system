# FormActions

Formの操作ボタンと、その結果の通知を近くにまとめる配置の部品です。

- `sm` 未満ではボタンを縦に積んで全幅にし、`sm` 以上では横に並べます。既定は右寄せ（`align="end"`）で、`start`・`between` も選べます。
- `feedback`（`InlineFeedback`）はボタンの上に置きます。間は12px、ボタン同士は8pxです。
- DOMの順・Tabの順・見た目の順を同じにします。`flex-col-reverse` やCSSの `order` で順序を入れ替えません。
- 利用側はButtonを `children` に、任意で `feedback`・`align` を渡します。busyやdisabledは各Buttonが持ち、FormActionsは業務の状態を判断しません。

