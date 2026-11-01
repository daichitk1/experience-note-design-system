# InputGroup

`/u/` などのprefix・suffixと入力欄を1つの外枠にまとめる部品です。

- prefix・suffixは `color-surface-subtle` の面に `color-text-muted` の14pxの文字で、入力欄との間に `color-border` の線を引きます。
- 内部のcontrolには `grouped` が渡り、枠と角丸が二重になりません。外枠が `radius-note-sm` の枠を持ちます。
- 利用側は子に1つのcontrolと、任意の `prefix`・`suffix`・`controlSize` を渡します。`id`・`required`・`aria-describedby`・`aria-invalid` は内部のcontrolへ転送されます。
- Fieldか内部controlのどちらかがinvalidなら、外枠が `color-danger` になります。
- prefix・suffixは値を加工しません。表示する内容はFeature側が渡します。

