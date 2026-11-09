import { MIN_REGIONS } from "./constants";
import { changeAbs, gapToMean, sameAtPrecision, simpleMean } from "./calculations";
import type { Indicator, Observation, Region } from "./schemas";
import { formatNumber } from "../lib/format";

export type InsightReason =
  | "kurang_daerah"
  | "tahun_pembanding_tidak_ada"
  | "rata_rata_tidak_cukup"
  | "status_belum_resmi";

export type InsightEvidence = {
  ruleId: "I1" | "I2" | "I3" | "I4" | "I5";
  indicatorCode: string;
  unit: string;
  years: number[];
  regionCodes: string[];
  values: (number | null)[];
  formula: string;
  meaning: string;
  limitation: string;
  sourceIds: string[];
  n?: number;
  reason?: InsightReason;
};

export type Insight = {
  id: string;
  text: string;
  evidence: InsightEvidence;
};

export type InsightInput = {
  indicator: Indicator;
  year: number;
  /** Daerah terpilih, urutan sesuai filter. */
  regions: Region[];
  /** Observasi daerah terpilih, semua tahun. */
  selectedObservations: Observation[];
  /** Observasi semua daerah di dataset (untuk rata-rata). */
  allObservations: Observation[];
  /** Tahun tersedia indikator (spec 4.4), urut naik. */
  availableYears: number[];
};

const LIMITATION_COMPARE =
  "Nilai yang lebih tinggi tidak otomatis berarti kondisi lebih baik atau lebih buruk; arah penilaian bergantung pada definisi indikator.";
const LIMITATION_CHANGE =
  "Perubahan antara dua tahun tidak menjelaskan penyebabnya dan tidak memuat tahun di antaranya.";
const LIMITATION_COMPLETENESS =
  "Nilai yang belum tersedia tidak diisi atau diperkirakan; daerah itu tidak ikut dalam perbandingan.";

const MAX_NAMES = 3;

function formatWithUnit(value: number, indicator: Indicator): string {
  return `${formatNumber(value, indicator.decimals)} ${indicator.unitShort}`.trim();
}

/** Selisih: indikator persen memakai poin persentase (spec 7). */
function formatGap(value: number, indicator: Indicator): string {
  const text = formatNumber(Math.abs(value), indicator.decimals);
  return indicator.valueKind === "percent"
    ? `${text} poin persentase`
    : `${text} ${indicator.unitShort}`.trim();
}

function joinNames(names: string[]): string {
  if (names.length <= MAX_NAMES) {
    return names.length <= 1
      ? (names[0] ?? "")
      : `${names.slice(0, -1).join(", ")} dan ${names[names.length - 1]}`;
  }
  return `${names.slice(0, MAX_NAMES).join(", ")} dan ${names.length - MAX_NAMES} daerah lain`;
}

function reasonText(
  reason: InsightReason,
  p: { year?: number; n?: number; region?: string; yearA?: number; yearB?: number; indicator?: string },
): string {
  switch (reason) {
    case "kurang_daerah":
      return `Pilih minimal ${MIN_REGIONS} daerah yang punya data pada ${p.year} untuk melihat nilai tertinggi dan terendah. Saat ini ${p.n} daerah.`;
    case "tahun_pembanding_tidak_ada":
      return `Perubahan di ${p.region} belum dapat dihitung: nilai ${p.yearA} atau ${p.yearB} belum tersedia.`;
    case "rata_rata_tidak_cukup":
      return `Rata-rata sederhana belum dapat dihitung: hanya ${p.n} daerah yang punya data pada ${p.year}, kurang dari ${MIN_REGIONS}.`;
    case "status_belum_resmi":
      return `Data ${p.indicator} belum berstatus resmi, sehingga belum dipakai untuk insight.`;
  }
}

function sourcesOf(observations: Observation[], indicator: Indicator): string[] {
  const ids = new Set(observations.map((o) => o.sourceId));
  return ids.size > 0 ? [...ids].sort() : [...indicator.sourceIds];
}

