import { describe, expect, it } from "vitest";
import { buildInsights } from "../../src/domain/insights";
import type { Indicator, Observation, Region } from "../../src/domain/schemas";

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

const regions: Region[] = [
  { code: "3501", name: "Kabupaten Pacitan", kind: "kabupaten" },
  { code: "3502", name: "Kabupaten Ponorogo", kind: "kabupaten" },
  { code: "3503", name: "Kabupaten Trenggalek", kind: "kabupaten" },
];

function observation(
  regionCode: string,
  year: number,
  value: number | null,
  status: "resmi" | "belum_terverifikasi" = "resmi",
): Observation {
  return {
    regionCode,
    indicatorCode: "pend_aps_16_18",
    year,
    value,
    status,
    sourceId: "bps_jatim_aps_16_18",
    ...(value === null ? { nullReason: "tidak_tersedia" } : {}),
  };
}

describe("Insight (PRD 11, spec 8)", () => {
  it("membuat insight I1 tertinggi dan terendah ketika minimal 3 daerah punya nilai", () => {
    const insights = buildInsights({
      indicator,
      year: 2024,
      regions,
      selectedObservations: [
        observation("3501", 2024, 90),
        observation("3502", 2024, 80),
        observation("3503", 2024, 70),
      ],
      allObservations: [
        observation("3501", 2024, 90),
        observation("3502", 2024, 80),
        observation("3503", 2024, 70),
      ],
      availableYears: [2020, 2024],
    });
    const i1 = insights.find((i) => i.id === "I1");
    expect(i1).toBeDefined();
    expect(i1!.text).toContain("tertinggi di");
    expect(i1!.text).toContain("terendah di");
  });

  it("membuat insight I4 untuk daerah tanpa nilai", () => {
    const insights = buildInsights({
      indicator,
      year: 2024,
      regions,
      selectedObservations: [observation("3501", 2024, 90), observation("3502", 2024, 80)],
      allObservations: [observation("3501", 2024, 90), observation("3502", 2024, 80)],
      availableYears: [2020, 2024],
    });
    const i4 = insights.find((i) => i.id === "I4");
    expect(i4).toBeDefined();
    expect(i4!.text).toContain("belum tersedia");
  });

  it("membuat insight I5 status bila tidak ada observasi resmi", () => {
    const insights = buildInsights({
      indicator,
      year: 2024,
      regions,
      selectedObservations: [observation("3501", 2024, 90, "belum_terverifikasi")],
      allObservations: [observation("3501", 2024, 90, "belum_terverifikasi")],
      availableYears: [2020, 2024],
    });
    const notice = insights.find((i) => i.evidence.reason);
    expect(notice).toBeDefined();
    expect(notice!.id.startsWith("I5-")).toBe(true);
  });
});
