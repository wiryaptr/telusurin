import Link from "next/link";
import { Suspense } from "react";
import { resolveDatasetDir, getMeta, getIndicators, getRegions, getSources, getObservations } from "@/server/data/DataRepository";
import { siteConfig } from "@/config/site";
import { DataStatusBanner } from "@/components/layout/DataStatusBanner";
import { ComparisonChart } from "@/features/dashboard/ComparisonChart";
import type { DataStatus } from "@/domain/schemas";

const FIELD_LABELS: Record<string, string> = {
  pendidikan: "Pendidikan",
  kesehatan: "Kesehatan",
  infrastruktur_dasar: "Infrastruktur dasar",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Suspense fallback={null}>
        <Landing />
      </Suspense>
    </div>
  );
}

async function Landing() {
  const dir = resolveDatasetDir();
  const [meta, indicators, regions, sources] = await Promise.all([
    getMeta(dir),
    getIndicators(dir),
    getRegions(dir),
    getSources(dir),
  ]);

  const indicator = indicators[0];
  const observations = indicator 
    ? await getObservations(dir, indicator.code)
    : [];
  
  const status: DataStatus = observations.some(o => o.status === "contoh") ? "contoh" : "resmi";

  const previewRegions = regions.slice(0, 3);
  const previewRegionCodes = previewRegions.map(r => r.code);
  const allRegionsMean = observations.length > 0 
    ? observations.reduce((sum, o) => sum + (o.value ?? 0), 0) / observations.length 
    : null;

  return (
    <main className="flex-1">
      <DataStatusBanner status={status} />
      
      {/* Hero Section */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 sm:px-6 animate-fade-in-up">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-ink sm:text-6xl md:text-7xl">
            {siteConfig.tagline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-ink-muted leading-relaxed">
            Telusurin angkanya sampai ke sumbernya.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-ink-muted leading-relaxed">
            Pahami perbandingan layanan publik antar kabupaten/kota di {meta.province?.name} melalui data yang transparan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Link 
              href="/dashboard" 
              className="flex h-14 items-center justify-center rounded-xl bg-ink px-10 text-base font-bold text-white transition hover:opacity-90 active:scale-95"
            >
              Buka dashboard
            </Link>
            <Link 
              href="/metodologi" 
              className="flex h-14 items-center justify-center rounded-xl border-2 border-ink/10 px-10 text-base font-bold text-ink transition hover:bg-ink/5 active:scale-95"
            >
              Baca metodologi
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="px-4 py-24 sm:px-6 animate-fade-in-up">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 md:grid-cols-3">
            
            {/* Card 1: Perbandingan */}
            <div className="group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-6 w-full overflow-hidden rounded-2xl bg-white p-4 border border-rule shadow-sm">
                <ComparisonChart 
                  regions={previewRegions} 
                  regionCodes={previewRegionCodes}
                  year={meta.years?.to ?? 0}
                  observations={observations}
                  allRegionsMean={allRegionsMean}
                  allRegionsMeanN={regions.length}
                  unitShort={indicator?.unitShort ?? ""}
                  indicatorName={indicator?.name ?? ""}
                />
              </div>
              <h3 className="text-xl font-bold text-ink">Bandingkan daerah</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Perbandingan langsung antar daerah, dengan label jelas dan metrik yang konsisten.
              </p>
            </div>

            {/* Card 2: Sumber */}
            <div className="group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white p-6 border border-rule shadow-sm flex flex-col justify-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-ink-muted mb-2">Sumber Data Utama</div>
                  <div className="text-sm font-semibold text-ink mb-1">{sources[0]?.name ?? "Belum tersedia"}</div>
                  <div className="text-xs text-ink-muted">{sources[0]?.publisher ?? "-"} ({sources[0]?.retrievedAt ?? "-"})</div>
              </div>
              <h3 className="text-xl font-bold text-ink">Dapat Ditelusuri</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Setiap angka disertai sumber, tanggal pengambilan, dan status verifikasi yang transparan.
              </p>
            </div>

            {/* Card 3: Metodologi */}
            <div className="group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white p-6 border border-rule shadow-sm flex flex-col justify-center">
                  <div className="rounded-lg border border-rule bg-surface p-4">
                    <div className="text-xs font-bold text-ink mb-1">Cara membaca</div>
                    <div className="text-[11px] leading-tight text-ink-muted italic">&ldquo;Nilai lebih besar bukan berarti layanan lebih baik...&rdquo;</div>
                  </div>
              </div>
              <h3 className="text-xl font-bold text-ink">Batas Interpretasi</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Panduan untuk menghindari kesalahan penafsiran data dengan batasan interpretasi yang jelas.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Data Table Section */}
      <section className="px-4 py-24 sm:px-6 bg-ink/[0.02] border-y border-rule animate-fade-in-up">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-3xl font-bold tracking-tight text-ink mb-12">Data yang tersedia</h2>
          <div className="overflow-hidden rounded-2xl border border-rule bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-rule bg-ink/[0.03] text-xs font-bold uppercase tracking-wider text-ink-muted">
                    <th className="py-4 px-6">Indikator</th>
                    <th className="py-4 px-6">Bidang</th>
                    <th className="py-4 px-6">Satuan</th>
                    <th className="py-4 px-6 text-right">Tahun</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {indicators.map((item) => (
                    <tr key={item.code} className="transition hover:bg-ink/[0.01]">
                      <td className="py-5 px-6 text-sm font-semibold text-ink">{item.name}</td>
                      <td className="py-5 px-6 text-sm text-ink-muted">{FIELD_LABELS[item.field] ?? item.field}</td>
                      <td className="py-5 px-6 text-sm text-ink-muted">{item.unitShort}</td>
                      <td className="py-5 px-6 text-sm text-ink-muted text-right tabular-nums">
                        {meta.years?.from}&ndash;{meta.years?.to}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
