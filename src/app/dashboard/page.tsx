"use server";

import { Suspense } from "react";
import { resolveDatasetDir, getMeta, getIndicators, getRegions, getSources, getObservations } from "@/server/data/DataRepository";
import { simpleMean, availableYears as availableYearsFn, getCoverageText } from "@/domain/calculations";
import { MIN_REGIONS } from "@/domain/constants";
import { resolveDashboardParams } from "@/features/dashboard/url";
import { FilterPanel } from "@/features/dashboard/FilterPanel";
import { TrendChart } from "@/features/dashboard/TrendChart";
import { ComparisonChart } from "@/features/dashboard/ComparisonChart";
import { NotificationBanner } from "@/features/dashboard/NotificationBanner";
import { DownloadCsvButton } from "@/features/dashboard/DownloadCsvButton";
import { InsightList } from "@/features/insights/InsightList";
import { buildInsights } from "@/domain/insights";
import { buildCsvRows } from "@/lib/csv";
import { siteConfig } from "@/config/site";
import { DataStatusBanner } from "@/components/layout/DataStatusBanner";
import { Accordion } from "@/components/ui/Accordion";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { StatusBadge } from "@/components/layout/StatusBadge";
import { getStatusInfo } from "@/lib/status";
import type { DataStatus, Indicator, Observation, Region } from "@/domain/schemas";


export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ i?: string; y?: string; r?: string }>;
}) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Dashboard searchParams={searchParams} />
    </Suspense>
  );
}

