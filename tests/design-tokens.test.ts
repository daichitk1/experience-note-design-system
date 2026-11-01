import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const themeSource = readFileSync(
  resolve(import.meta.dirname, "../src/theme.css"),
  "utf8",
);

function readColorTokens(): Map<string, string> {
  const block = /@theme\s*\{([\s\S]*?)\n\}/u.exec(themeSource);
  if (!block) throw new Error("@theme ブロックが見つかりません。");
  const tokens = new Map<string, string>();
  for (const match of block[1].matchAll(
    /--color-([a-z0-9-]+):\s*(#[0-9a-f]{6});/gu,
  )) {
    tokens.set(match[1], match[2]);
  }
  return tokens;
}

const channel = (value: number): number => {
  const ratio = value / 255;
  return ratio <= 0.04045 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string): number => {
  const red = channel(Number.parseInt(hex.slice(1, 3), 16));
  const green = channel(Number.parseInt(hex.slice(3, 5), 16));
  const blue = channel(Number.parseInt(hex.slice(5, 7), 16));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

export const contrastRatio = (first: string, second: string): number => {
  const [lighter, darker] = [luminance(first), luminance(second)].sort(
    (left, right) => right - left,
  );
  return (lighter + 0.05) / (darker + 0.05);
};

describe("体験ノートのDesign Tokens (UI-REF-004)", () => {
  const tokens = readColorTokens();
  const token = (name: string): string => {
    const value = tokens.get(name);
    if (!value) throw new Error(`--color-${name} が未定義です。`);
    return value;
  };

  it("承認済みpaletteを固定する", () => {
    expect(token("paper")).toBe("#f7f9fc");
    expect(token("mist")).toBe("#eef2f6");
    expect(token("ink-900")).toBe("#10233d");
    expect(token("tide-500")).toBe("#1d6e6a");
    expect(token("sun-500")).toBe("#f59e0b");
    expect(token("coral-500")).toBe("#f97316");
  });

  it("semantic color tokenをすべて定義する", () => {
    for (const name of [
      "accent",
      "background",
      "border",
      "danger",
      "focus",
      "primary",
      "primary-strong",
      "success",
      "surface",
      "surface-subtle",
      "text",
      "text-muted",
      "warning",
    ]) {
      expect(tokens.has(name), name).toBe(true);
    }
  });

  it("UX-FOUNDATION-001の下地と記録タイトルを共有tokenで固定する", () => {
    expect(token("background")).toBe("#ffffff");
    expect(themeSource).toContain("--text-record-title: 1rem;");
    expect(themeSource).toContain("--text-record-title--line-height: 1.6;");
    expect(themeSource).not.toContain("radial-gradient");
  });

  it("本文と補助文字がWCAG AAのコントラスト比を満たす", () => {
    const surfaces = ["background", "surface", "surface-subtle"] as const;
    const foregrounds = [
      "text",
      "text-muted",
      "primary",
      "primary-strong",
      "success",
      "warning",
      "danger",
      "accent",
    ] as const;

    for (const surface of surfaces) {
      for (const foreground of foregrounds) {
        expect(
          contrastRatio(token(surface), token(foreground)),
          `${foreground} on ${surface}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("塗りつぶしButtonの白文字がWCAG AAを満たす", () => {
    for (const fill of ["primary", "primary-strong", "danger"] as const) {
      expect(
        contrastRatio(token(fill), "#ffffff"),
        `white on ${fill}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("focusが非文字要素の3:1を満たす", () => {
    for (const surface of [
      "background",
      "surface",
      "surface-subtle",
    ] as const) {
      expect(
        contrastRatio(token(surface), token("focus")),
        `focus on ${surface}`,
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it("正本のSerif・12/16/20px radius・非常に薄いshadowを固定する", () => {
    expect(themeSource).toContain("--font-serif:");
    expect(themeSource).toContain("--radius-note-sm: 0.75rem");
    expect(themeSource).toContain("--radius-note: 1rem");
    expect(themeSource).toContain("--radius-note-lg: 1.25rem");
    expect(themeSource).toContain("--shadow-note: 0 4px 16px #10233d0a");
    expect(themeSource).toContain("--shadow-note-soft: 0 2px 8px #10233d08");
  });

  it("状態を色だけに頼らないよう、成功と警告と危険を別の色にする", () => {
    expect(token("warning")).not.toBe(token("danger"));
    expect(token("warning")).not.toBe(token("success"));
  });

  it("focus-visibleとprefers-reduced-motionの既存対応を保つ", () => {
    expect(themeSource).toContain("a:focus-visible");
    expect(themeSource).toContain("button:focus-visible");
    expect(themeSource).toContain("input:focus-visible");
    expect(themeSource).toContain("textarea:focus-visible");
    expect(themeSource).toContain("select:focus-visible");
    expect(themeSource).toContain("outline: 3px solid var(--color-focus)");
    expect(themeSource).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
