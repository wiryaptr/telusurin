import type { Indicator, Observation, Region, Source } from "../domain/schemas";

export const CSV_COLUMNS = [
  "kode_daerah",
  "daerah",
  "kode_indikator",
  "indikator",
  "satuan",
  "tahun",
  "nilai",
  "keterangan_kosong",
  "status",
  "sumber",
  "url_sumber",
  "tanggal_ambil",
  "versi_dataset",
] as const;

export type CsvRow = Record<(typeof CSV_COLUMNS)[number], string | number | null>;

const FORMULA_START = /^[=+\-@]/;

/** Sel teks: awalan `'` bila diawali karakter rumus, lalu kutip RFC 4180 bila perlu. */
export function escapeCell(value: string | number | null, isText = true): string {
  if (value === null) return "";
  if (typeof value === "number") return String(value);
  let text = value;
  if (isText && FORMULA_START.test(text)) {
    text = `'${text}`;
  }
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

/**
 * Baris CSV = isi tabel data: daerah terpilih x tahun tersedia (spec 12, D-009).
 * Nilai kosong tetap kosong dan alasannya masuk `keterangan_kosong`.
 */
export function buildCsvRows(p: {
  indicator: Indicator;
  regions: Region[];
  years: number[];
  observations: Observation[];
  sources: Source[];
  datasetVersion: string;
}): CsvRow[] {
  const byKey = new Map(p.observations.map((o) => [`${o.regionCode}|${o.year}`, o]));
  const rows: CsvRow[] = [];
  for (const region of p.regions) {
    for (const year of p.years) {
      const obs = byKey.get(`${region.code}|${year}`);
      const source = p.sources.find((s) => s.id === (obs?.sourceId ?? p.indicator.sourceIds[0]));
      const value = obs?.value ?? null;
      rows.push({
        kode_daerah: region.code,
        daerah: region.name,
        kode_indikator: p.indicator.code,
        indikator: p.indicator.name,
        satuan: p.indicator.unit,
        tahun: year,
        nilai: value,
        keterangan_kosong: value === null ? (obs?.nullReason ?? "tidak_tersedia") : "",
        status: obs?.status ?? "",
        sumber: source?.name ?? "",
        url_sumber: source?.url ?? "",
        tanggal_ambil: source?.retrievedAt ?? "",
        versi_dataset: p.datasetVersion,
      });
    }
  }
  return rows;
}

/** UTF-8 dengan BOM, CRLF, koma, titik desimal. Mengembalikan null bila nol baris (tidak ada berkas kosong). */
export function buildCsv(rows: CsvRow[]): string | null {
  if (rows.length === 0) return null;
  const lines = [CSV_COLUMNS.join(",")];
  for (const row of rows) {
    lines.push(
      CSV_COLUMNS.map((col) => escapeCell(row[col], col !== "nilai" && col !== "tahun")).join(","),
    );
  }
  return "﻿" + lines.join("\r\n") + "\r\n";
}

export function csvFileName(indicatorCode: string): string {
  return `telusurin_${indicatorCode}.csv`;
}
