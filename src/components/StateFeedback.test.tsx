import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { InlineFeedback } from "./InlineFeedback";
import { LoadingState } from "./LoadingState";
import { Notice } from "./Notice";

afterEach(cleanup);

describe("EmptyState (UI-TW-009)", () => {
  it("初期emptyでは最初の1件を作るprimary actionを示す", () => {
    render(
      <EmptyState
        description="上の入力欄から、タイトルだけでも残せます。"
        primaryAction={
          <Button variant="primary">やりたいことを追加する</Button>
        }
        title="まだ記録はありません"
        variant="initial"
      />,
    );

    const region = screen.getByRole("heading", { level: 3 }).closest("div");
    expect(region?.getAttribute("data-empty-variant")).toBe("initial");
    expect(
      screen.getByRole("button", { name: "やりたいことを追加する" }),
    ).toBeTruthy();
  });

  it("filtered emptyでは条件を解除する導線を示し、初期emptyと区別する", () => {
    render(
      <EmptyState
        description="検索語や絞り込みを変えてください。"
        primaryAction={<Button variant="secondary">条件を解除する</Button>}
        title="条件に合う記録はありません"
        variant="filtered"
      />,
    );

    const region = screen.getByRole("heading", { level: 3 }).closest("div");
    expect(region?.getAttribute("data-empty-variant")).toBe("filtered");
    expect(screen.getByRole("button", { name: "条件を解除する" })).toBeTruthy();
  });

  it("primaryとsecondaryのactionを同じ並びで表示する", () => {
    render(
      <EmptyState
        primaryAction={<Button variant="primary">公開する</Button>}
        secondaryAction={<Button variant="secondary">公開設定を見る</Button>}
        title="公開中の体験はありません"
      />,
    );

    const primary = screen.getByRole("button", { name: "公開する" });
    const secondary = screen.getByRole("button", { name: "公開設定を見る" });
    expect(
      primary.compareDocumentPosition(secondary) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeGreaterThan(0);
  });

  it("iconを装飾として扱う", () => {
    render(
      <EmptyState
        icon={<span data-testid="empty-icon">■</span>}
        title="まだ記録はありません"
      />,
    );

    expect(
      screen
        .getByTestId("empty-icon")
        .parentElement?.getAttribute("aria-hidden"),
    ).toBe("true");
  });

  it("既存の呼び出し方（action / children）も動く", () => {
    render(
      <EmptyState
        action={<a href="/app/ideas">記録する</a>}
        title="まだ記録はありません"
      >
        思いついたことを残せます。
      </EmptyState>,
    );

    expect(screen.getByRole("link", { name: "記録する" })).toBeTruthy();
    expect(screen.getByText("思いついたことを残せます。")).toBeTruthy();
  });
});

describe("LoadingState (UI-TW-009)", () => {
  it("可視labelをpolite live regionで伝える", () => {
    render(<LoadingState label="記録を読み込んでいます。" />);

    const status = screen.getByRole("status");
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.textContent).toContain("記録を読み込んでいます。");
  });

  it("進捗率を装わない", () => {
    render(<LoadingState label="読み込んでいます。" />);

    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(screen.getByRole("status").textContent).not.toMatch(/%/u);
  });
});

