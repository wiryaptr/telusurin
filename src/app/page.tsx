import Link from "next/link";
import { Suspense } from "react";
import { resolveDatasetDir, getMeta, getIndicators, getSources, getObservations } from "@/server/data/DataRepository";
import { siteConfig } from "@/config/site";
import { DataStatusBanner } from "@/components/layout/DataStatusBanner";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { availableYears as availableYearsFn } from "@/domain/calculations";
import { MAX_SELECTED_REGIONS } from "@/domain/constants";
import type { DataStatus } from "@/domain/schemas";

const FEATURES = [
  {
    title: "Bandingkan daerah",
    description:
      "Pilih sampai 5 kabupaten/kota dan lihat tren serta perbandingannya dengan label jelas dan satuan yang konsisten.",
    href: "/dashboard",
    cta: "Buka dashboard",
  },
  {
    title: "Dapat ditelusuri",
    description:
      "Setiap angka disertai sumber, tanggal pengambilan, dan status verifikasi, sampai ke tabel BPS asalnya.",
    href: "/metodologi#data",
    cta: "Lihat sumber data",
  },
  {
    title: "Batas interpretasi",
    description:
      "Nilai yang lebih tinggi belum tentu berarti layanan lebih baik. Panduan membaca membantu menghindari salah tafsir.",
    href: "/metodologi#batasan",
    cta: "Baca batasannya",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans animate-fade-in">
      <Suspense fallback={<PageSkeleton />}>
        <Landing />
      </Suspense>
    </div>
  );
}

async function Landing() {
  const dir = resolveDatasetDir();
  const [meta, indicators, sources] = await Promise.all([
    getMeta(dir),
    getIndicators(dir),
    getSources(dir),
  ]);

  const observationsByIndicator = await Promise.all(
    indicators.map((item) => getObservations(dir, item.code)),
  );
  const yearsByIndicator = new Map(
    indicators.map((item, index) => [item.code, availableYearsFn(observationsByIndicator[index] ?? [])]),
  );
  const allObservations = observationsByIndicator.flat();
  const status: DataStatus = allObservations.some((o) => o.status === "contoh")
    ? "contoh"
    : allObservations.some((o) => o.status === "belum_terverifikasi")
      ? "belum_terverifikasi"
      : "resmi";


  return (
    <main className="flex-1">
      <DataStatusBanner status={status} />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6 animate-fade-in-up">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl" />
          <div className="absolute -bottom-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-series-1/[0.06] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
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

      {/* Fitur utama */}
      <section className="px-4 py-24 sm:px-6 animate-fade-in-up">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className="flex h-full flex-col rounded-2xl border border-rule bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-ink">{feature.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{feature.description}</p>
                <Link
                  href={feature.href}
                  className="mt-6 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent hover:underline"
                >
                  {feature.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Data yang tersedia */}
      <section className="px-4 pt-20 pb-16 sm:px-6 bg-ink/[0.02] animate-fade-in-up">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-3xl font-bold tracking-tight text-ink mb-12">Data yang tersedia</h2>
          <div>
            {indicators.map((item) => (
              <AccordionItem key={item.code} title={item.name} badge={`${item.field} · ${item.unit}`}>
                <div className="px-5 pb-5">
                  <p className="text-sm text-ink-muted leading-relaxed">{item.definition}</p>
                  <p className="mt-3 text-sm text-ink-muted">Satuan: {item.unit}</p>
                  {(() => {
                    const years = yearsByIndicator.get(item.code) ?? [];
                    return (
                      <p className="mt-1 text-sm text-ink-muted">
                        Tahun: {years.length > 0 ? `${years[0]} sampai ${years[years.length - 1]}` : "belum tersedia"}
                      </p>
                    );
                  })()}
                  {sources
                    .filter((source) => item.sourceIds.includes(source.id))
                    .map((source) => (
                      <p key={source.id} className="mt-3 text-sm text-ink-muted">
                        Sumber:{" "}
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                          {source.name}
                        </a>
                      </p>
                    ))}
                  <Link
                    href={`/dashboard?i=${item.code}`}
                    className="mt-4 inline-flex h-12 items-center justify-center rounded-xl bg-ink px-6 text-sm font-bold text-white transition hover:opacity-90"
                  >
                    Lihat di dashboard
                  </Link>
                </div>
              </AccordionItem>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-judul" className="px-4 pt-16 pb-24 sm:px-6 animate-fade-in-up">
        <div className="mx-auto max-w-[1120px]">
          <h2 id="faq-judul" className="text-3xl font-bold tracking-tight text-ink mb-12">Pertanyaan umum</h2>
          <div>
            <AccordionItem title="Dari mana data Telusurin berasal?">
              <div className="px-5 pb-5">
                <p className="text-sm text-ink-muted leading-relaxed">
                  Dari tabel statistik BPS Provinsi Jawa Timur. Setiap angka menyertakan sumber, tanggal ambil, dan status data. Daftar lengkapnya ada di halaman Tentang.
                </p>
              </div>
            </AccordionItem>
            <AccordionItem title="Apakah Telusurin produk BPS?">
              <div className="px-5 pb-5">
                <p className="text-sm text-ink-muted leading-relaxed">
                  Bukan. Telusurin independen dan tidak didukung BPS. Data dipakai sesuai ketentuan penggunaan BPS dengan mencantumkan sumbernya.
                </p>
              </div>
            </AccordionItem>
            <AccordionItem title="Apakah nilai lebih tinggi berarti layanan lebih baik?">
              <div className="px-5 pb-5">
                <p className="text-sm text-ink-muted leading-relaxed">
                  Belum tentu. Arah penilaian bergantung pada definisi indikator, dan perbedaan antardaerah bukan bukti keberhasilan atau kegagalan pemerintah daerah.
                </p>
              </div>
            </AccordionItem>
            <AccordionItem title="Mengapa ada data yang belum tersedia?">
              <div className="px-5 pb-5">
                <p className="text-sm text-ink-muted leading-relaxed">
                  Kami tidak mengisi atau memperkirakan angka yang tidak dipublikasikan sumber. Nilai kosong ditulis apa adanya dan tidak ikut dihitung.
                </p>
              </div>
            </AccordionItem>
            <AccordionItem title="Berapa daerah yang bisa dibandingkan, dan bisakah datanya diunduh?">
              <div className="px-5 pb-5">
                <p className="text-sm text-ink-muted leading-relaxed">
                  Sampai {MAX_SELECTED_REGIONS} daerah sekaligus. Data yang sedang tampil bisa diunduh sebagai CSV dari tabel di dashboard.
                </p>
              </div>
            </AccordionItem>
          </div>
        </div>
      </section>
    </main>
  );
}