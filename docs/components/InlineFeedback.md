# InlineFeedback

操作の結果（完了・注意・エラー）を、その操作の近くに語と色で示す一行の通知です。

- toneと語: `success`「完了」（`color-success`、`role="status"`・`aria-live="polite"`）、`warning`「注意」（`color-warning`、同じ）、`error`「エラー」（`color-danger`、`role="alert"`）。語は枠で囲み、色だけに頼りません。
- 利用側は `tone`、`children`（本文）、必須の `label`（同じ画面の通知を区別する名前、例「保存結果」「写真の操作結果」）、任意の `action`（「体験を見る」「公開ページを見る」）を渡します。
- 置き場所: 作成はForm直下、行の編集・公開は対象の行、削除・達成など行が消える操作は一覧の上です。
- 1つの操作scopeに1つの通知です。新しい操作を始めたら古い結果を消し、新しい結果で置き換えます。
- 公開成功の本文にURL文字列を入れません。結果を確認できないnetwork・internal errorでは成功・失敗を断定せず、読み直しを案内します。
- Fieldに出したvalidation errorを、ここで重ねて表示しません。

