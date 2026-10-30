import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { z } from "zod";
import { resolveDatasetDir } from "../src/server/data/DataRepository";
import { MIN_REGIONS, MIN_YEARS_WARNING } from "../src/domain/constants";
import {
  DatasetMetaSchema,
  IndicatorSchema,
  ObservationSchema,
  RegionSchema,
  SourceSchema,
} from "../src/domain/schemas";
import type {
  DatasetMeta,
  Indicator,
  Observation,
  Region,
  Source,
} from "../src/domain/schemas";

interface ValidationIssue {
  location: string;
  message: string;
}

async function readJson<T>(dir: string, file: string, schema: z.ZodType<T>): Promise<T> {
  const fullPath = path.join(dir, file);
  const raw = await fs.readFile(fullPath, "utf8");
  const parsed: unknown = JSON.parse(raw);
  const data = schema.parse(parsed);
  return data;
}

export function shouldRejectContoh(status: string, isFixture: boolean): boolean {
  return status === "contoh" && !isFixture;
}

async function main(): Promise<void> {
  const dir = resolveDatasetDir();
  const isFixture = process.env.TELUSURIN_DATASET === "fixture";
  const [meta, indicators, regions, sources, observations] = await Promise.all([
    readJson<DatasetMeta>(dir, "meta.json", DatasetMetaSchema),
    readJson<Indicator[]>(dir, "indicators.json", z.array(IndicatorSchema)),
    readJson<Region[]>(dir, "regions.json", z.array(RegionSchema)),
    readJson<Source[]>(dir, "sources.json", z.array(SourceSchema)),
    readJson<Observation[]>(dir, "observations.json", z.array(ObservationSchema)),
  ]);

  const issues: ValidationIssue[] = [];

  const regionCodes = new Set(regions.map((region) => region.code));
  const sourceIds = new Set(sources.map((source) => source.id));
  const indicatorCodes = new Set(indicators.map((indicator) => indicator.code));

  const seenKeys = new Set<string>();
  for (const observation of observations) {
    const key = `${observation.regionCode}|${observation.indicatorCode}|${observation.year}`;
    if (seenKeys.has(key)) {
      issues.push({ location: key, message: "Kunci unik (regionCode, indicatorCode, year) mengalami duplikat." });
    }
    seenKeys.add(key);

    if (!regionCodes.has(observation.regionCode)) {
      issues.push({ location: observation.regionCode, message: `regionCode ${observation.regionCode} tidak ada di regions.json.` });
    }
    if (!indicatorCodes.has(observation.indicatorCode)) {
      issues.push({ location: observation.indicatorCode, message: `indicatorCode ${observation.indicatorCode} tidak ada di indicators.json.` });
    }
    if (!sourceIds.has(observation.sourceId)) {
      issues.push({ location: observation.sourceId, message: `sourceId ${observation.sourceId} tidak ada di sources.json.` });
    }

    const indicator = indicators.find((item) => item.code === observation.indicatorCode);
    if (indicator && !indicator.sourceIds.includes(observation.sourceId)) {
      issues.push({
        location: observation.sourceId,
        message: `Sumber ${observation.sourceId} tidak termasuk sourceIds indikator ${observation.indicatorCode}.`,
      });
    }

    if (observation.year < meta.years.from || observation.year > meta.years.to) {
      issues.push({
        location: key,
        message: `Tahun ${observation.year} di luar rentang meta.years (${meta.years.from} sampai ${meta.years.to}).`,
      });
    }

    if (observation.value !== null && observation.value < 0) {
      issues.push({ location: key, message: "Nilai tidak boleh negatif." });
    }

    if (observation.value === null && !observation.nullReason) {
      issues.push({ location: key, message: "Nilai null tanpa nullReason." });
    }

    if (observation.value !== null && observation.status === "resmi") {
      const source = sources.find((item) => item.id === observation.sourceId);
      if (source?.termsStatus !== "diperiksa") {
        issues.push({
          location: observation.sourceId,
          message: `Observasi berstatus resmi merujuk sumber ${observation.sourceId} yang belum termsStatus "diperiksa".`,
        });
      }
    }

    if (shouldRejectContoh(observation.status, isFixture)) {
      issues.push({ location: observation.sourceId, message: "Status contoh tidak boleh ada pada dataset produksi." });
    }
  }

  const changelog = meta.changelog;
  const last = changelog[changelog.length - 1];
  if (meta.version !== last.version) {
    issues.push({ location: "meta.version", message: `meta.version ${meta.version} tidak sama dengan versi changelog terakhir ${last.version}.` });
  }
  if (meta.updatedAt !== last.date) {
    issues.push({ location: "meta.updatedAt", message: `meta.updatedAt ${meta.updatedAt} tidak sama dengan tanggal changelog terakhir ${last.date}.` });
  }

  const observationsByIndicator = new Map<string, Observation[]>();
  for (const observation of observations) {
    const list = observationsByIndicator.get(observation.indicatorCode) ?? [];
    list.push(observation);
    observationsByIndicator.set(observation.indicatorCode, list);
  }

  for (const indicator of indicators) {
    const list = observationsByIndicator.get(indicator.code) ?? [];
    const yearCounts = new Map<number, number>();
    let nullCount = 0;
    let zeroCount = 0;
    for (const observation of list) {
      if (observation.value === null) {
        nullCount += 1;
        continue;
      }
      if (observation.value === 0) {
        zeroCount += 1;
      }
      yearCounts.set(observation.year, (yearCounts.get(observation.year) ?? 0) + 1);
    }
    const yearsWithData: number[] = [...yearCounts.entries()]
      .filter(([, count]) => count >= MIN_REGIONS)
      .map(([year]) => year)
      .sort((a, b) => a - b);

    if (yearsWithData.length > 0 && yearsWithData.length < MIN_YEARS_WARNING) {
      issues.push({
        location: indicator.code,
        message: `Indikator ${indicator.code} hanya punya ${yearsWithData.length} tahun tersedia, di bawah batas peringatan ${MIN_YEARS_WARNING}.`,
      });
    }

    for (const year of yearsWithData) {
      const count = yearCounts.get(year) ?? 0;
      if (count < MIN_REGIONS) {
        issues.push({
          location: `${indicator.code}|${year}`,
          message: `Pada tahun ${year}, hanya ${count} daerah yang memiliki nilai untuk indikator ${indicator.code}, di bawah ${MIN_REGIONS}.`,
        });
      }
    }

    console.log(
      `Indikator ${indicator.code}: tahun tersedia ${yearsWithData.join(", ") || "belum ada"}; jumlah null ${nullCount}; jumlah nilai 0 ${zeroCount}.`,
    );
  }

  if (indicators.length === 0) {
    issues.push({ location: "indicators.json", message: "Tidak ada indikator pada dataset." });
  }
  if (observations.length === 0) {
    issues.push({ location: "observations.json", message: "Tidak ada observasi pada dataset." });
  }

  if (issues.length > 0) {
    for (const issue of issues) {
      console.error(`ISSUES: ${issue.location} - ${issue.message}`);
    }
    process.exit(1);
  }
}

const isDirectRun = import.meta.url === pathToFileURL(process.argv[1] ?? "").href;
if (isDirectRun) {
  main();
}
