import { describe, expect, it } from "vitest";
import {
  availableYears,
  changeAbs,
  gapToMean,
  rankDesc,
  sameAtPrecision,
  simpleMean,
} from "../../src/domain/calculations";
import type { Observation } from "../../src/domain/schemas";

describe("changeAbs", () => {
  it("menghitung selisih nilai", () => {
    expect(changeAbs(60, 65)).toBe(5);
  });

  it("mengembalikan null bila nilai dari atau ke nilai kosong", () => {
    expect(changeAbs(null, 65)).toBeNull();
    expect(changeAbs(60, null)).toBeNull();
  });
});

describe("simpleMean", () => {
  it("menghitung rata-rata sederhana", () => {
    expect(simpleMean([60, 70, 80]).mean).toBe(70);
  });

  it("mengembalikan null bila jumlah nilai di bawah ambang minimum", () => {
    const result = simpleMean([60, 70]);
    expect(result.mean).toBeNull();
    expect(result.n).toBe(2);
  });
});

describe("gapToMean", () => {
  it("menghitung selisih nilai terhadap rata-rata", () => {
    expect(gapToMean(80, 70)).toBe(10);
    expect(gapToMean(null, 70)).toBeNull();
    expect(gapToMean(80, null)).toBeNull();
  });
});

describe("rankDesc", () => {
  it("memakai peringkat kompetisi dengan nilai sama berbagi peringkat", () => {
    const result = rankDesc([
      { code: "f01", value: 80 },
      { code: "f02", value: 90 },
      { code: "f03", value: 80 },
      { code: "f04", value: 70 },
    ]);
    expect(result.find((item) => item.code === "f02")?.rank).toBe(1);
    expect(result.find((item) => item.code === "f01")?.rank).toBe(2);
    expect(result.find((item) => item.code === "f03")?.rank).toBe(2);
    expect(result.find((item) => item.code === "f04")?.rank).toBe(4);
  });

  it("memberi rank null bila nilai kosong", () => {
    const result = rankDesc([{ code: "f01", value: null }]);
    expect(result[0]?.rank).toBeNull();
  });
});

describe("sameAtPrecision", () => {
  it("membandingkan dua nilai pada presisi yang sama", () => {
    expect(sameAtPrecision(60.1, 60.1, 1)).toBe(true);
    expect(sameAtPrecision(60.12, 60.1, 1)).toBe(true);
    expect(sameAtPrecision(60.2, 60.1, 1)).toBe(false);
  });

  it("mengembalikan false bila nilai kosong", () => {
    expect(sameAtPrecision(null, 60, 1)).toBe(false);
  });
});

describe("availableYears", () => {
  const observations: Observation[] = [
    { regionCode: "f01", indicatorCode: "pend_aps_16_18", year: 2020, value: 60, status: "resmi", sourceId: "srcpend" },
    { regionCode: "f02", indicatorCode: "pend_aps_16_18", year: 2020, value: 55, status: "resmi", sourceId: "srcpend" },
    { regionCode: "f03", indicatorCode: "pend_aps_16_18", year: 2020, value: 50, status: "resmi", sourceId: "srcpend" },
    { regionCode: "f01", indicatorCode: "pend_aps_16_18", year: 2021, value: 62, status: "resmi", sourceId: "srcpend" },
    { regionCode: "f02", indicatorCode: "pend_aps_16_18", year: 2021, value: 57, status: "resmi", sourceId: "srcpend" },
    { regionCode: "f01", indicatorCode: "pend_aps_16_18", year: 2022, value: 61, status: "resmi", sourceId: "srcpend" },
  ];

  it("mengembalikan tahun yang punya cukup daerah bernilai", () => {
    expect(availableYears(observations, 3)).toEqual([2020]);
  });

  it("mengembalikan array kosong bila tidak ada tahun yang cukup", () => {
    expect(availableYears([], 3)).toEqual([]);
  });
});