async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ i?: string; y?: string; r?: string }>;
}) {
  const params = await searchParams;
  const dir = resolveDatasetDir();

  const [meta, indicators, regions] = await Promise.all([
    getMeta(dir),
    getIndicators(dir),
    getRegions(dir),
  ]);

  // Dua tahap: indikator dipastikan dulu, lalu tahun tersedia dihitung dari data (spec 4.4).
  const metaYears: number[] = [];
  for (let y = meta.years.from; y <= meta.years.to; y++) metaYears.push(y);
  const firstPass = resolveDashboardParams(params, indicators, regions, metaYears);

  const allObservations = await getObservations(dir, firstPass.indicator.code);
  const availableYears = availableYearsFn(allObservations, MIN_REGIONS);

  const resolved = resolveDashboardParams(params, indicators, regions, availableYears);
  const { indicator, year, regionCodes, notification } = resolved;

  const filteredObservations = allObservations.filter((o) => regionCodes.includes(o.regionCode));

  // Rata-rata dari semua daerah di dataset, satu nilai per daerah pada tahun terpilih
  const uniqueRegionValues = new Map<string, number>();
  for (const obs of allObservations) {
    if (obs.year === year && obs.value !== null) {
      uniqueRegionValues.set(obs.regionCode, obs.value);
    }
  }
  const meanResult = simpleMean(Array.from(uniqueRegionValues.values()));

  const coverageText = getCoverageText(regions.length, allObservations, year);

  const sources = await getSources(dir);


  // Butir 3: DataStatusBanner wajib tampil bila dataset bukan resmi
  const selectedRegions = regionCodes
    .map((code) => regions.find((r) => r.code === code))
    .filter((r): r is Region => r !== undefined);
  const insights = buildInsights({
    indicator,
    year,
    regions: selectedRegions,
    selectedObservations: filteredObservations,
    allObservations,
    availableYears,
  });
  const csvRows = buildCsvRows({
    indicator,
    regions: selectedRegions,
    years: availableYears,
    observations: filteredObservations,
    sources,
    datasetVersion: meta.version,
  });

  const datasetStatus: DataStatus = filteredObservations.some(o => o.status === "contoh") ? "contoh" : 
                         filteredObservations.some(o => o.status === "belum_terverifikasi") ? "belum_terverifikasi" : "resmi";

  return (
    <main className="mx-auto w-full max-w-[1600px] flex-1 flex-col font-sans animate-fade-in">
      <DataStatusBanner status={datasetStatus} />
      <div className="px-4 py-8 sm:px-8 lg:flex lg:gap-12 lg:px-12 lg:py-12">
        <aside className="mb-8 shrink-0 lg:mb-0 lg:w-80">
          <div className="sticky top-6 rounded-2xl border border-rule bg-white p-5 shadow-sm">
            <h2 className="mb-5 border-b border-rule pb-3 font-sans text-lg font-bold text-ink">Pilih data</h2>
            <FilterPanel
              key={`${indicator.code}|${year}|${regionCodes.join(",")}`}
              indicators={indicators.map((item) => ({ code: item.code, name: item.name }))}
              availableYears={availableYears}
              regions={regions.map((item) => ({ code: item.code, name: item.name, kind: item.kind }))}
              indicatorCode={indicator.code}
              year={year}
              regionCodes={regionCodes}
            />
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-12">
        {notification && (
          <NotificationBanner message={notification} />
        )}
        <header className="animate-fade-in-up">
          <p className="flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-ink-muted">
            <span className="text-accent">Dashboard</span>
            <span aria-hidden="true">/</span>
            <span>{indicator.unitShort}</span>
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {indicator.name}
          </h1>
          <p className="mt-5 text-lg text-ink-muted">Cakupan: {coverageText}</p>
        </header>

        {/* KPI */}
        <section aria-label="Ringkasan indikator">
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-3">
            <div className="border-t border-rule pt-6">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">Rata-rata wilayah</dt>
              <dd className="mt-4 text-4xl font-extrabold leading-none tracking-tight text-ink tabular-nums 2xl:text-5xl">
                {meanResult.mean !== null
                  ? meanResult.mean.toLocaleString("id-ID", { minimumFractionDigits: indicator.decimals, maximumFractionDigits: indicator.decimals })
                  : "-"}
              </dd>
              <p className="mt-4 text-base text-ink-muted">{indicator.unitShort} · Rata-rata antar daerah pada tahun {year}</p>
            </div>
            <div className="border-t border-rule pt-6">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">Jumlah daerah terdata</dt>
              <dd className="mt-4 text-4xl font-extrabold leading-none tracking-tight text-ink tabular-nums 2xl:text-5xl">{meanResult.n}</dd>
              <p className="mt-4 text-base text-ink-muted">Dari total {regions.length} wilayah BPS Jatim pada tahun {year}</p>
            </div>
            <div className="border-t border-rule pt-6">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">Rentang nilai</dt>
              <dd className="mt-4 text-4xl font-extrabold leading-none tracking-tight text-ink tabular-nums 2xl:text-5xl">
                {(() => {
                  const values = filteredObservations.filter((o) => o.year === year && o.value !== null).map((o) => o.value as number);
                  if (values.length < 2) return "-";
                  const max = Math.max(...values);
                  const min = Math.min(...values);
                  const fmt = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: indicator.decimals, maximumFractionDigits: indicator.decimals });
                  return fmt(min) + "–" + fmt(max);
                })()}
              </dd>
              <p className="mt-4 text-base text-ink-muted">{indicator.unitShort} · Terendah sampai tertinggi di daerah terpilih</p>
            </div>
          </dl>
        </section>

        <div>
          <SectionLabel no="01" title="Tren per tahun" />
        <TrendChart
          regions={regions.map((item) => ({ code: item.code, name: item.name }))}
          regionCodes={regionCodes}
          years={availableYears}
          observations={filteredObservations}
          unit={indicator.unit}
          indicatorName={indicator.name}
          decimals={indicator.decimals}
        />
        </div>
        <div>
          <SectionLabel no="02" title={`Perbandingan tahun ${year}`} />
        <ComparisonChart
          regions={regions.map((item) => ({ code: item.code, name: item.name }))}
          regionCodes={regionCodes}
          year={year}
          observations={filteredObservations}
          allRegionsMean={meanResult.mean}
          allRegionsMeanN={meanResult.n}
          unitShort={indicator.unitShort}
          indicatorName={indicator.name}
        />
        </div>
        <div>
          <SectionLabel no="03" title="Sumber dan cara membaca" />
        <ChartFooterServer
          indicator={indicator}
          observations={filteredObservations}
          sources={sources}
        />
        </div>
        <div>
          <SectionLabel no="04" title="Insight otomatis" />
          <InsightList insights={insights} sources={sources} decimals={indicator.decimals} />
        </div>


        <div className="space-y-6">
          <SectionLabel no="05" title="Data" />
        {siteConfig.features.csv && (
          <DownloadCsvButton rows={csvRows} indicatorCode={indicator.code} />
        )}
        <DataTableServer
          regions={regions}
          regionCodes={regionCodes}
          years={availableYears}
          observations={filteredObservations}
          selectedYear={year}
          indicator={indicator}
          meanResult={meanResult}
        />
        </div>
      </div>
    </div>
  </main>
);
}


