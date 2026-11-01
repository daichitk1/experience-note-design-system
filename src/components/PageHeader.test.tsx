import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  MarketingPageHeader,
  PublicPageHeader,
  WorkspacePageHeader,
} from "./PageHeader";

afterEach(cleanup);

describe("PageHeader variants (UI-TW-003)", () => {
  it("WorkspacePageHeaderはkickerなしでtitle・description・count・primary actionを配置する", () => {
    render(
      <WorkspacePageHeader
        count={12}
        description="思いついたことをすぐに残せます。"
        id="ideas"
        primaryAction={<button type="button">追加する</button>}
        title="やりたいこと"
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "やりたいこと" }),
    ).not.toBeNull();
    expect(screen.getByText("思いついたことをすぐに残せます。")).not.toBeNull();
    expect(screen.getByText("12件")).not.toBeNull();
    expect(screen.getByRole("button", { name: "追加する" })).not.toBeNull();
    expect(screen.queryByText("IDEAS")).toBeNull();
  });

  it("PublicPageHeaderはleadとmetaを読み物の見出しへまとめる", () => {
    render(
      <PublicPageHeader
        id="public-note"
        lead="公開中の体験を確認できます。"
        meta={<span>2026年8月</span>}
        title="公開ノート"
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "公開ノート" }),
    ).not.toBeNull();
    expect(screen.getByText("公開中の体験を確認できます。")).not.toBeNull();
    expect(screen.getByText("2026年8月")).not.toBeNull();
  });

  it("MarketingPageHeaderは任意のeyebrowとPrimary actionを持てる", () => {
    render(
      <MarketingPageHeader
        eyebrow="EXPERIENCE NOTE"
        id="marketing"
        lead="思いついたことを、今日のうちに一歩へ。"
        primaryAction={<a href="/demo">体験版を試す</a>}
        title="体験ノート"
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "体験ノート" }),
    ).not.toBeNull();
    expect(screen.getByText("EXPERIENCE NOTE")).not.toBeNull();
    expect(
      screen.getByRole("link", { name: "体験版を試す" }).getAttribute("href"),
    ).toBe("/demo");
  });
});
