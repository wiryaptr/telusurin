import { MIN_REGIONS } from "./constants";
import type { Observation } from "./schemas";

export type Num = number | null;

export function changeAbs(from: Num, to: Num): Num {
  if (from === null || to === null) {
    return null;
  }
  return to - from;
}

export function simpleMean(
  values: Num[],
  minCount: number = MIN_REGIONS,
): { mean: Num; n: number } {
  const valid = values.filter((value): value is number => value !== null);
  if (valid.length < minCount) {
    return { mean: null, n: valid.length };
  }
  const sum = valid.reduce((total, value) => total + value, 0);
  return { mean: sum / valid.length, n: valid.length };
}

export function gapToMean(value: Num, mean: Num): Num {
  if (value === null || mean === null) {
    return null;
  }
  return value - mean;
}

export function rankDesc(items: { code: string; value: Num }[]): { code: string; rank: number | null }[] {
  const sorted = items
    .filter((item) => item.value !== null)
    .map((item) => ({ code: item.code, value: item.value as number }))
    .sort((a, b) => b.value - a.value);

  const ranks = new Map<string, number>();
  let rank = 0;
  let previous: number | null = null;
  sorted.forEach((item, index) => {
    if (previous === null || item.value !== previous) {
      rank = index + 1;
    }
    ranks.set(item.code, rank);
    previous = item.value;
  });

  return items.map((item) => ({
    code: item.code,
    rank: item.value === null ? null : (ranks.get(item.code) ?? null),
  }));
}

export function sameAtPrecision(a: Num, b: Num, decimals: number): boolean {
  if (a === null || b === null) {
    return false;
  }
  const factor = 10 ** decimals;
  return Math.round(a * factor) === Math.round(b * factor);
}

export function getCoverageText(totalRegions: number, observations: Observation[], year: number): string {
  const regionsInYear = new Set(
    observations.filter(o => o.year === year && o.value !== null).map(o => o.regionCode)
  );
  if (regionsInYear.size === totalRegions) {
    return "Lengkap";
  }
  return `${regionsInYear.size} dari ${totalRegions} daerah pada ${year}`;
}

export function availableYears(observations: Observation[], minRegions: number = MIN_REGIONS): number[] {
  const regionsByYear = new Map<number, Set<string>>();
  for (const observation of observations) {
    if (observation.value === null) {
      continue;
    }
    const codes = regionsByYear.get(observation.year) ?? new Set<string>();
    codes.add(observation.regionCode);
    regionsByYear.set(observation.year, codes);
  }
  const years: number[] = [];
  for (const [year, codes] of regionsByYear) {
    if (codes.size >= minRegions) {
      years.push(year);
    }
  }
  return years.sort((a, b) => a - b);
}
