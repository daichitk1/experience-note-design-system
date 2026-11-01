# Navigation

領域間を移動するリンクの並びです。現在地を `aria-current="page"` と見た目の両方で示します。レイアウトは `primary`・`stacked`・`tabs` の3種類です。

- `primary` はアプリの主要領域の並びです（体験ノートでは「トップ / やりたいこと / 体験 / 設定」）。lg以上は縦のsidebar、lg未満は横に並び、狭い幅や文字の拡大では折り返します。横scrollにしません。
- 項目の高さは `spacing-control-standard`（44px）です。アイコンは16pxの線画で、`aria-hidden` にします。
- 状態は3つです。`page` は現在の画面で、`color-primary` の10%の面と30%の枠、太字、`aria-current="page"`、2pxの `color-primary` の線を付けます。`section` は現在地を含む領域（「設定」の配下など）で、`color-surface-subtle` の面、20%の枠、短く薄い線です。`idle` は `color-text-muted` で、hoverで `color-surface-subtle` に変わります。
- `tabs` は下線のタブです。`page` は2pxの `color-primary` の下線、`section` は50%の下線です。
- 利用側は各項目の `href`・`label`・任意の `icon` と、`navigationItemState(currentPath, href, sectionAware)` で求めた状態を渡します。`NavigationSection` の `label` で `nav` を名付けます（「体験ノートの領域」）。
- 表示・非表示を認可の代わりにしません。

