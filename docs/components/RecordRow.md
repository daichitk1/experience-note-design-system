# RecordRow

やりたいこと・体験の一覧の1行に、タイトル・meta・要約・状態・操作を決まった位置で並べる部品です。`RecordList` の中で使います。

- `RecordList` は上下の `color-border` の罫線と行間の区切り線を持つ `color-surface` の一覧です。行ごとにCardを作りません。何の一覧かを `label` で名付けます。
- 行の最小高さは `spacing-record-row`（56px）です。タイトルは `record-title`（16px・600、Sans Serif）で、省略せず折り返します。状態の `Badge` はタイトルの横です。
- metaは12pxの `color-text-muted`、要約は14px・3行までです。操作は `sm` 以上で右端の列、`sm` 未満でmetaの右に置きます。
- `recentlySaved` は直前に保存した行に `color-primary` の2pxの左線を付けます。色だけに頼らず、見出しの近くに文言も添えます。
- 利用側は `title` と、任意の `meta`・`summary`・`status`・`actions`（`RowActionMenu` か少数のButton）・`leading`・`children`（行の下に開く編集Formなど）・`layout="stacked"`（体験一覧）・`titleLevel`（月の見出しで区切るときは `4`）を渡します。
- 表示や操作の可否はFeature側で判断します。この部品は結果を並べるだけです。

