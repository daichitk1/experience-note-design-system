# 体験ノート デザインガイドライン

体験ノートは、やりたいことを書き、やり終えたら体験として残す記録サービスです。画面の主役は装飾ではなく、利用者が書いた「やりたいこと」と「やったこと」です。落ち着いて記録し、あとから読み返せる見た目を守ります。

このシステムの値は `src/theme.css` の `@theme` が正本です。token `color-primary` は CSS 変数 `--color-primary`、Tailwind では `bg-primary` / `text-primary` に当たります。画面ごとに色・余白・角丸・影を直接増やさず、ここにある token と部品で組みます。

## 文言

- 利用者向けの文言は日本語で書きます。製品用語は「やりたいこと」「体験」「公開／非公開」に揃えます。
- 1文に1つの情報を書きます。機能・入力条件・操作結果を具体的に書きます。
- 抽象的な宣伝文を置きません。「体験をアンロック」「可能性を解き放つ」、根拠のない「安心・安全・簡単」は使いません。
- 公開範囲・保存期限・入力上限・削除・未保存の変更・エラーの対処は削らずに残します。
- 操作の名前は動詞で終えます。例: 「やりたいことを入力する」「体験を確認する」「条件を解除する」「再試行する」。
- 件数は数字と「件」で書きます。例: 「12件」。
- 状態を色だけで伝えません。必ず語を添えます: 「完了」「注意」「エラー」「お知らせ」「公開範囲」「体験版」「必須」「任意」。
- 公開に成功した通知の本文にはURL文字列を書きません。本文は「公開しました」、URLは「公開ページを見る」のような操作として示します。
- 利用者が書いた内容は書き換えません。絵文字は装飾として使いません。

空の状態の文言（実装から）:

| 状態 | 見出し | 次の操作 |
| --- | --- | --- |
| やりたいことなし | まだ記録はありません | やりたいことを入力する |
| 体験なし | まだ体験はありません | やりたいことを見る |
| 検索結果なし | 条件に合う記録はありません | 条件を解除する |
| 公開中0件 | 公開中の体験はありません | 体験を確認する |

## 色

- 下地は `color-background`（白）の単色です。gradient、glow、半透明のぼかしを重ねません。
- 意味のある面（入力欄・Dialog・Card）は `color-surface`、補助の面は `color-surface-subtle` か `color-paper` / `color-mist` にします。
- 見出しと本文は `color-text`、補助文字・meta・placeholder は `color-text-muted` にします。
- 主要操作・現在地・リンクは `color-primary` です。塗りの上の文字は `color-white` にします。hover は `color-primary-strong` です。
- 状態色は `color-success`・`color-warning`・`color-danger` です。文字と枠に使い、薄い塗りは同じ色の10%（枠は30%）にします。
- `color-accent` は文字として使える補助accentです。体験版（Guest）の注意枠に使います。
- `color-sun-500`（達成・期限）と `color-coral-500`（公開領域）は装飾専用です。白地での比が2.2:1・2.8:1のため、文字色にしません。
- `color-border` は区切りと境界の線です。白地で1.6:1しかないため、線だけで操作対象を示しません。入力欄は可視labelと組にします。
- 1画面の中で、`color-primary` で塗る Button は原則1つです。

## 文字

- 外部Web Fontは読み込みません。OS標準のfont stackを使います（`font-sans`・`font-serif`）。新しいfont fileを足しません。
- 本文・操作・一覧は `font-sans` です。画面のh1とwordmarkは `font-serif` です。
- 画面h1: Workspaceは `workspace-title`（md未満1.5rem / md以上1.75rem）、Publicは `public-title`、Marketingは `marketing-title`（weight 500）です。日常の操作画面で巨大な見出しを使いません。
- 一覧のタイトルは `record-title`（16px / 1.6 / 600）です。省略せず折り返します。日付などの補足は `meta`（12px、`color-text-muted`）にします。
- 入力欄の文字は16px以上（`body`）です。モバイルの自動拡大を避けます。
- Fieldのlabelは `label`（14px / 700）、説明とerrorは `caption` です。
- Buttonは600です。standardは `button`、Primary actionは `button-large` です。
- 見出しは `text-wrap: balance` で折り返します。

## 余白と寸法

- 余白は `spacing`（4px）の倍数です。部品が使う主な値: 8px（`gap-2`）、12px（`gap-3`）、16px（Notice・compact Surface）、20〜24px（standard Surface）、32px（EmptyStateの上下）。
- 操作の高さは3段だけです: `spacing-control-compact` 40px（行内の補助操作）、`spacing-control-standard` 44px（通常のButton・入力欄・Navigation）、`spacing-control-large` 48px（Primary action）。画面側で高さを再定義しません。
- 一覧Rowの最小高さは `spacing-record-row` 56px です。
- 本文幅は `container-form` 560px（Form）、`container-article` 720px（読み物）、`container-page` 900px（main）の3つです。版面の外枠は左右14px（md以上20px）を残し、最大1120px（Workspaceは1280px）です。
- 画面幅の切り替えはTailwind既定の `sm` 640px・`md` 768px・`lg` 1024px です。PCとモバイルで情報の優先順位を変えません。

