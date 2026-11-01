# experience-note-design-system

記録サービス「体験ノート」のデザインシステムです。React部品、Tailwind CSS v4のtheme、design tokens、使い方のガイドラインを含みます。

落ち着いて記録し、あとから読み返せる画面を作るための部品です。装飾より、利用者が書いた内容と状態の分かりやすさを優先します。考え方は [docs/guidelines.md](docs/guidelines.md) にあります。

## 含まれるもの

| 入口 | 内容 |
| --- | --- |
| `experience-note-design-system` | React部品とアイコン（ESM、型定義付き） |
| `experience-note-design-system/theme.css` | Tailwind CSS v4 の `@theme`（色・文字・角丸・影・操作の高さ・本文幅）と、focus・reduced motionの基本スタイル |
| `experience-note-design-system/styles.css` | Tailwindを使わない場合の組み立て済みCSS（部品が使うclassとTailwindのresetを含む） |
| `experience-note-design-system/tokens.json` | 同じ値をJSONで表したdesign tokens |

## 必要な環境

- React 19 以上（`react`・`react-dom` は利用側で入れる）
- Tailwind CSS v4（Tailwindで組む場合）

## 使い方

npmには公開していません。GitHubから、タグを指定してインストールします。

```bash
pnpm add github:daichitk1/experience-note-design-system#v0.1.0
```

インストール時に `prepare` で `dist/` を組み立てます。pnpm 10 以降は依存のbuild scriptを既定で止めるため、利用側の `pnpm-workspace.yaml` で許可します。

```yaml
allowBuilds:
  experience-note-design-system: true
```

### Tailwind CSS v4 で使う

アプリのCSSで、themeと部品のclassの読み取り先を指定します。

```css
@import "tailwindcss";
@import "experience-note-design-system/theme.css";
@source "../node_modules/experience-note-design-system/dist";
```

`@source` のパスは、このCSSファイルから `node_modules` までの相対パスに合わせます。

### Tailwind CSS を使わない

組み立て済みのCSSを1回だけ読み込みます。Tailwindのreset（preflight）を含むため、ページ全体の既定の見た目が変わります。

```ts
import "experience-note-design-system/styles.css";
```

### 部品

```tsx
import { Button, Field, FormActions, TextInput } from "experience-note-design-system";

export function TitleForm() {
  return (
    <form>
      <Field id="title" label="タイトル" requirement="required" description="100文字まで入力できます。">
        <TextInput maxLength={100} />
      </Field>
      <FormActions>
        <Button size="standard" variant="secondary">キャンセル</Button>
        <Button size="standard" type="submit" variant="primary">保存する</Button>
      </FormActions>
    </form>
  );
}
```

## 部品の一覧

| 分類 | 部品 |
| --- | --- |
| 操作 | `Button`・`LinkButton`・`IconButton` |
| 状態の表示 | `Badge`・`InlineFeedback`・`Notice`・`EmptyState`・`LoadingState`・`RecordsLoadingState`・`ErrorState` |
| 入力 | `Field`・`TextInput`・`SearchInput`・`Select`・`TextArea`・`InputGroup`・`FormActions`・`CharacterCount` |
| 一覧 | `RecordList`・`RecordRow`・`RecordToolbar`・`RowActionMenu` |
| 配置 | `Surface`・`WorkspacePageHeader`・`PublicPageHeader`・`MarketingPageHeader` |
| 移動 | `NavigationSection`・`NavigationList`・`NavigationItemVisual`・`BackLink`・`FormLocation` |
| 重ねる画面 | `Dialog`・`ConfirmDialog`・`DestructiveConfirmDialog`・`LeaveConfirmDialog` |
| アイコン | `PencilIcon`・`MountainIcon`・`BookIcon`・`ListIcon`・`MonitorIcon`・`MoreIcon`・`SettingsIcon`・`ChevronRightIcon` |

各部品の使いどころと渡すものは [docs/components/](docs/components/) にあります。部品の既定の文言は日本語です。

## 守ってほしい使い方

- 部品の `className` で変えてよいのは、margin・width・responsiveの配置だけです。色・高さ・角丸・hover・文字の太さは上書きしません。
- 状態を色だけで伝えません。`Badge`・`InlineFeedback`・`Notice` は必ず語を表示します。
- 1画面に `primary` のButtonは原則1つです。

## 含まれないもの

- 体験ノートのロゴ（「しおりの軌跡」）は含みません。商標の確認が終わっていないためです。
- アプリ固有の画面の枠（Workspace・Public・Marketingの各Shell）、サイドバー、401・403・404の状態ページは含みません。

## 開発

```bash
pnpm install
pnpm check
```

`pnpm check` は型検査・テスト・buildを順に実行します。

新しい版を出すときは `package.json` の `version` を上げ、同じ番号のタグ（例: `v0.2.0`）を付けてpushします。

- 色・寸法の正本は `src/theme.css` です。値を変えたら `tokens.json` も同じ値に直します。`tests/tokens.test.ts` がずれを検出します。
- 文字色の組み合わせは `tests/design-tokens.test.ts` がWCAG AA（4.5:1）を満たすか確認します。

## ライセンス

[MIT](LICENSE)
