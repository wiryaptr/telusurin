import { describe, expect, it } from "vitest";
import { formatNumber, formatValue, nullLabel } from "../../src/lib/format";
import { DataStatusSchema, IndicatorSchema, ObservationSchema } from "../../src/domain/schemas";

describe("nullLabel", () => {
  it("memakai label default ketika tidak ada nullReason", () => {
    expect(nullLabel()).toBe("Belum tersedia");
  });

  it("memakai label sesuai nullReason", () => {
    expect(nullLabel("belum_dilaporkan")).toBe("Belum dilaporkan");
    expect(nullLabel("tidak_tersedia")).toBe("Belum tersedia");
  });
});

describe("formatNumber", () => {
  it("memformat angka dengan koma desimal id-ID", () => {
    expect(formatNumber(72.4, 2)).toBe("72,4");
    expect(formatNumber(65, 2)).toBe("65");
    expect(formatNumber(80.55, 2)).toBe("80,55");
  });
});

describe("formatValue", () => {
  it("memformat nilai atau label kosong", () => {
    expect(formatValue(72.4, 2)).toBe("72,4");
    expect(formatValue(null, 2, "belum_dilaporkan")).toBe("Belum dilaporkan");
  });
});

describe("skema", () => {
  it("memvalidasi status data", () => {
    expect(DataStatusSchema.safeParse("resmi").success).toBe(true);
    expect(DataStatusSchema.safeParse("tidak_ada").success).toBe(false);
  });

  it("memvalidasi indikator dengan bidang yang dikenal", () => {
    expect(IndicatorSchema.safeParse({}).success).toBe(false);
  });

  it("memvalidasi observasi", () => {
    expect(
      ObservationSchema.safeParse({
        regionCode: "f01",
        indicatorCode: "pend_aps_16_18",
        year: 2020,
        value: 60,
        status: "contoh",
        sourceId: "srcpend",
      }).success,
    ).toBe(true);
  });
});
