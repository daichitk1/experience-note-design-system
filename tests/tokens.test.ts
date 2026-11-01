import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// theme.css が正本。tokens.json は同じ値を別の形で配る写しなので、ずれたら失敗させる。
const theme = readFileSync(resolve(import.meta.dirname, "../src/theme.css"), "utf8");
const tokens = JSON.parse(
  readFileSync(resolve(import.meta.dirname, "../tokens.json"), "utf8"),
) as Record<string, { tokens?: Array<{ name: string; value: unknown }> }> & {
  type: { families: Record<string, string> };
};

function themeVariables(): Map<string, string> {
  const block = /@theme\s*\{([\s\S]*?)\n\}/u.exec(theme);
  if (!block) throw new Error("@theme ブロックが見つかりません。");
  const body = block[1].replace(/\/\*[\s\S]*?\*\//gu, "");
  const variables = new Map<string, string>();
  for (const match of body.matchAll(/--([a-z0-9-]+):\s*([^;]+);/gu)) {
    variables.set(match[1], match[2].replace(/\s+/gu, " ").trim());
  }
  return variables;
}

const normalize = (value: string): string => value.toLowerCase();

describe("tokens.json と theme.css", () => {
  const variables = themeVariables();
  const families = ["color", "spacing", "radius", "shadow", "container"];

  it("Tailwind既定の白以外、tokens.json の値はすべて theme.css と一致する", () => {
    for (const family of families) {
      for (const token of tokens[family]?.tokens ?? []) {
        if (token.name === "color-white" || token.name === "spacing") continue;
        expect(variables.get(token.name), token.name).toBeDefined();
        expect(normalize(String(token.value)), token.name).toBe(
          normalize(variables.get(token.name) ?? ""),
        );
      }
    }
  });

  it("theme.css の色・寸法はすべて tokens.json にある", () => {
    const names = new Set(
      families.flatMap((family) => (tokens[family]?.tokens ?? []).map((token) => token.name)),
    );
    for (const name of variables.keys()) {
      if (/^(font|text)-/u.test(name)) continue;
      expect(names.has(name), name).toBe(true);
    }
  });

  it("font stackが一致する", () => {
    for (const [key, stack] of Object.entries(tokens.type.families)) {
      expect(variables.get(`font-${key}`), key).toBe(stack);
    }
  });
});
