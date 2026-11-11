import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { DataStatusBanner } from "@/components/layout/DataStatusBanner";
import { StatusBadge } from "@/components/layout/StatusBadge";
import {
  resolveDatasetDir,
  getMeta,
  getIndicators,
  getSources,
  getObservations,
} from "@/server/data/DataRepository";
import { availableYears } from "@/domain/calculations";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import type { DataStatus, Observation } from "@/domain/schemas";

const STATUS_LABELS: Record<string, string> = {
  resmi: "Resmi",
  belum_terverifikasi: "Belum terverifikasi",
  belum_diperiksa: "Belum diperiksa",
  contoh: "Contoh",
};

const FIELD_LABELS: Record<string, string> = {
  pendidikan: "Pendidikan",
  kesehatan: "Kesehatan",
  infrastruktur_dasar: "Infrastruktur dasar",
};

const SECTIONS = [
  { id: "tentang", no: "01", label: "Tentang" },
  { id: "data", no: "02", label: "Data" },
  { id: "cara-membaca", no: "03", label: "Cara membaca" },
  { id: "batasan", no: "04", label: "Batasan" },
] as const;

const CALCULATIONS = [
  {
    title: "Nilai kosong",
    text: "Disimpan sebagai belum tersedia. Tidak dilakukan interpolasi atau imputasi.",
  },
  {
    title: "Selisih",
    text: "Nilai akhir dikurangi nilai awal, atau nilai daerah dikurangi rata-rata. Untuk indikator persen, selisihnya dalam poin persentase.",
  },
  {
    title: "Rata-rata",
    text: "Rata-rata sederhana dari semua daerah yang bernilai pada tahun terpilih. Bukan angka resmi provinsi dan tidak dibobot jumlah penduduk.",
  },
  {
    title: "Peringkat",
    text: "Urutan kompetisi 1, 2, 2, 4. Nilai kosong tidak diberi peringkat.",
  },
] as const;

const INSIGHT_RULES = [
  {
    id: "I1",
    title: "Tertinggi dan terendah",
    text: "Minimal 3 daerah terpilih punya nilai pada tahun terpilih. Rumus: nilai tertinggi - nilai terendah.",
  },
  {
    id: "I2",
    title: "Perubahan",
    text: "Daerah terpilih punya nilai pada tahun tersedia pertama dan terakhir. Rumus: nilai terakhir - nilai pertama.",
  },
  {
    id: "I3",
    title: "Terhadap rata-rata",
    text: "Daerah terpilih punya nilai dan minimal 3 daerah di dataset punya nilai. Rumus: nilai daerah - rata-rata sederhana.",
  },
  {
    id: "I4",
    title: "Kelengkapan",
    text: "Ada daerah terpilih tanpa nilai pada tahun terpilih. Rumus: jumlah daerah tanpa nilai.",
  },
  {
    id: "I5",
    title: "Data belum cukup",
    text: "Syarat di atas tidak terpenuhi, maka kalimat insight menyebut alasannya.",
  },
] as const;

const GENERAL_LIMITATIONS = [
  "Nilai yang lebih tinggi tidak otomatis berarti layanan lebih baik atau lebih buruk.",
  "Penggunaan perbandingan ini bukan bukti keberhasilan atau kegagalan pemerintah daerah.",
  "Tidak dapat membuktikan hubungan sebab dan akibat dari angka ini.",
  "Kondisi di dalam satu daerah, misalnya antarkecamatan atau antarkelompok, tidak tampak.",
  "Tahun atau daerah tanpa nilai tidak dapat diperkirakan dari tahun atau daerah lain.",
  "Perbedaan definisi, metode survei, atau tahun acuan antarsumber dapat memengaruhi perbandingan.",
] as const;

export const metadata: Metadata = {
  title: "Tentang & Metodologi",
};

