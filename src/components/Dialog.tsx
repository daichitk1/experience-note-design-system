import { useEffect, useId, useRef, type ReactNode } from "react";

export type DialogSize = "small" | "medium";

export type DialogProps = {
  accessibleLabel?: string;
  busy?: boolean;
  children?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  onClose(): void;
  size?: DialogSize;
  title: ReactNode;
};

const sizes: Record<DialogSize, string> = {
  small: "max-w-sm",
  medium: "max-w-md",
};

const focusableSelector = [
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "a[href]",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function hasContent(value: ReactNode): boolean {
  return (
    value !== undefined &&
    value !== null &&
    value !== "" &&
    typeof value !== "boolean"
  );
}

function focusableElements(dialog: HTMLDialogElement): HTMLElement[] {
  return Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
}

function focusInitialTarget(dialog: HTMLDialogElement): void {
  const preferred = dialog.querySelector<HTMLElement>(
    "[data-dialog-initial-focus]:not([disabled])",
  );
  const first = focusableElements(dialog)[0];
  (preferred ?? first ?? dialog).focus();
}

export function Dialog({
  accessibleLabel,
  busy = false,
  children,
  description,
  footer,
  onClose,
  size = "small",
  title,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const busyRef = useRef(busy);
  const onCloseRef = useRef(onClose);
  const generatedId = useId();
  const titleId = `${generatedId}-title`;
  const accessibleLabelId = `${generatedId}-accessible-label`;
  const descriptionId = `${generatedId}-description`;
  const descriptionVisible = hasContent(description);

  busyRef.current = busy;
  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const activeElement = document.activeElement;
    if (
      returnFocusRef.current === null &&
      activeElement instanceof HTMLElement &&
      !dialog.contains(activeElement)
    ) {
      returnFocusRef.current = activeElement;
    }

    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    focusInitialTarget(dialog);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (!busyRef.current) onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = focusableElements(dialog);
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement;

      if (!dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (dialog.open && typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");

      const returnTarget = returnFocusRef.current;
      globalThis.setTimeout(() => {
        if (!dialog.isConnected && returnTarget?.isConnected) {
          returnTarget.focus();
        }
      }, 0);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-describedby={descriptionVisible ? descriptionId : undefined}
      aria-labelledby={accessibleLabel ? accessibleLabelId : titleId}
      aria-modal="true"
      className={`m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] overflow-hidden rounded-note border border-border bg-surface p-0 text-text shadow-note backdrop:bg-text/35 ${sizes[size]}`}
      data-dialog-size={size}
      onCancel={(event) => {
        event.preventDefault();
        if (!busyRef.current) onCloseRef.current();
      }}
      tabIndex={-1}
    >
      <div className="max-h-[calc(100dvh_-_2rem)] overflow-y-auto p-5 sm:p-6">
        {accessibleLabel ? (
          <span className="sr-only" id={accessibleLabelId}>
            {accessibleLabel}
          </span>
        ) : null}
        <h2
          className="m-0 font-serif text-xl font-semibold leading-7"
          id={titleId}
        >
          {title}
        </h2>
        {descriptionVisible ? (
          <div
            className="mt-3 text-sm leading-6 text-text-muted"
            id={descriptionId}
          >
            {description}
          </div>
        ) : null}
        {children ? <div className="mt-4">{children}</div> : null}
        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>
    </dialog>
  );
}
