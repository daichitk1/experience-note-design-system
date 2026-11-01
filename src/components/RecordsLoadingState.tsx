import { LoadingState } from "./LoadingState";

/** 初回取得の間、toolbarと行に近い領域を確保する。実データの件数は装わない。 */
export function RecordsLoadingState({ label }: { label: string }) {
  return (
    <div className="grid min-h-64 gap-3" data-records-loading aria-busy="true">
      <LoadingState label={label} />
      <div
        aria-hidden="true"
        className="divide-y divide-border border-y border-border"
      >
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex min-h-record-row items-center py-4">
            <span className="block h-4 w-2/3 max-w-sm rounded-sm bg-surface-subtle" />
          </div>
        ))}
      </div>
    </div>
  );
}