function notice(
  indicator: Indicator,
  reason: InsightReason,
  text: string,
  base: Partial<InsightEvidence>,
  idSuffix: string,
): Insight {
  return {
    id: `I5-${reason}-${idSuffix}`,
    text,
    evidence: {
      ruleId: "I5",
      indicatorCode: indicator.code,
      unit: indicator.unit,
      years: [],
      regionCodes: [],
      values: [],
      formula: "-",
      meaning: "Syarat data untuk insight ini belum terpenuhi.",
      limitation: LIMITATION_COMPLETENESS,
      sourceIds: [...indicator.sourceIds],
      reason,
      ...base,
    },
  };
}

/**
 * Insight berbasis aturan (PRD 11, spec 8). Deterministik, tanpa model bahasa.
 * Hanya observasi berstatus `resmi` yang diproses.
 */
export function buildInsights(input: InsightInput): Insight[] {
  const { indicator, year, regions, availableYears } = input;
  const resmi = (o: Observation) => o.status === "resmi";
  const selected = input.selectedObservations.filter(resmi);
  const all = input.allObservations.filter(resmi);

  if (!input.selectedObservations.some(resmi) && input.selectedObservations.length > 0) {
    return [
      notice(
        indicator,
        "status_belum_resmi",
        reasonText("status_belum_resmi", { indicator: indicator.name }),
        {},
        "status",
      ),
    ];
  }

  const valueAt = (code: string, y: number): number | null =>
    selected.find((o) => o.regionCode === code && o.year === y)?.value ?? null;

  const insights: Insight[] = [];

  // I1 tertinggi dan terendah
  const withValue = regions
    .map((r) => ({ region: r, value: valueAt(r.code, year) }))
    .filter((x): x is { region: Region; value: number } => x.value !== null);

  if (withValue.length >= MIN_REGIONS) {
    const max = Math.max(...withValue.map((x) => x.value));
    const min = Math.min(...withValue.map((x) => x.value));
    const top = withValue.filter((x) => x.value === max);
    const low = withValue.filter((x) => x.value === min);
    const same = max === min;
    const text = same
      ? `Pada ${year}, di antara ${withValue.length} daerah terpilih, ${indicator.name} bernilai sama di semua daerah (${formatWithUnit(max, indicator)}).`
      : `Pada ${year}, di antara ${withValue.length} daerah terpilih, ${indicator.name} tertinggi di ${joinNames(top.map((x) => x.region.name))} (${formatWithUnit(max, indicator)}) dan terendah di ${joinNames(low.map((x) => x.region.name))} (${formatWithUnit(min, indicator)}). Selisihnya ${formatGap(max - min, indicator)}.`;
    insights.push({
      id: "I1",
      text,
      evidence: {
        ruleId: "I1",
        indicatorCode: indicator.code,
        unit: indicator.unit,
        years: [year],
        regionCodes: withValue.map((x) => x.region.code),
        values: withValue.map((x) => x.value),
        formula: "nilai_tertinggi - nilai_terendah",
        meaning: "Jarak antara nilai terbesar dan terkecil di antara daerah terpilih pada tahun itu.",
        limitation: LIMITATION_COMPARE,
        sourceIds: sourcesOf(selected.filter((o) => o.year === year), indicator),
        n: withValue.length,
      },
    });
  } else {
    insights.push(
      notice(
        indicator,
        "kurang_daerah",
        reasonText("kurang_daerah", { year, n: withValue.length }),
        { years: [year], n: withValue.length },
        String(year),
      ),
    );
  }

  // I2 perubahan antar tahun tersedia
  if (availableYears.length >= 2) {
    const yearA = availableYears[0];
    const yearB = availableYears[availableYears.length - 1];
    for (const region of regions) {
      const a = valueAt(region.code, yearA);
      const b = valueAt(region.code, yearB);
      const delta = changeAbs(a, b);
      if (a === null || b === null || delta === null) {
        insights.push(
          notice(
            indicator,
            "tahun_pembanding_tidak_ada",
            reasonText("tahun_pembanding_tidak_ada", { region: region.name, yearA, yearB }),
            { years: [yearA, yearB], regionCodes: [region.code], values: [a, b] },
            region.code,
          ),
        );
        continue;
      }
      const unchanged = sameAtPrecision(a, b, indicator.decimals);
      const arah = delta > 0 ? "naik" : "turun";
      const text = unchanged
        ? `Dari ${yearA} ke ${yearB}, ${indicator.name} di ${region.name} tidak berubah (${formatWithUnit(a, indicator)}).`
        : `Dari ${yearA} ke ${yearB}, ${indicator.name} di ${region.name} ${arah} ${formatGap(delta, indicator)} (dari ${formatWithUnit(a, indicator)} ke ${formatWithUnit(b, indicator)}).`;
      insights.push({
        id: `I2-${region.code}`,
        text,
        evidence: {
          ruleId: "I2",
          indicatorCode: indicator.code,
          unit: indicator.unit,
          years: [yearA, yearB],
          regionCodes: [region.code],
          values: [a, b],
          formula: "nilai_B - nilai_A",
          meaning: "Selisih nilai antara tahun awal dan tahun akhir yang tersedia.",
          limitation: LIMITATION_CHANGE,
          sourceIds: sourcesOf(
            selected.filter((o) => o.regionCode === region.code && (o.year === yearA || o.year === yearB)),
            indicator,
          ),
        },
      });
    }
  }

  // I3 terhadap rata-rata sederhana semua daerah di dataset
  const mean = simpleMean(all.filter((o) => o.year === year).map((o) => o.value));
  if (mean.mean === null) {
    insights.push(
      notice(
        indicator,
        "rata_rata_tidak_cukup",
        reasonText("rata_rata_tidak_cukup", { year, n: mean.n }),
        { years: [year], n: mean.n },
        String(year),
      ),
    );
  } else {
    for (const { region, value } of withValue) {
      const gap = gapToMean(value, mean.mean);
      if (gap === null) continue;
      const rel = sameAtPrecision(value, mean.mean, indicator.decimals)
        ? "sama dengan"
        : gap > 0
          ? "di atas"
          : "di bawah";
      insights.push({
        id: `I3-${region.code}`,
        text: `Pada ${year}, ${indicator.name} di ${region.name} (${formatWithUnit(value, indicator)}) ${rel} rata-rata sederhana ${mean.n} daerah (${formatWithUnit(mean.mean, indicator)}), selisih ${formatGap(gap, indicator)}.`,
        evidence: {
          ruleId: "I3",
          indicatorCode: indicator.code,
          unit: indicator.unit,
          years: [year],
          regionCodes: [region.code],
          values: [value, mean.mean],
          formula: "nilai_daerah - rata_rata_sederhana",
          meaning:
            "Posisi nilai daerah terhadap rata-rata sederhana semua daerah di dataset yang punya data pada tahun itu.",
          limitation: `${LIMITATION_COMPARE} Rata-rata tidak dibobot jumlah penduduk dan bukan angka resmi provinsi.`,
          sourceIds: sourcesOf(all.filter((o) => o.year === year), indicator),
          n: mean.n,
        },
      });
    }
  }

  // I4 kelengkapan
  const missing = regions.filter((r) => valueAt(r.code, year) === null);
  if (missing.length > 0) {
    insights.push({
      id: "I4",
      text: `Data ${indicator.name} untuk ${missing.length} dari ${regions.length} daerah terpilih belum tersedia pada ${year}: ${missing.map((r) => r.name).join(", ")}.`,
      evidence: {
        ruleId: "I4",
        indicatorCode: indicator.code,
        unit: indicator.unit,
        years: [year],
        regionCodes: missing.map((r) => r.code),
        values: missing.map(() => null),
        formula: "jumlah daerah terpilih tanpa nilai",
        meaning: "Daftar daerah terpilih yang nilainya belum tersedia pada tahun itu.",
        limitation: LIMITATION_COMPLETENESS,
        sourceIds: [...indicator.sourceIds],
        n: missing.length,
      },
    });
  }

  return insights;
}
