import { describe, expect, it } from "vitest";
import { shouldRejectContoh } from "../../scripts/validate-data";

describe("shouldRejectContoh (spec 4.3 butir 8)", () => {
  it("menolak status contoh pada build produksi meski dataset fixture", () => {
    expect(shouldRejectContoh("contoh", true, true)).toBe(true);
  });

  it("membiarkan status contoh pada validasi dev dengan dataset fixture", () => {
    expect(shouldRejectContoh("contoh", true, false)).toBe(false);
  });

  it("menolak status contoh pada dataset produksi", () => {
    expect(shouldRejectContoh("contoh", false, false)).toBe(true);
  });

  it("tidak menolak status yang bukan contoh", () => {
    expect(shouldRejectContoh("resmi", true, true)).toBe(false);
    expect(shouldRejectContoh("belum_terverifikasi", false, false)).toBe(false);
  });
});
