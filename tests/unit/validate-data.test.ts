import { describe, expect, it } from "vitest";
import { shouldRejectContoh } from "../../scripts/validate-data";

describe("shouldRejectContoh (spec 4.3 butir 8)", () => {
  it("membiarkan status contoh pada dataset fixture", () => {
    expect(shouldRejectContoh("contoh", true)).toBe(false);
  });

  it("menolak status contoh pada dataset produksi", () => {
    expect(shouldRejectContoh("contoh", false)).toBe(true);
  });

  it("tidak menolak status yang bukan contoh", () => {
    expect(shouldRejectContoh("resmi", true)).toBe(false);
    expect(shouldRejectContoh("belum_terverifikasi", false)).toBe(false);
  });
});