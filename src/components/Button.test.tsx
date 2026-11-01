import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "./Button";

afterEach(cleanup);

describe("Button (UI-TW-004)", () => {
  it("variantを役割ごとに描き分ける", () => {
    render(
      <>
        <Button variant="primary">追加する</Button>
        <Button variant="secondary">キャンセル</Button>
        <Button variant="ghost">その他</Button>
        <Button variant="destructive">削除する</Button>
      </>,
    );

    expect(
      screen.getByRole("button", { name: "追加する" }).className,
    ).toContain("bg-primary");
    expect(
      screen.getByRole("button", { name: "キャンセル" }).className,
    ).toContain("bg-surface");
    expect(screen.getByRole("button", { name: "その他" }).className).toContain(
      "bg-transparent",
    );
    expect(
      screen.getByRole("button", { name: "削除する" }).className,
    ).toContain("border-danger");
  });

  it("sizeをsemantic control tokenで切り替える", () => {
    render(
      <>
        <Button size="compact">補助操作</Button>
        <Button size="standard">通常操作</Button>
        <Button size="large">主要操作</Button>
      </>,
    );

    expect(
      screen.getByRole("button", { name: "補助操作" }).className,
    ).toContain("min-h-control-compact");
    expect(
      screen.getByRole("button", { name: "通常操作" }).className,
    ).toContain("min-h-control-standard");
    expect(
      screen.getByRole("button", { name: "主要操作" }).className,
    ).toContain("min-h-control-large");
  });

  it("size未指定は既存画面との互換のためlargeを維持する", () => {
    render(<Button>既存操作</Button>);

    expect(
      screen.getByRole("button", { name: "既存操作" }).className,
    ).toContain("min-h-control-large");
  });

  it("処理中はラベルを変え、操作を止める", () => {
    render(
      <Button busy busyLabel="保存中…">
        保存する
      </Button>,
    );

    const button = screen.getByRole("button", { name: "保存中…" });
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
  });

  it("明示的なdisabledをnative buttonへ反映する", () => {
    render(<Button disabled>保存する</Button>);

    const button = screen.getByRole("button", { name: "保存する" });
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it("iconを装飾として扱う", () => {
    render(
      <Button leadingIcon={<span>+</span>} trailingIcon={<span>→</span>}>
        追加する
      </Button>,
    );

    const button = screen.getByRole("button", { name: "追加する" });
    expect(button.querySelectorAll("[aria-hidden=true]")).toHaveLength(2);
  });

  it("既定のtypeをbuttonにする", () => {
    render(<Button>閉じる</Button>);

    expect(
      screen.getByRole("button", { name: "閉じる" }).getAttribute("type"),
    ).toBe("button");
  });
});