function SectionLabel({ no, title }: { no: string; title: string }) {
  return (
    <p className="mb-6 flex items-baseline gap-4 border-t border-rule pt-6 text-sm font-bold uppercase tracking-[0.2em] text-ink-muted">
      <span className="tabular-nums text-accent">{no}</span>
      <span>{title}</span>
    </p>
  );
}

function DataTableServer({
  regions,
  regionCodes,
  years,
  observations,
  selectedYear,
  indicator,
  meanResult,
}: {
  regions: Region[];
  regionCodes: string[];
  years: number[];
  observations: Observation[];
  selectedYear: number;
  indicator: Indicator;
  meanResult: { mean: number | null; n: number };
}) {
  const observationsByRegionYear = new Map<string, Map<number, Observation>>();
  for (const observation of observations) {
    let byYear = observationsByRegionYear.get(observation.regionCode);
    if (!byYear) {
      byYear = new Map();
      observationsByRegionYear.set(observation.regionCode, byYear);
    }
    byYear.set(observation.year, observation);
  }

  const hasNonResmi = Array.from(observationsByRegionYear.values()).some(byYear => 
    Array.from(byYear.values()).some(o => o.status !== "resmi")
  );

  return (
    <Accordion title={`Tabel data ${indicator.name}`} contentClassName="p-6 md:p-8">
      <p className="text-sm text-ink-muted mb-6">Satuan: {indicator.unit}</p>
      <div className="overflow-x-auto rounded-xl border border-rule">
        <table className="w-full border-collapse text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-rule bg-ink/[0.03] text-ink-muted uppercase tracking-wider text-[10px]">
              <th className="py-3 pr-4 text-left font-bold sticky left-0 bg-white z-10">Daerah</th>
              {years.map((yearItem) => (
                <th
                  key={yearItem}
                  className={`py-3 px-4 text-right font-bold ${yearItem === selectedYear ? "text-ink ring-1 ring-rule rounded-t-sm" : ""}`}
                >
                  {yearItem}{yearItem === selectedYear ? " (dipilih)" : ""}
                </th>
              ))}
              <th className="py-3 pl-4 text-right font-bold">
                Selisih vs rata-rata ({selectedYear})
              </th>
            </tr>
          </thead>
          <tbody>
            {regionCodes.map((code) => {
              const region = regions.find((item) => item.code === code);
              const byYear = observationsByRegionYear.get(code) ?? new Map();
              const selisihObs = byYear.get(selectedYear);
              const selisih =
                selisihObs && selisihObs.value !== null && meanResult.mean !== null
                  ? selisihObs.value - meanResult.mean
                  : null;
              return (
                <tr key={code} className="border-b border-rule hover:bg-black/[0.02]">
                  <td className="py-3 pr-4 text-ink font-medium sticky left-0 bg-white z-10">{region?.name ?? code}</td>
                  {years.map((yearItem) => {
                    const obs = byYear.get(yearItem);
                    const statusInfo = obs ? getStatusInfo(obs.status) : null;
                    return (
                      <td
                        key={yearItem}
                        className={`py-3 px-4 text-right tabular-nums ${
                          !obs || obs.value === null ? "text-ink-muted italic" : "text-ink"
                        } ${yearItem === selectedYear ? "bg-black/[0.01] ring-1 ring-rule/50" : ""}`}
                      >
                        {!obs || obs.value === null
                          ? nullLabel(obs?.nullReason)
                          : `${obs.value.toLocaleString("id-ID", {
                              minimumFractionDigits: indicator.decimals,
                              maximumFractionDigits: indicator.decimals,
                            })}${statusInfo?.sign ?? ""}`}
                      </td>
                    );
                  })}
                  <td className="py-3 pl-4 text-right tabular-nums font-semibold">
                    {selisih === null ? "-" : (selisih > 0 ? "+" : "") + selisih.toLocaleString("id-ID", {
                      minimumFractionDigits: indicator.decimals,
                      maximumFractionDigits: indicator.decimals,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 space-y-1.5 border-t border-rule/50 pt-4">
        <p className="text-[11px] text-ink-muted">
          <span className="font-bold">Keterangan:</span> Nilai kosong ditampilkan sebagai italic (miring). 
          Rata-rata sederhana ({meanResult.n} daerah) = {meanResult.mean !== null ? meanResult.mean.toLocaleString("id-ID", { maximumFractionDigits: 2 }) : "-"} {indicator.unitShort}.
        </p>
        {hasNonResmi && (
          <p className="text-[11px] text-ink-muted flex gap-4">
            <span>&dagger; Belum terverifikasi</span>
            <span>‡ Contoh</span>
          </p>
        )}
      </div>
    </Accordion>
  );
}

function ChartFooterServer({
  indicator,
  observations,
  sources,
}: {
  indicator: Indicator;
  observations: Observation[];
  sources: { id: string; name: string; publisher: string; retrievedAt: string; termsStatus: string }[];
}) {
  const source = sources.find((item) => indicator.sourceIds.includes(item.id)) ?? sources[0];
  const statuses = new Set(observations.map((item) => item.status));
  const effectiveStatus: DataStatus = statuses.has("contoh") ? "contoh" : 
                                     statuses.has("belum_terverifikasi") ? "belum_terverifikasi" : "resmi";

  return (
    <section className="space-y-4 rounded-2xl border border-rule bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-ink">
        <p>
          <span className="font-bold">Sumber:</span>{" "}
          <span className="underline decoration-dotted underline-offset-2">{source?.name ?? "-"}</span> ({source?.publisher ?? "-"})
        </p>
        <p>
          <span className="font-bold">Diambil:</span>{" "}
          {source?.retrievedAt ?? "-"}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-bold">Status:</span>
          <StatusBadge status={effectiveStatus} />
        </div>
      </div>
      <div className="grid gap-4 border-t border-rule/50 pt-4 sm:grid-cols-2">
        <div className="space-y-2 text-base leading-relaxed text-ink-muted">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink">Cara membaca</p>
          <p>
            Setiap angka disertai satuan, periode, dan sumber. Perbedaan angka antardaerah bukan
            bukti keberhasilan atau kegagalan pemerintah daerah.
          </p>
        </div>
        <div className="space-y-2 text-base leading-relaxed text-ink-muted">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink">Batas interpretasi</p>
          <p>
            Nilai yang lebih tinggi tidak otomatis berarti kondisi lebih baik;
            arah penilaian bergantung pada definisi indikator.
          </p>
        </div>
      </div>
    </section>
  );
}


function nullLabel(nullReason?: string): string {
  if (nullReason === "belum_dilaporkan") {
    return "Belum dilaporkan";
  }
  return "Belum tersedia";
}