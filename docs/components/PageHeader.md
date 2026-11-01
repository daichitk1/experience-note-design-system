# PageHeader

画面のh1をまとめる見出し部品です。置かれるShellに合わせて `WorkspacePageHeader`・`PublicPageHeader`・`MarketingPageHeader` を選びます。

- Workspace: 明朝の `workspace-title`（24px、md以上28px）、件数「N件」、`color-text-muted` の短い説明、右上のPrimary action（`sm` 未満は縦積み）。英語のkickerは付けません。
- Public: 明朝の `public-title`（30px、md以上36px）、`lead`、作成者・日付などの `meta` を `container-article` の幅に置きます。
- Marketing: 任意の `eyebrow`（`color-primary`）、明朝の `marketing-title`（weight 500）、`lead`、Primary action。
- 利用側は `id`（h1は `${id}-title` になりheaderを名付けます）、`title`、上の任意の要素を渡します。
- Page側から見出しの文字サイズ・色・余白を上書きしない。画面名は必ずh1にする。

