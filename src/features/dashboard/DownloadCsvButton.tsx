"use client";

import { buildCsv, csvFileName } from "@/lib/csv";
import type { CsvRow } from "@/lib/csv";

export function DownloadCsvButton({ rows, indicatorCode }: { rows: CsvRow[]; indicatorCode: string }) {
  const disabled = rows.length === 0;

  function download() {
    const csv = buildCsv(rows);
    if (csv === null) return;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = csvFileName(indicatorCode);
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={download}
        disabled={disabled}
        aria-describedby="csv-note"
        className="min-h-[44px] rounded-lg bg-accent px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Unduh data CSV
      </button>
      <p id="csv-note" className="text-xs text-ink-muted">
        {disabled
          ? "Tidak ada data untuk pilihan ini, jadi berkas tidak dibuat."
          : "Isi sama dengan tabel di bawah: daerah terpilih dan semua tahun tersedia. Format koma, UTF-8."}
      </p>
    </div>
  );
}