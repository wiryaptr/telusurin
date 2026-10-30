import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  DatasetMetaSchema,
  IndicatorSchema,
  ObservationSchema,
  RegionSchema,
  SourceSchema,
} from "../../domain/schemas";
import type {
  DatasetMeta,
  Indicator,
  Observation,
  Region,
  Source,
} from "../../domain/schemas";

export function resolveDatasetDir(env: Record<string, string | undefined> = process.env): string {
  if (env.TELUSURIN_DATASET === "fixture") {
    return path.join(process.cwd(), "tests", "fixtures", "dataset");
  }
  return path.join(process.cwd(), "src", "data", "dataset");
}

async function readJson<T>(dir: string, file: string, schema: z.ZodType<T>): Promise<T> {
  const fullPath = path.join(dir, file);
  try {
    const raw = await fs.readFile(fullPath, "utf8");
    return schema.parse(JSON.parse(raw));
  } catch (e) {
    throw new Error(`Data read error: ${fullPath} - ${e instanceof Error ? e.message : String(e)}`);
  }
}

export async function getMeta(dir: string): Promise<DatasetMeta> {
  return readJson(dir, "meta.json", DatasetMetaSchema);
}

export async function getRegions(dir: string): Promise<Region[]> {
  return readJson(dir, "regions.json", z.array(RegionSchema));
}

export async function getIndicators(dir: string): Promise<Indicator[]> {
  return readJson(dir, "indicators.json", z.array(IndicatorSchema));
}

export async function getSources(dir: string): Promise<Source[]> {
  return readJson(dir, "sources.json", z.array(SourceSchema));
}

export async function getObservations(dir: string, indicator: string): Promise<Observation[]> {
  const data = await readJson(dir, "observations.json", z.array(ObservationSchema));
  return data.filter((o) => o.indicatorCode === indicator);
}