## 角丸・影・面

- 角丸は `radius-note-sm` 12px（Button・入力欄・Badge）、`radius-note` 16px（Surface・Notice・Card）、`radius-note-lg` 20px（大きい面）の3つです。pill（`rounded-full`）を増やしません。
- 影は `shadow-note-soft` と `shadow-note` だけです。borderと影を同時に強くしません。Dialogにも強い影やglowを使いません。
- 内容をすべてCardに入れません。一覧は `RecordList` の上下の罫線と行間の区切り線で組み、行ごとに面を作りません。
- 面は意味のあるまとまりにだけ使います: Form・設定は outlined、補助説明は subtle、Dialog内は raised、破壊操作の説明は danger。

## 状態

- loading、empty、error、成功、権限なしを、通常の状態と同じ段階で設計します。
- 読込中は `LoadingState` で「何を待っているか」を書きます。進捗率を装いません。
- 0件は `EmptyState` で「まだ1件もない」（initial）と「条件に合うものがない」（filtered）を分け、次の操作を必ず置きます。
- 操作の結果は、その操作の近くの `InlineFeedback` に出します。作成はForm直下、行の編集・公開は対象行、削除など行が消える操作は一覧の上です。
- 取得の失敗は `ErrorState` です。requestId、stack、HTTP status、内部名を表示しません。401・403・404は利用側のアプリで全画面の状態ページにします。
- 操作前に伝える注意（公開範囲、取り消せない操作、Guestの制約）は `Notice` にして、常に表示します。

## アクセシビリティ

- 本文と主要操作は4.5:1以上です。このシステムの文字色はすべて白・`color-surface-subtle` の上で満たします。
- keyboard focusは `color-focus` の3px solid outline、offset 3px です。focus、320px幅、200%拡大を見た目のために弱めません。
- `prefers-reduced-motion: reduce` ではtransitionを止めます。動きは色の切り替え（150ms）だけです。
- 現在地は `aria-current="page"` と見た目の両方で示します。hoverしないと意味が分からない操作を作りません。


## アイコン

- アイコンは `src/components/icons.tsx` の自作の線画です。24×24のviewBox、線幅1.6、端と角は丸、塗りなしです。コードでは `currentColor` で文字色を継ぎます。
- アイコンは装飾です。常に `aria-hidden` にし、文字の代わりにしません。アイコンだけの操作は `IconButton` に `label` を渡します。
- 追加するときも同じ線の作りにします。きらきら、絵文字、意味のない装飾アイコンは使いません。

## 部品

部品は `src/components/` にあります。使い方の詳細は `docs/components/` を参照します。

- Button: 1画面に primary は1つ。secondary は輪郭、ghost は行内の軽い操作、destructive は削除。その場で処理するなら Button、URLへ移るCTAなら LinkButton。
- Badge: 公開状態・期限などの短いlabel。必ず文字を入れます。
- Surface・Notice・InlineFeedback・EmptyState・LoadingState・ErrorState: 上の「状態」と「面」の規則どおりに使います。
- Field: label → 説明 → control → error の順を固定し、placeholderをlabelの代わりにしません。
- RecordList・RecordRow: 一覧の文法です。タイトル、meta、要約、状態、操作を決まった位置に置きます。
- PageHeader: 画面名は必ずh1です。Workspaceは title・説明・件数・Primary action を同じ位置に置きます。
- Navigation: 現在地は `aria-current="page"` と面・線の両方で示します。lg以上は縦のsidebar、lg未満は横に並べて折り返します。
- Dialog・ConfirmDialog: 確認は「キャンセル」→ 確定の順です。取り消せない操作は destructive にし、変わることを `Notice` で書きます。
- FormActions: モバイルは縦積み・全幅、`sm` 以上は横並びです。DOMの順と見た目の順を同じにします。
- RowActionMenu・RecordToolbar: 行の補助操作は `⋯` にまとめ、一覧の上は 検索 → 絞り込み → 件数 の順に置きます。
- FormLocation・BackLink・CharacterCount: 記入画面では戻る先と今の操作を文字で示し、上限のある入力欄に「N/M文字」を添えます。

部品の `className` で変えてよいのは margin・width・responsive配置だけです。色・高さ・角丸・hover・font weightを上書きしません。

## 使わない表現

理由を書かずに次を採用しません。

- 紫・青系のgradientを主役にしたhero
- すべてを同じCardに入れる構成、過剰な角丸・影・半透明・ぼかし・光彩
- 意味のない絵文字、きらきらアイコン、抽象的な装飾図形
- 大きな見出しと広すぎる余白で情報を薄く見せる構成
- 同じ重要度に見える複数のPrimary Button
- 色だけで状態を伝える表示