export default async function MetodologiPage() {
  const dir = resolveDatasetDir();
  const indicators = await getIndicators(dir);
  const observations: Observation[] = (
    await Promise.all(indicators.map((item) => getObservations(dir, item.code)))
  ).flat();

  const status: DataStatus = observations.some((o) => o.status === "contoh")
    ? "contoh"
    : observations.some((o) => o.status === "belum_terverifikasi")
      ? "belum_terverifikasi"
      : "resmi";

  return (
    <main className="flex-1 font-sans animate-fade-in">
      <DataStatusBanner status={status} />

      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-4 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Telusurin</p>
        <h1 className="mt-6 text-[clamp(2.75rem,9vw,8.5rem)] font-extrabold leading-[0.95] tracking-tight text-ink">
          Tentang
          <br />
          &amp; Metodologi
        </h1>
        <p className="mt-10 max-w-3xl text-xl leading-relaxed text-ink-muted sm:text-2xl">
          Dari mana angka berasal, bagaimana angka dihitung, dan seberapa jauh batasnya.
        </p>
        <nav aria-label="Isi halaman" className="mt-12 flex flex-wrap gap-3">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex h-11 items-center gap-3 rounded-full border border-rule px-5 text-sm font-semibold text-ink transition hover:bg-ink/5"
            >
              <span className="tabular-nums text-ink-muted">{section.no}</span>
              {section.label}
            </a>
          ))}
        </nav>
      </section>

      <Suspense fallback={<PageSkeleton />}>
        <MetodologiContent status={status} />
      </Suspense>
    </main>
  );
}

