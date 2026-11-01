import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { buttonClassName } from "./button-styles";
import { MoreIcon } from "./icons";

export type RowActionMenuItemTone = "default" | "destructive";

export type RowActionMenuItem = {
  disabled?: boolean;
  /**
   * 画面遷移する項目のリンク先。
   * 指定するとanchorとして描画し、中クリックや新規タブを妨げない。
   * `onSelect`とは排他で、どちらか一方を渡す。
   */
  href?: string;
  label: string;
  onSelect?(): void;
  tone?: RowActionMenuItemTone;
};

export type RowActionMenuProps = {
  items: RowActionMenuItem[];
  /** triggerとmenuのaccessible name。「◯◯」の操作 のように対象を含める。 */
  label: string;
  /**
   * triggerのDOM id。
   * menu itemから開いたDialogを閉じたあと、呼び出し側がここへfocusを戻せるようにする。
   * menu item自体はmenuを閉じた時点で外れるため、復帰先には使えない。
   */
  triggerId?: string;
};

const itemTones: Record<RowActionMenuItemTone, string> = {
  default: "text-text hover:bg-surface-subtle",
  destructive: "text-danger hover:bg-danger/10",
};

/**
 * 一覧行の補助操作をまとめるmenu。
 * triggerは常時表示し、hoverでしか現れない操作を作らない。
 */
export function RowActionMenu({ items, label, triggerId }: RowActionMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | HTMLButtonElement | null>>(
    [],
  );
  const menuId = useId();

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  const enabledIndexes = items
    .map((item, index) => (item.disabled === true ? -1 : index))
    .filter((index) => index >= 0);
  // 開いた直後のfocus先だけを保持する。items配列は毎renderで作り直されるため、
  // 依存配列へ入れず、開閉のときだけ読む。
  const firstEnabledRef = useRef<number | undefined>(undefined);
  firstEnabledRef.current = enabledIndexes[0];

  useEffect(() => {
    if (!open) return;

    const first = firstEnabledRef.current;
    if (first !== undefined) itemRefs.current[first]?.focus();

    const onPointerDown = (event: PointerEvent | MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menuRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("mousedown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  const focusAt = (position: number) => {
    if (enabledIndexes.length === 0) return;
    const wrapped =
      ((position % enabledIndexes.length) + enabledIndexes.length) %
      enabledIndexes.length;
    itemRefs.current[enabledIndexes[wrapped]!]?.focus();
  };

  const onItemKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>,
    index: number,
  ) => {
    const current = enabledIndexes.indexOf(index);

    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusAt(current + 1);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusAt(current - 1);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      focusAt(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      focusAt(enabledIndexes.length - 1);
    }
  };

  return (
    <div className="relative">
      <button
        aria-controls={open ? menuId : undefined}
        aria-expanded={open ? "true" : "false"}
        aria-haspopup="menu"
        aria-label={label}
        className={buttonClassName({
          iconOnly: true,
          size: "standard",
          variant: "ghost",
        })}
        id={triggerId}
        onClick={() => setOpen((current) => !current)}
        ref={triggerRef}
        type="button"
      >
        <MoreIcon className="size-4" />
      </button>

      {open ? (
        <div
          aria-label={label}
          className="absolute right-0 z-10 mt-1 grid w-max min-w-[min(10rem,calc(100vw-28px))] max-w-[calc(100vw-28px)] gap-0.5 rounded-note-sm border border-border bg-surface p-1 shadow-note"
          data-row-action-menu
          id={menuId}
          ref={menuRef}
          role="menu"
        >
          {items.map((item, index) => {
            const disabled = item.disabled === true;
            const itemClassName = `flex min-h-control-compact w-full items-center rounded-note-sm px-3 text-left text-sm font-semibold no-underline ${
              itemTones[item.tone ?? "default"]
            }${disabled ? " cursor-not-allowed opacity-60" : " cursor-pointer"}`;

            if (item.href !== undefined) {
              return (
                <a
                  aria-disabled={disabled ? "true" : undefined}
                  className={itemClassName}
                  href={item.href}
                  key={item.label}
                  onKeyDown={(event) => onItemKeyDown(event, index)}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  role="menuitem"
                  tabIndex={disabled ? -1 : 0}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                aria-disabled={disabled ? "true" : undefined}
                className={itemClassName}
                key={item.label}
                onClick={() => {
                  if (disabled) return;
                  item.onSelect?.();
                  close(true);
                }}
                onKeyDown={(event) => onItemKeyDown(event, index)}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                role="menuitem"
                tabIndex={disabled ? -1 : 0}
                type="button"
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
