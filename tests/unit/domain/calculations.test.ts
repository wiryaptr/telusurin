import { describe, it, expect } from "vitest";
import { availableYears, simpleMean, getCoverageText } from "../../../src/domain/calculations";
import type { Observation } from "../../../src/domain/schemas";

function obs(year: number, region: string, value: number | null, status: "resmi" | "contoh" | "belum_terverifikasi" = "resmi"): Observation {
  return {
    indicatorCode: "pend_aps_16_18",
    regionCode: region,
    year,
    value,
    nullReason: undefined,
    status,
    sourceId: "bps-pendidikan",
  };
}

describe("availableYears", () => {
  it("returns years with at least minRegions distinct regions with non-null value", () => {
    const obsList = [
      obs(2020, "A", 10),
      obs(2020, "B", 20),
      obs(2021, "A", 5),
      obs(2021, "C", null),
    ];
    expect(availableYears(obsList, 2)).toEqual([2020]);
  });

  it("counts distinct regions, not rows", () => {
    const obsList = [
      obs(2020, "A", 10),
      obs(2020, "A", 11),
      obs(2020, "B", 20),
    ];
    expect(availableYears(obsList, 2)).toEqual([2020]);
    expect(availableYears(obsList, 3)).toEqual([]);
  });

  it("counts contoh status for available year (spec 4.4)", () => {
    const obsList = [obs(2020, "A", 10, "contoh"), obs(2020, "B", 20, "contoh")];
    expect(availableYears(obsList, 2)).toEqual([2020]);
  });

  it("requires MIN_REGIONS distinct regions with non-null value", () => {
    const obsList = [
      obs(2020, "A", 10, "contoh"),
      obs(2020, "B", null),
    ];
    expect(availableYears(obsList, 2)).toEqual([]);
  });
});

describe("simpleMean", () => {
  it("mean from valid values only, n equals count of valid values", () => {
    const result = simpleMean([10, 20, 30]);
    expect(result.mean).toBe(20);
    expect(result.n).toBe(3);
  });

  it("ignores null values", () => {
    const result = simpleMean([10, null, 20, 30]);
    expect(result.mean).toBe(20);
    expect(result.n).toBe(3);
  });

  it("calculates mean correctly with 5 regions, 1 null", () => {
    const values: (number | null)[] = [10, 20, 30, 40, null];
    const result = simpleMean(values);
    expect(result.mean).toBe(25);
    expect(result.n).toBe(4);
  });
});

describe("getCoverageText", () => {
  it("returns Lengkap when all regions present", () => {
    const obsList = [obs(2020, "A", 10), obs(2020, "B", 20)];
    expect(getCoverageText(2, obsList, 2020)).toBe("Lengkap");
  });

  it("returns partial text when regions missing", () => {
    const obsList = [obs(2020, "A", 10)];
    expect(getCoverageText(2, obsList, 2020)).toBe("1 dari 2 daerah pada 2020");
  });
});
