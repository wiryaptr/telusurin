import { describe, expect, it } from "vitest";
import { buildCsv, buildCsvRows, CSV_COLUMNS, csvFileName, escapeCell } from "../../src/lib/csv";
import type { Indicator, Observation, Region, Source } from "../../src/domain/schemas";

const indicator: Indicator = {
  code: "pend_aps_16_18",
  name: "Angka partisipasi sekolah usia 16 sampai 18 tahun",
  field: "pendidikan",
  valueKind: "percent",
  unit: "persen",
  unitShort: "persen",
  decimals: 2,
  definition: "Persentase penduduk usia 16-18 tahun yang bersekolah menurut kabupaten/kota di Jawa Timur.",
  sourceIds: ["bps_jatim_aps_16_18"],
};

const region: Region = { code: "3501", name: "Kabupaten Pacitan", kind: "kabupaten" };

const source: Source = {
  id: "bps_jatim_aps_16_18",
  name: "Angka Partisipasi Sekolah (APS) Menurut Kabupaten/Kota dan Kelompok Umur - Tabel Statistik",
  publisher: "Badan Pusat Statistik (BPS) Provinsi Jawa Timur",
  url: "https://jatim.bps.go.id/id/statistics-table/2/NjMyIzI=/angka-partisipasi-sekolah-aps-.html",
  retrievedAt: "2026-10-27",
  termsStatus: "diperiksa",
  termsNote: "Ketentuan penggunaan BPS diperiksa.",
  citation: "BPS Provinsi Jawa Timur. Angka Partisipasi Sekolah (APS) Menurut Kabupaten/Kota dan Kelompok Umur - Tabel Statistik.",
};

describe("Lib CSV", () => {
  it("memiliki susunan kolom standar", () => {
    expect(CSV_COLUMNS).toContain("kode_daerah");
    expect(CSV_COLUMNS).toContain("nilai");
    expect(CSV_COLUMNS).toContain("keterangan_kosong");
  });

  it("escapeCell menambahkan aposisi bila sel diawali rumus", () => {
    expect(escapeCell("=SUM(A1)")).toBe("'=SUM(A1)");
  });

  it("escapeCell mengutip bila sel mengandung koma", () => {
    expect(escapeCell("Kabupaten, Timur")).toBe('"Kabupaten, Timur"');
  });

  it("buildCsv menghasilkan BOM, CRLF, dan pemisah koma", () => {
    const rows = [
      {
        kode_daerah: "3501",
        daerah: "Kabupaten Pacitan",
        kode_indikator: "pend_aps_16_18",
        indikator: indicator.name,
        satuan: indicator.unit,
        tahun: 2024,
        nilai: 80,
        keterangan_kosong: "",
        status: "resmi",
        sumber: source.name,
        url_sumber: source.url,
        tanggal_ambil: source.retrievedAt,
        versi_dataset: "1.0.0",
      },
    ];
    const csv = buildCsv(rows);
    expect(csv).not.toBeNull();
    if (csv) {
      expect(csv.startsWith("﻿")).toBe(true);
      expect(csv.includes("\r\n")).toBe(true);
      expect(csv.split("\r\n")[0]).toBe("﻿" + CSV_COLUMNS.join(","));
    }
  });

  it("buildCsvRows membuat baris daerah x tahun", () => {
    const observations: Observation[] = [
      { regionCode: "3501", indicatorCode: "pend_aps_16_18", year: 2024, value: 80, status: "resmi", sourceId: source.id },
    ];
    const rows = buildCsvRows({
      indicator,
      regions: [region],
      years: [2024],
      observations,
      sources: [source],
      datasetVersion: "1.0.0",
    });
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ kode_daerah: "3501", tahun: 2024, nilai: 80 });
  });

  it("csvFileName menamai file per indikator", () => {
    expect(csvFileName("pend_aps_16_18")).toBe("telusurin_pend_aps_16_18.csv");
  });
});