describe("InlineFeedback (UI-TW-009)", () => {
  it("successはpolite、errorはalertで伝える", () => {
    const { rerender } = render(
      <InlineFeedback label="記録の保存状況" tone="success">
        記録しました。
      </InlineFeedback>,
    );

    const success = screen.getByRole("status", { name: "記録の保存状況" });
    expect(success.getAttribute("aria-live")).toBe("polite");

    rerender(
      <InlineFeedback label="記録の保存状況" tone="error">
        保存できませんでした。
      </InlineFeedback>,
    );
    expect(screen.getByRole("alert").textContent).toContain(
      "保存できませんでした。",
    );
  });

  it("色以外の可視labelを必ず持つ", () => {
    render(
      <>
        <InlineFeedback label="a" tone="success">
          記録しました。
        </InlineFeedback>
        <InlineFeedback label="b" tone="warning">
          公開されます。
        </InlineFeedback>
        <InlineFeedback label="c" tone="error">
          保存できませんでした。
        </InlineFeedback>
      </>,
    );

    expect(screen.getByText("完了")).toBeTruthy();
    expect(screen.getByText("注意")).toBeTruthy();
    expect(screen.getByText("エラー")).toBeTruthy();
  });

  it("次の操作を添えられる", () => {
    render(
      <InlineFeedback
        action={<a href="/app/done">やったことを見る</a>}
        label="達成の状況"
        tone="success"
      >
        やったことへ移しました。
      </InlineFeedback>,
    );

    expect(screen.getByRole("link", { name: "やったことを見る" })).toBeTruthy();
  });

  it("本文が空のときは語句もactionも出さない", () => {
    render(
      <InlineFeedback
        action={<a href="/app/done">やったことを見る</a>}
        label="達成の状況"
        tone="success"
      >
        {""}
      </InlineFeedback>,
    );

    const region = screen.getByRole("status", { name: "達成の状況" });
    expect(region.textContent).toBe("");
    expect(screen.queryByRole("link")).toBeNull();
  });
});

describe("ErrorState (UI-TW-009)", () => {
  it("Page全体の取得失敗をalertで伝え、Retryできる", () => {
    const onRetry = vi.fn();
    render(
      <ErrorState
        description="通信に失敗しました。"
        onRetry={onRetry}
        title="記録を読み込めませんでした"
      />,
    );

    const region = screen.getByRole("alert");
    expect(region.textContent).toContain("記録を読み込めませんでした");
    fireEvent.click(screen.getByRole("button", { name: "再試行する" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("retryできない失敗ではRetryを出さない", () => {
    render(
      <ErrorState
        description="この記録は表示できません。"
        title="表示できませんでした"
      />,
    );

    expect(screen.queryByRole("button", { name: "再試行する" })).toBeNull();
  });

  it("operation errorはPage errorと別の見え方にする", () => {
    render(
      <ErrorState
        description="保存できませんでした。"
        scope="operation"
        title="保存に失敗しました"
      />,
    );

    expect(screen.getByRole("alert").getAttribute("data-error-scope")).toBe(
      "operation",
    );
  });

  it("内部情報を表示しない", () => {
    render(
      <ErrorState
        description="通信に失敗しました。"
        title="読み込めませんでした"
      />,
    );

    const region = screen.getByRole("alert");
    expect(region.textContent).not.toMatch(/requestId|stack|500|Error:/u);
  });
});

describe("Notice (UI-TW-009)", () => {
  it("重要な安全情報を常時表示する", () => {
    render(
      <Notice title="この体験版は公開されません" tone="demo">
        入力内容はこのブラウザだけに保存されます。
      </Notice>,
    );

    expect(
      screen.getByText("入力内容はこのブラウザだけに保存されます。"),
    ).toBeTruthy();
    expect(screen.queryByRole("group")).toBeNull();
  });

  it("toneごとに可視labelを持つ", () => {
    render(
      <>
        <Notice tone="info">お知らせです。</Notice>
        <Notice tone="warning">注意が必要です。</Notice>
        <Notice tone="privacy">公開範囲の説明です。</Notice>
        <Notice tone="demo">体験版の説明です。</Notice>
      </>,
    );

    for (const word of ["お知らせ", "注意", "公開範囲", "体験版"]) {
      expect(screen.getAllByText(word).length).toBeGreaterThan(0);
    }
  });

  it("補足だけをdisclosureへ入れられる", () => {
    render(
      <Notice
        details={<p>共有端末では同じブラウザを使う人に内容が見えます。</p>}
        detailsLabel="詳しい注意事項"
        title="体験版の保存について"
        tone="demo"
      >
        入力内容はこのブラウザだけに保存されます。
      </Notice>,
    );

    expect(
      screen.getByText("入力内容はこのブラウザだけに保存されます。"),
    ).toBeTruthy();
    expect(screen.getByText("詳しい注意事項")).toBeTruthy();
  });
});
