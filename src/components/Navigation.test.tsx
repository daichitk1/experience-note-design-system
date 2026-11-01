import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PencilIcon } from "./icons";
import {
  NavigationItemVisual,
  NavigationList,
  NavigationSection,
  navigationItemClassName,
  navigationItemState,
} from "./Navigation";

afterEach(cleanup);

describe("navigationItemState (UI-TW-007)", () => {
  it("exact page・parent section・idleを区別する", () => {
    expect(navigationItemState("/app/public", "/app/public", true)).toBe(
      "page",
    );
    expect(
      navigationItemState("/app/public/profile", "/app/public", true),
    ).toBe("section");
    expect(navigationItemState("/app/publicity", "/app/public", true)).toBe(
      "idle",
    );
    expect(
      navigationItemState("/app/public/profile", "/app/public", false),
    ).toBe("idle");
  });
});

describe("Navigation visual (UI-TW-007)", () => {
  it("primary listをMobileは折り返し可能な一列・Desktop縦並びにする", () => {
    render(
      <NavigationSection label="主要領域">
        <NavigationList layout="primary">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </NavigationList>
      </NavigationSection>,
    );

    const list = screen.getByRole("list");
    // #988: 4項目でも狭い幅・文字拡大で重ならないよう、gridではなく折り返し可能な一列にする。
    expect(list.className).toContain("flex-wrap");
    expect(list.className).not.toContain("grid-cols-3");
    expect(list.className).toContain("lg:flex-col");
    expect(list.className).not.toContain("overflow-x-auto");
  });

  it("全item layoutで44pxの操作領域を使う", () => {
    for (const layout of ["primary", "stacked", "tabs"] as const) {
      const className = navigationItemClassName({ layout });
      expect(className).toContain("min-h-control-standard");
    }
  });

  it("pageとsectionをfont・面・indicatorで区別する", () => {
    render(
      <>
        <a
          className={navigationItemClassName({
            layout: "primary",
            state: "page",
          })}
          href="/app/ideas"
        >
          <NavigationItemVisual
            icon={PencilIcon}
            label="やりたいこと"
            layout="primary"
            state="page"
          />
        </a>
        <a
          className={navigationItemClassName({
            layout: "primary",
            state: "section",
          })}
          href="/app/public"
        >
          <NavigationItemVisual
            label="公開ノート"
            layout="primary"
            state="section"
          />
        </a>
      </>,
    );

    const page = screen.getByRole("link", { name: "やりたいこと" });
    const section = screen.getByRole("link", { name: "公開ノート" });

    expect(page.className).toContain("bg-primary/10");
    expect(section.className).toContain("bg-surface-subtle");
    expect(page.querySelector('[aria-hidden="true"]')).not.toBeNull();
    expect(section.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it("可視labelを省略せずiconを装飾として扱う", () => {
    render(
      <NavigationItemVisual
        icon={PencilIcon}
        label="やりたいこと"
        layout="primary"
      />,
    );

    expect(screen.getByText("やりたいこと")).not.toBeNull();
    expect(document.querySelector("svg")?.getAttribute("aria-hidden")).toBe(
      "true",
    );
  });

  it("disabled itemへcursorとopacityを付ける", () => {
    const className = navigationItemClassName({ disabled: true });
    expect(className).toContain("cursor-not-allowed");
    expect(className).toContain("opacity-50");
    expect(className).not.toContain("cursor-pointer");
  });
});
