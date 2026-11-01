import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ConfirmDialog, DestructiveConfirmDialog } from "./ConfirmDialog";

function ConfirmHarness({
  busy = false,
  confirmDisabled = false,
}: {
  busy?: boolean;
  confirmDisabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} type="button">
        確認を開く
      </button>
      {open ? (
        <ConfirmDialog
          accessibleLabel="変更内容の最終確認"
          busy={busy}
          busyLabel="保存中…"
          confirmDisabled={confirmDisabled}
          confirmLabel="保存する"
          description="この内容で保存しますか？"
          onCancel={() => setOpen(false)}
          onConfirm={vi.fn()}
          title="変更を保存する"
        />
      ) : null}
    </>
  );
}

function InputFocusHarness() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} type="button">
        削除確認を開く
      </button>
      {open ? (
        <DestructiveConfirmDialog
          accessibleLabel="削除の最終確認"
          confirmDisabled
          confirmLabel="削除する"
          description="確認入力が必要です。"
          focusConfirm={false}
          onCancel={() => setOpen(false)}
          onConfirm={vi.fn()}
          size="medium"
          title="削除する"
        >
          <input aria-label="確認入力" data-dialog-initial-focus="" />
        </DestructiveConfirmDialog>
      ) : null}
    </>
  );
}

afterEach(cleanup);

describe("Dialog (UI-TW-006)", () => {
  it("aria-labelledbyとaria-describedbyで名前と説明を関連付ける", () => {
    render(<ConfirmHarness />);
    fireEvent.click(screen.getByRole("button", { name: "確認を開く" }));

    const dialog = screen.getByRole("dialog", {
      name: "変更内容の最終確認",
    });
    const labelledBy = dialog.getAttribute("aria-labelledby");
    const describedBy = dialog.getAttribute("aria-describedby");

    expect(labelledBy).not.toBeNull();
    expect(describedBy).not.toBeNull();
    expect(document.getElementById(labelledBy!)?.textContent).toBe(
      "変更内容の最終確認",
    );
    expect(document.getElementById(describedBy!)?.textContent).toContain(
      "この内容で保存しますか？",
    );
    expect(
      screen.getByRole("heading", { name: "変更を保存する" }),
    ).not.toBeNull();
  });

  it("有効なconfirmを初期focusにし、actionのDOM順をcancel→confirmへ揃える", () => {
    render(<ConfirmHarness />);
    fireEvent.click(screen.getByRole("button", { name: "確認を開く" }));

    const cancel = screen.getByRole("button", { name: "キャンセル" });
    const confirm = screen.getByRole("button", { name: "保存する" });

    expect(document.activeElement).toBe(confirm);
    expect(
      cancel.compareDocumentPosition(confirm) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).not.toBe(0);
  });

  it("disabled confirmへfocusせず、最初の有効なcancelへ置く", () => {
    render(<ConfirmHarness confirmDisabled />);
    fireEvent.click(screen.getByRole("button", { name: "確認を開く" }));

    const cancel = screen.getByRole("button", { name: "キャンセル" });
    const confirm = screen.getByRole("button", { name: "保存する" });

    expect(confirm).toHaveProperty("disabled", true);
    expect(document.activeElement).toBe(cancel);
  });

  it("content内の明示targetを初期focusにできる", () => {
    render(<InputFocusHarness />);
    fireEvent.click(screen.getByRole("button", { name: "削除確認を開く" }));

    const input = screen.getByRole("textbox", { name: "確認入力" });
    const dialog = screen.getByRole("dialog", { name: "削除の最終確認" });

    expect(document.activeElement).toBe(input);
    expect(dialog.className).toContain("max-w-md");
    expect(dialog.className).toContain("max-h-[calc(100dvh_-_2rem)]");
  });

  it("TabとShift+TabをDialog内で循環させる", () => {
    render(<ConfirmHarness />);
    fireEvent.click(screen.getByRole("button", { name: "確認を開く" }));

    const cancel = screen.getByRole("button", { name: "キャンセル" });
    const confirm = screen.getByRole("button", { name: "保存する" });

    confirm.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(cancel);

    cancel.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(confirm);
  });

  it("Escapeで閉じ、元のtriggerへfocusを戻す", async () => {
    render(<ConfirmHarness />);
    const trigger = screen.getByRole("button", { name: "確認を開く" });
    trigger.focus();
    fireEvent.click(trigger);

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("busy中はEscapeとcancelで閉じず、二重操作を防ぐ", () => {
    render(<ConfirmHarness busy />);
    fireEvent.click(screen.getByRole("button", { name: "確認を開く" }));

    const dialog = screen.getByRole("dialog");
    const cancel = screen.getByRole("button", { name: "キャンセル" });
    const confirm = screen.getByRole("button", { name: "保存中…" });

    expect(cancel).toHaveProperty("disabled", true);
    expect(confirm).toHaveProperty("disabled", true);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("dialog")).toBe(dialog);
    fireEvent.click(cancel);
    expect(screen.getByRole("dialog")).toBe(dialog);
  });
});
