import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Badge } from "./Badge";
import { IconButton } from "./IconButton";
import { LinkButton } from "./LinkButton";
import { Surface } from "./Surface";

afterEach(cleanup);

describe("LinkButton (UI-TW-004)", () => {
  it("anchorのsemanticを維持しながらButtonと同じrecipeを使う", () => {
    render(
      <LinkButton href="/demo" size="standard" variant="primary">
        体験版を試す
      </LinkButton>,
    );

    const link = screen.getByRole("link", { name: "体験版を試す" });
    expect(link.getAttribute("href")).toBe("/demo");
    expect(link.className).toContain("bg-primary");
    expect(link.className).toContain("min-h-control-standard");
  });
});

describe("IconButton (UI-TW-004)", () => {
  it("可視iconとは別にaccessible nameと44pxの既定操作領域を持つ", () => {
    render(<IconButton icon="⋯" label="その他の操作" />);

    const button = screen.getByRole("button", { name: "その他の操作" });
    expect(button.className).toContain("size-control-standard");
    expect(button.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it("busy時はaccessible nameを変え、二重操作を防ぐ", () => {
    render(
      <IconButton busy busyLabel="処理中…" icon="⋯" label="その他の操作" />,
    );

    const button = screen.getByRole("button", { name: "処理中…" });
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
  });
});

describe("Badge (UI-TW-004)", () => {
  it("可視labelを必須にし、状態を色だけに依存させない", () => {
    render(
      <>
        <Badge tone="neutral">非公開</Badge>
        <Badge tone="success">公開中</Badge>
        <Badge tone="warning">期限あり</Badge>
      </>,
    );

    expect(screen.getByText("非公開").className).toContain("text-text-muted");
    expect(screen.getByText("公開中").className).toContain("text-success");
    expect(screen.getByText("期限あり").className).toContain("text-warning");
  });
});

describe("Surface (UI-TW-004)", () => {
  it("意味のある面を少数variantとpaddingで構成する", () => {
    render(
      <Surface as="section" padding="compact" variant="raised">
        <h2>確認内容</h2>
      </Surface>,
    );

    const surface = document.querySelector("section");
    expect(surface).not.toBeNull();
    expect(surface?.className).toContain("shadow-note-soft");
    expect(surface?.className).toContain("p-4");
  });

  it("danger variantを通常面と区別する", () => {
    render(<Surface variant="danger">重要な確認</Surface>);

    expect(screen.getByText("重要な確認").className).toContain("border-danger");
  });
});