async function MetodologiContent({ status }: { status: DataStatus }) {
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
    indicators.map((item, index) => [item.code, availableYears(observationsByIndicator[index] ?? [])]),
  );

  return (
    <>
      <Part id="tentang" no="01" title="Tentang">
        <p className="max-w-6xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-6xl">
          Data layanan publik yang ingin dibandingkan seringkali hanya tersedia dalam dokumen PDF
          berat, tersebar di banyak halaman yang sulit diakses.
        </p>
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <p className="text-xl leading-relaxed text-ink sm:text-2xl">
            Telusurin tidak pernah menambah atau mengurangi angka. Nilai yang tidak tersedia dicatat
            sebagai belum tersedia, tanpa interpolasi atau penggantian.
          </p>
          <div className="rounded-2xl border border-rule bg-white p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink-muted">Independen</p>
            <p className="mt-4 text-xl leading-relaxed text-ink">
              Telusurin bukan produk BPS dan tidak didukung BPS.
            </p>
          </div>
        </div>
      </Part>

      <Part id="data" no="02" title="Data" tint>
        <h2 className="max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-7xl">
          Data yang dipakai
        </h2>

        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          <Stat label="Provinsi" value={meta.province?.name ?? "-"} />
          <Stat
            label="Rentang tahun"
            value={`${meta.years?.from ?? "-"} – ${meta.years?.to ?? "-"}`}
          />
          <Stat label="Jumlah indikator" value={String(indicators.length)} />
          <Stat
            label="Versi dataset"
            value={meta.version ?? "-"}
            note={meta.updatedAt ?? "-"}
          />
        </dl>

        <p className="mt-12 flex flex-wrap items-center gap-3 text-lg text-ink-muted">
          Cakupan geografis: kabupaten dan kota di {meta.province?.name ?? "-"}. Status dataset:
          <StatusBadge status={status} />
        </p>

        <SubHeading>Indikator</SubHeading>
        <ol>
          {indicators.map((item, index) => {
            const years = yearsByIndicator.get(item.code) ?? [];
            return (
              <li
                key={item.code}
                className="grid gap-4 border-b border-rule py-10 md:grid-cols-[6rem_1fr_14rem] md:gap-10"
              >
                <span className="text-4xl font-extrabold tabular-nums text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-2xl font-bold leading-snug text-ink sm:text-3xl">{item.name}</p>
                  <p className="mt-3 text-lg leading-relaxed text-ink-muted">{item.definition}</p>
                  <p className="mt-3 text-sm text-ink-muted">
                    {FIELD_LABELS[item.field] ?? item.field} &middot; {item.unit} &middot; {item.code}
                  </p>
                </div>
                <p className="text-lg font-semibold text-ink md:text-right">
                  {years.length > 0
                    ? `${years[0]} – ${years[years.length - 1]}`
                    : "Belum tersedia"}
                </p>
              </li>
            );
          })}
        </ol>

        <SubHeading>Sumber</SubHeading>
        <ul>
          {sources.map((item) => (
            <li key={item.id} className="border-b border-rule py-10">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold leading-snug text-ink underline decoration-rule decoration-2 underline-offset-4 hover:text-accent sm:text-2xl"
              >
                {item.name}
              </a>
              <p className="mt-3 text-base text-ink-muted">
                {item.publisher} &middot; Diakses {item.retrievedAt} &middot;{" "}
                {STATUS_LABELS[item.termsStatus] ?? item.termsStatus}
              </p>
              <p className="mt-3 max-w-4xl text-lg leading-relaxed text-ink-muted">{item.termsNote}</p>
            </li>
          ))}
        </ul>

        <SubHeading>Catatan perubahan</SubHeading>
        <ol>
          {meta.changelog.map((item) => (
            <li
              key={`${item.version}-${item.date}`}
              className="grid gap-2 border-b border-rule py-6 md:grid-cols-[8rem_10rem_1fr] md:gap-10"
            >
              <span className="font-mono text-lg font-bold text-ink">v{item.version}</span>
              <span className="text-lg text-ink-muted">{item.date}</span>
              <span className="text-lg text-ink">{item.change}</span>
            </li>
          ))}
        </ol>
      </Part>

      <Part id="cara-membaca" no="03" title="Cara membaca">
        <h2 className="max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-7xl">
          Cara membaca angka
        </h2>

        <SubHeading>Status data</SubHeading>
        <div className="grid gap-6 md:grid-cols-3">
          {(
            [
              {
                status: "resmi",
                text: "Sumber, definisi, periode, satuan, dan ketentuan pakai sudah diperiksa memenuhi kriteria integritas Telusurin.",
              },
              {
                status: "belum_terverifikasi",
                text: "Data berasal dari sumber otoritas namun masih dalam proses peninjauan lanjutan.",
              },
              {
                status: "contoh",
                text: "Data simulasi yang digunakan khusus untuk pengujian. Angka ini tidak mencerminkan kenyataan.",
              },
            ] as const
          ).map((item) => (
            <div key={item.status} className="rounded-2xl border border-rule bg-white p-8">
              <StatusBadge status={item.status} />
              <p className="mt-6 text-lg leading-relaxed text-ink">{item.text}</p>
            </div>
          ))}
        </div>

        <SubHeading>Perhitungan</SubHeading>
        <dl className="grid gap-x-16 gap-y-12 md:grid-cols-2">
          {CALCULATIONS.map((item) => (
            <div key={item.title}>
              <dt className="text-2xl font-bold text-ink sm:text-3xl">{item.title}</dt>
              <dd className="mt-3 text-lg leading-relaxed text-ink-muted">{item.text}</dd>
            </div>
          ))}
        </dl>

        <SubHeading>Ringkasan otomatis</SubHeading>
        <p className="mb-10 max-w-3xl text-xl leading-relaxed text-ink">
          Insight dibuat dari data berstatus resmi dengan aturan tetap, tanpa model bahasa.
        </p>
        <ol>
          {INSIGHT_RULES.map((rule) => (
            <li
              key={rule.id}
              className="grid gap-3 border-b border-rule py-8 md:grid-cols-[6rem_18rem_1fr] md:gap-10"
            >
              <span className="font-mono text-xl font-bold text-accent">{rule.id}</span>
              <p className="text-2xl font-bold text-ink">{rule.title}</p>
              <p className="text-lg leading-relaxed text-ink-muted">{rule.text}</p>
            </li>
          ))}
        </ol>
      </Part>

      <Part id="batasan" no="04" title="Batasan" tint>
        <h2 className="max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-7xl">
          Batas yang perlu diingat
        </h2>
        <ol className="mt-16">
          {[...meta.limitations, ...GENERAL_LIMITATIONS].map((item, index) => (
            <li
              key={item}
              className="grid gap-3 border-b border-rule py-8 md:grid-cols-[6rem_1fr] md:gap-10"
            >
              <span className="text-2xl font-extrabold tabular-nums text-ink-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="max-w-5xl text-xl leading-snug text-ink sm:text-2xl">{item}</p>
            </li>
          ))}
        </ol>
        <Link
          href="/dashboard"
          className="mt-16 inline-flex h-14 items-center justify-center rounded-xl bg-ink px-10 text-base font-bold text-white transition hover:opacity-90"
        >
          Buka dashboard
        </Link>
      </Part>
    </>
  );
}

function Part({
  id,
  no,
  title,
  tint = false,
  children,
}: {
  id: string;
  no: string;
  title: string;
  tint?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-4 border-t border-rule ${tint ? "bg-ink/[0.03]" : ""}`}>
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-8 lg:px-12 lg:py-32">
        <p className="mb-8 flex items-baseline gap-4 text-sm font-bold uppercase tracking-[0.2em] text-ink-muted">
          <span className="tabular-nums text-accent">{no}</span>
          <span>{title}</span>
        </p>
        {children}
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-8 mt-24 border-b border-rule pb-4 text-sm font-bold uppercase tracking-[0.2em] text-ink-muted">
      {children}
    </h3>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <dt className="text-sm font-bold uppercase tracking-[0.2em] text-ink-muted">{label}</dt>
      <dd className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {value}
      </dd>
      {note ? <p className="mt-2 text-base text-ink-muted">{note}</p> : null}
    </div>
  );
}