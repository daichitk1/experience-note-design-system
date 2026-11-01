# CharacterCount

入力中の文字数と上限を「N/M文字」で、入力欄の右下に示す表示です。

- 12pxの `color-text-muted` で右寄せです。上限を超えると600の `color-danger` になります。色だけでなく数字でも超過が分かります。
- 文字数はJavaScriptの文字列長（UTF-16）で数え、APIの契約の上限と同じ数え方にします。
- 利用側は `max` と `value` を渡します。超過時の送信を止めるかどうかと、errorの文言はFieldとFeature側が決めます。

