import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

afterEach(cleanup);

describe("EmptyState (DESIGN-001)", () => {
  it("まだ何もない状態では、最初の1件を作る導線を示す", () => {
    render(
      <EmptyState
        action={<a href="/app/ideas#capture">やりたいことを記録する</a>}
        description="思いついたことを、タイトルだけで残せます。"
        title="まだ記録はありません。"
      />,
    );

    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe(
      "まだ記録はありません。",
    );
    expect(
      screen.getByRole("link", { name: "やりたいことを記録する" }),
    ).not.toBeNull();
  });

  it("検索結果が0件の状態を、未記録の状態と混同させない", () => {
    render(
      <EmptyState
        description="別の語で探すか、検索欄を空にしてください。"
        title="該当する記録はありません。"
      />,
    );

    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe(
      "該当する記録はありません。",
    );
    expect(screen.queryByRole("link")).toBeNull();
  });
});
