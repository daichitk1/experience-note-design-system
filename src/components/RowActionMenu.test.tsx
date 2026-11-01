import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RowActionMenu } from "./RowActionMenu";

afterEach(cleanup);

function renderMenu(
  overrides: Partial<Parameters<typeof RowActionMenu>[0]> = {},
) {
  const onEdit = vi.fn();
  const onDelete = vi.fn();

  render(
    <RowActionMenu
      items={[
        { label: "編集する", onSelect: onEdit },
        { label: "削除する", onSelect: onDelete, tone: "destructive" },
      ]}
      label="「山に登る」の操作"
      {...overrides}
    />,
  );

  return {
    onDelete,
    onEdit,
    trigger: screen.getByRole("button", { name: "「山に登る」の操作" }),
  };
}

describe("RowActionMenu (UI-TW-008)", () => {
  it("triggerを常時表示し、hoverへ依存しない", () => {
    const { trigger } = renderMenu();

    expect(trigger.className).not.toContain("group-hover");
    expect(trigger.className).not.toContain("opacity-0");
    expect(trigger.className).not.toContain("invisible");
    expect(trigger.className).not.toContain("sr-only");
    // UX-FOUNDATION-001: 常時表示の入口はtouch target 44pxを確保する。
    expect(trigger.className).toContain("control-standard");
    expect(trigger.getAttribute("aria-haspopup")).toBe("menu");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("menuを開くと最初の操作へfocusする", () => {
    const { trigger } = renderMenu();
    fireEvent.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    const menu = screen.getByRole("menu", { name: "「山に登る」の操作" });
    expect(menu).toBeTruthy();
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "編集する" }),
    );
  });

  it("上下keyでmenuitemを移動する", () => {
    const { trigger } = renderMenu();
    fireEvent.click(trigger);

    const edit = screen.getByRole("menuitem", { name: "編集する" });
    const remove = screen.getByRole("menuitem", { name: "削除する" });

    fireEvent.keyDown(edit, { key: "ArrowDown" });
    expect(document.activeElement).toBe(remove);
    fireEvent.keyDown(remove, { key: "ArrowDown" });
    expect(document.activeElement).toBe(edit);
    fireEvent.keyDown(edit, { key: "ArrowUp" });
    expect(document.activeElement).toBe(remove);
    fireEvent.keyDown(remove, { key: "Home" });
    expect(document.activeElement).toBe(edit);
    fireEvent.keyDown(edit, { key: "End" });
    expect(document.activeElement).toBe(remove);
  });

  it("Escapeで閉じてtriggerへfocusを戻す", () => {
    const { trigger } = renderMenu();
    fireEvent.click(trigger);

    fireEvent.keyDown(screen.getByRole("menuitem", { name: "編集する" }), {
      key: "Escape",
    });

    expect(screen.queryByRole("menu")).toBeNull();
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });

  it("操作を選ぶとhandlerを呼び、閉じてfocusを戻す", () => {
    const { onEdit, trigger } = renderMenu();
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("menuitem", { name: "編集する" }));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("menu外のpointer操作で閉じる", () => {
    const { trigger } = renderMenu();
    fireEvent.click(trigger);
    fireEvent.pointerDown(document.body);

    expect(screen.queryByRole("menu")).toBeNull();
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("destructiveな操作を他と区別する", () => {
    const { trigger } = renderMenu();
    fireEvent.click(trigger);

    const remove = screen.getByRole("menuitem", { name: "削除する" });
    const edit = screen.getByRole("menuitem", { name: "編集する" });

    expect(remove.className).toContain("text-danger");
    expect(edit.className).not.toContain("text-danger");
  });

  it("無効な操作は選べず、focus移動でも飛ばさない", () => {
    const onSelect = vi.fn();
    render(
      <RowActionMenu
        items={[
          { disabled: true, label: "公開する", onSelect },
          { label: "編集する", onSelect: vi.fn() },
        ]}
        label="「読書」の操作"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "「読書」の操作" }));
    const publish = screen.getByRole("menuitem", { name: "公開する" });

    expect(publish.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(publish);
    expect(onSelect).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "編集する" }),
    );
  });

  it("すべてのmenuitemが40px以上の操作対象になる", () => {
    const { trigger } = renderMenu();
    fireEvent.click(trigger);

    for (const item of screen.getAllByRole("menuitem")) {
      expect(item.className).toContain("min-h-control-compact");
    }
  });
});
