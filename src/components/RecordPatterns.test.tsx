import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { RecordList } from "./RecordList";
import { RecordRow } from "./RecordRow";
import { RecordToolbar } from "./RecordToolbar";
import { SearchInput } from "./TextInput";

afterEach(cleanup);

describe("RecordToolbar (UI-TW-008)", () => {
  it("accessible nameを持ち、search・filters・件数・操作を同じ順序で並べる", () => {
    render(
      <RecordToolbar
        actions={<Button variant="secondary">追加する</Button>}
        clearAction={<Button variant="ghost">条件を解除</Button>}
        count="12件表示しています。"
        filters={<Button variant="secondary">今週</Button>}
        label="やりたいことの絞り込み"
        search={<SearchInput aria-label="タイトルで検索" />}
      />,
    );

    const toolbar = screen.getByRole("group", {
      name: "やりたいことの絞り込み",
    });
    const order = [
      screen.getByLabelText("タイトルで検索"),
      screen.getByRole("button", { name: "今週" }),
      screen.getByRole("status"),
      screen.getByRole("button", { name: "条件を解除" }),
      screen.getByRole("button", { name: "追加する" }),
    ];

    for (const element of order) {
      expect(toolbar.contains(element)).toBe(true);
    }
    for (let index = 1; index < order.length; index += 1) {
      const position = order[index - 1]!.compareDocumentPosition(order[index]!);
      expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeGreaterThan(0);
    }
  });

  it("件数をpolite live regionで伝える", () => {
    render(<RecordToolbar count="3件表示しています。" label="絞り込み" />);

    const status = screen.getByRole("status");
    expect(status).toHaveProperty("textContent", "3件表示しています。");
    expect(status.getAttribute("aria-live")).toBe("polite");
  });

  it("Mobileで縦、Desktopで横へ縮退する", () => {
    render(<RecordToolbar label="絞り込み" search={<SearchInput />} />);

    const toolbar = screen.getByRole("group", { name: "絞り込み" });
    expect(toolbar.className).toContain("flex-col");
    expect(toolbar.className).toContain("md:flex-row");
    expect(toolbar.className).not.toContain("overflow-x-auto");
  });

  it("渡していないslotのDOMを作らない", () => {
    render(<RecordToolbar label="絞り込み" />);

    expect(screen.queryByRole("status")).toBeNull();
    expect(
      screen.getByRole("group", { name: "絞り込み" }).children,
    ).toHaveLength(0);
  });
});

describe("RecordList (UI-TW-008)", () => {
  it("list semanticとaccessible nameを持つ", () => {
    render(
      <RecordList label="やりたいこと一覧">
        <RecordRow title="山に登る" />
      </RecordList>,
    );

    const list = screen.getByRole("list", { name: "やりたいこと一覧" });
    expect(list.tagName).toBe("UL");
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("順序に意味がある一覧をolにできる", () => {
    render(
      <RecordList as="ol" label="達成した順">
        <RecordRow title="山に登る" />
      </RecordList>,
    );

    expect(screen.getByRole("list", { name: "達成した順" }).tagName).toBe("OL");
  });

  it("row間の区切り規則を共通化する", () => {
    render(
      <RecordList label="やりたいこと一覧">
        <RecordRow title="山に登る" />
      </RecordList>,
    );

    const list = screen.getByRole("list", { name: "やりたいこと一覧" });
    expect(list.className).toContain("divide-y");
    expect(list.className).toContain("list-none");
  });
});

describe("RecordRow (UI-TW-008)", () => {
  it("leading・title・meta・summary・status・actionsを表示する", () => {
    render(
      <RecordList label="やったこと一覧">
        <RecordRow
          actions={<Button variant="ghost">編集</Button>}
          leading={<Button variant="ghost">やったことにする</Button>}
          meta={<span>2026/08/01</span>}
          status={<Badge tone="primary">公開中</Badge>}
          summary="はじめて頂上まで歩いた。"
          title="山に登る"
        />
      </RecordList>,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "山に登る" }),
    ).toBeTruthy();
    expect(screen.getByText("2026/08/01")).toBeTruthy();
    expect(screen.getByText("はじめて頂上まで歩いた。")).toBeTruthy();
    expect(screen.getByText("公開中")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "やったことにする" }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "編集" })).toBeTruthy();
  });

  it("長いtitleと複数statusでも折り返して収まる", () => {
    render(
      <RecordList label="やったこと一覧">
        <RecordRow
          status={
            <>
              <Badge tone="primary">公開中</Badge>
              <Badge tone="warning">期限あり</Badge>
            </>
          }
          title={"とても長い記録タイトル".repeat(8)}
        />
      </RecordList>,
    );

    const row = screen.getByRole("listitem");
    expect(row.className).toContain("min-h-record-row");
    expect(row.querySelector(".min-w-0")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 3 }).className).toContain(
      "break-words",
    );
  });

  it("行内展開領域をtitleと同じrowの下へ置く", () => {
    render(
      <RecordList label="やったこと一覧">
        <RecordRow title="山に登る">
          <p>削除しますか？</p>
        </RecordRow>
      </RecordList>,
    );

    const row = screen.getByRole("listitem");
    const heading = screen.getByRole("heading", { level: 3 });
    const expansion = screen.getByText("削除しますか？");

    expect(row.contains(expansion)).toBe(true);
    expect(
      heading.compareDocumentPosition(expansion) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeGreaterThan(0);
  });

  it("metaFirstではMobileの操作をtitle行と重ならないmeta行へ置く", () => {
    render(
      <RecordList label="体験一覧">
        <RecordRow
          actions={<button type="button">操作</button>}
          meta="達成日: 2026/08/08"
          metaFirst
          title="山に登る"
        />
      </RecordList>,
    );

    const titleRow = screen.getByRole("heading", { level: 3 }).parentElement;
    const actions = screen.getByRole("button", { name: "操作" }).parentElement;

    expect(titleRow?.className).toContain("row-start-2");
    expect(actions?.className).toContain("row-start-1");
    expect(actions?.className).not.toContain("row-start-2");
  });

  it("titleをheadingとして参照できるidを付けられる", () => {
    render(
      <RecordList label="やったこと一覧">
        <RecordRow title="山に登る" titleId="row-title" />
      </RecordList>,
    );

    expect(screen.getByRole("heading", { level: 3 }).id).toBe("row-title");
  });
});

it("stacked行の補助操作は右に寄せ、右端基準のmenuを左へはみ出させない", () => {
  render(
    <RecordList label="体験一覧">
      <RecordRow
        layout="stacked"
        title="体験"
        actions={<button type="button">操作</button>}
      />
    </RecordList>,
  );
  expect(
    screen.getByRole("button", { name: "操作" }).parentElement?.className,
  ).toContain("justify-end");
});
