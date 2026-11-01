import type { ReactNode } from "react";
import { Button } from "./Button";
import { Dialog, type DialogSize } from "./Dialog";
import { FormActions } from "./FormActions";

export type ConfirmDialogProps = {
  accessibleLabel?: string;
  busy?: boolean;
  busyLabel?: string;
  cancelLabel?: string;
  children?: ReactNode;
  confirmDisabled?: boolean;
  confirmLabel: string;
  confirmVariant?: "primary" | "destructive";
  description?: ReactNode;
  focusConfirm?: boolean;
  onCancel(): void;
  onConfirm(): void;
  size?: DialogSize;
  title: ReactNode;
};

export function ConfirmDialog({
  accessibleLabel,
  busy = false,
  busyLabel,
  cancelLabel = "キャンセル",
  children,
  confirmDisabled = false,
  confirmLabel,
  confirmVariant = "primary",
  description,
  focusConfirm = true,
  onCancel,
  onConfirm,
  size = "small",
  title,
}: ConfirmDialogProps) {
  return (
    <Dialog
      accessibleLabel={accessibleLabel}
      busy={busy}
      description={description}
      footer={
        <FormActions>
          <Button
            disabled={busy}
            onClick={onCancel}
            size="standard"
            variant="secondary"
          >
            {cancelLabel}
          </Button>
          <Button
            busy={busy}
            busyLabel={busyLabel}
            data-dialog-initial-focus={
              focusConfirm && !confirmDisabled ? "" : undefined
            }
            disabled={confirmDisabled}
            onClick={onConfirm}
            size="standard"
            variant={confirmVariant}
          >
            {confirmLabel}
          </Button>
        </FormActions>
      }
      onClose={onCancel}
      size={size}
      title={title}
    >
      {children}
    </Dialog>
  );
}

export type DestructiveConfirmDialogProps = Omit<
  ConfirmDialogProps,
  "confirmVariant"
>;

export function DestructiveConfirmDialog(props: DestructiveConfirmDialogProps) {
  return <ConfirmDialog {...props} confirmVariant="destructive" />;
}
