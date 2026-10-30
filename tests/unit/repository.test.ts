import { describe, expect, it } from "vitest";
import { resolveDatasetDir, getMeta, getRegions, getIndicators, getSources, getObservations } from "../../src/server/data/DataRepository";

describe("DataRepository", () => {
  it("memuat dataset fixture", async () => {
    const dir = resolveDatasetDir({ TELUSURIN_DATASET: "fixture" });
    const meta = await getMeta(dir);
    expect(meta.id).toBe("telusurin-fixture");
    expect(meta.version).toBe("0.1.0");
  });

  it("memuat daftar daerah dari dataset fixture", async () => {
    const dir = resolveDatasetDir({ TELUSURIN_DATASET: "fixture" });
    const regions = await getRegions(dir);
    expect(regions).toHaveLength(5);
    expect(regions[0]).toMatchObject({ code: "f01", kind: "kabupaten" });
  });

  it("memuat indikator dari dataset fixture", async () => {
    const dir = resolveDatasetDir({ TELUSURIN_DATASET: "fixture" });
    const indicators = await getIndicators(dir);
    expect(indicators).toHaveLength(1);
    expect(indicators[0]?.code).toBe("pend_aps_16_18");
  });

  it("memuat sumber dari dataset fixture", async () => {
    const dir = resolveDatasetDir({ TELUSURIN_DATASET: "fixture" });
    const sources = await getSources(dir);
    expect(sources).toHaveLength(1);
    expect(sources[0]?.id).toBe("srcpend");
  });

  it("memfilter observasi per indikator dari dataset fixture", async () => {
    const dir = resolveDatasetDir({ TELUSURIN_DATASET: "fixture" });
    const observations = await getObservations(dir, "pend_aps_16_18");
    expect(observations.length).toBe(25);
  });

  it("mengembalikan array kosong bila indikator tidak ada", async () => {
    const dir = resolveDatasetDir({ TELUSURIN_DATASET: "fixture" });
    const observations = await getObservations(dir, "tidak_ada");
    expect(observations).toEqual([]);
  });
});
