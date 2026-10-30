import type { DataStatus } from "@/domain/schemas";
import { getStatusInfo } from "@/lib/status";

export function StatusBadge({ status, showIcon = true }: { status: DataStatus; showIcon?: boolean }) {
  const info = getStatusInfo(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-medium ${info.bgClass} ${info.colorClass}`}>
      {showIcon && (
        <span className="sr-only">{info.iconLabel}: </span>
      )}
      {info.label}
      {info.sign && <span className="ml-0.5">{info.sign}</span>}
    </span>
  );
}
