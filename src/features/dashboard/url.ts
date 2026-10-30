import { DashboardQuerySchema } from "../../domain/schemas";
import type { Indicator, Region } from "../../domain/schemas";
import { MAX_SELECTED_REGIONS, DEFAULT_SELECTED_REGIONS } from "../../domain/constants";

export interface ResolvedDashboardParams {
  indicator: Indicator;
  year: number;
  regionCodes: string[];
  notification: string | null;
}

export function resolveDashboardParams(
  raw: { i?: string | string[]; y?: string | string[]; r?: string | string[] },
  indicators: Indicator[],
  regions: Region[],
  availableYears: number[],
): ResolvedDashboardParams {
  const query = DashboardQuerySchema.safeParse(raw);

  let indicatorCode = "";
  let yearRaw: number | undefined;
  let regionRaw: string[] = [];

  if (query.success && query.data) {
    indicatorCode = query.data.i ?? "";
    yearRaw = query.data.y;
    if (query.data.r) {
      regionRaw = query.data.r.split(",").filter(Boolean);
    }
  }

  const notification: string[] = [];

  // Indikator
  const indicator =
    indicators.find((item) => item.code === indicatorCode) ??
    indicators[0];
  if (!indicator) {
    throw new Error("Dataset tidak memiliki indikator.");
  }
  // Butir 8: Hanya beri notifikasi bila ADA tapi tidak ditemukan
  if (indicatorCode !== "" && !indicators.some((item) => item.code === indicatorCode)) {
    notification.push(
      `Indikator pada tautan tidak ditemukan. Menampilkan ${indicator.name}.`,
    );
  }

  // Tahun tersedia
  const latestAvailableYear = availableYears[availableYears.length - 1];
  let year = latestAvailableYear;
  if (yearRaw !== undefined) {
    if (!availableYears.includes(yearRaw)) {
      // Butir 8: Hanya beri notifikasi bila ADA tapi tidak tersedia
      notification.push(
        `Tahun ${yearRaw} belum tersedia untuk indikator ini. Menampilkan ${latestAvailableYear}.`,
      );
      year = latestAvailableYear;
    } else {
      year = yearRaw;
    }
  }

  // Daerah
  const regionCodeSet = new Set(regions.map((item) => item.code));
  const validCodes = regionRaw.filter((code) => regionCodeSet.has(code));

  let resolvedRegionCodes: string[];
  if (validCodes.length > MAX_SELECTED_REGIONS) {
    notification.push(
      `Hanya ${MAX_SELECTED_REGIONS} daerah yang dapat ditampilkan sekaligus. Menampilkan ${MAX_SELECTED_REGIONS} pertama.`,
    );
    resolvedRegionCodes = validCodes.slice(0, MAX_SELECTED_REGIONS);
  } else if (regionRaw.length > 0 && validCodes.length === 0) {
    // Butir 8: Hanya beri notifikasi bila ADA tapi tidak valid
    const defaults = regions
      .slice()
      .sort((a, b) => a.code.localeCompare(b.code))
      .slice(0, DEFAULT_SELECTED_REGIONS)
      .map((item) => item.code);
    notification.push(
      `Pilihan daerah pada tautan tidak valid. Menampilkan ${DEFAULT_SELECTED_REGIONS} daerah pertama.`,
    );
    resolvedRegionCodes = defaults;
  } else if (validCodes.length === 0) {
    // Default tanpa notifikasi
    resolvedRegionCodes = regions
      .slice()
      .sort((a, b) => a.code.localeCompare(b.code))
      .slice(0, DEFAULT_SELECTED_REGIONS)
      .map((item) => item.code);
  } else {
    resolvedRegionCodes = validCodes;
  }

  return {
    indicator,
    year,
    regionCodes: resolvedRegionCodes,
    notification: notification.length > 0 ? notification.join(" ") : null,
  };
}
