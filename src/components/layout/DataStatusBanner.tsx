import type { DataStatus } from "@/domain/schemas";
import { getStatusInfo } from "@/lib/status";

export function DataStatusBanner({ status }: { status: DataStatus }) {
  if (status === "resmi") {
    return null;
  }
  
  const info = getStatusInfo(status);
  const meaning = status === "contoh" 
    ? "Data ini contoh untuk pengujian." 
    : "Data ini belum terverifikasi.";

  return (
    <div className={`border-b border-rule ${info.bgClass} ${info.colorClass}`} role="status">
      <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6">
        <p className="text-sm">
          <span className="font-bold">Status: {info.label}.</span> {meaning}
        </p>
      </div>
    </div>
  );
}
