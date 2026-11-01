import { ConfirmDialog } from "./ConfirmDialog";

/** UX2-FORM-SAFETY-001 (#788): 未保存の入力を破棄して移動するかの確認。 */
export function LeaveConfirmDialog({
  description = "移動すると、この画面で保存していない入力は失われます。",
  onLeave,
  onStay,
  open,
}: {
  description?: string;
  onLeave: () => void;
  onStay: () => void;
  open: boolean;
}) {
  if (!open) return null;
  return (
    <ConfirmDialog
      cancelLabel="編集を続ける"
      confirmLabel="破棄して移動"
      confirmVariant="destructive"
      description={description}
      focusConfirm={false}
      onCancel={onStay}
      onConfirm={onLeave}
      title="保存していない変更があります"
    />
  );
}
