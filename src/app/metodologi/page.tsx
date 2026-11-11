import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { DataStatusBanner } from "@/components/layout/DataStatusBanner";
import { StatusBadge } from "@/components/layout/StatusBadge";
import { resolveDatasetDir, getMeta, getIndicators, getSources, getObservations } from "@/server/data/DataRepository";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import type { Observation } from "@/domain/schemas";
import type { DataStatus } from "@/domain/schemas";

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

export const metadata: Metadata = {
  title: "Tentang dan metodologi",
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
    <main className="mx-auto w-full max-w-[1280px] flex-1 flex-col font-sans animate-fade-in">
      <DataStatusBanner status={status} />

      {/* Hero */}
      <section className="px-4 pt-16 pb-16 text-center animate-fade-in-up">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">Tentang dan metodologi</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted leading-relaxed">
            Satu halaman untuk menjelaskan siapa kami, dari mana angka itu berasal, bagaimana angka dihitung, dan seberapa jauh batasnya.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#tentang"
              className="inline-flex h-10 items-center rounded-xl border border-rule px-6 text-sm font-bold text-ink transition hover:bg-ink/5"
            >
              Tentang
            </a>
            <a
              href="#data"
              className="inline-flex h-10 items-center rounded-xl border border-rule px-6 text-sm font-bold text-ink transition hover:bg-ink/5"
            >
              Data
            </a>
            <a
              href="#cara-membaca"
              className="inline-flex h-10 items-center rounded-xl border border-rule px-6 text-sm font-bold text-ink transition hover:bg-ink/5"
            >
              Cara membaca
            </a>
            <a
              href="#batasan"
              className="inline-flex h-10 items-center rounded-xl border border-rule px-6 text-sm font-bold text-ink transition hover:bg-ink/5"
            >
              Batasan
            </a>
          </div>
        </div>
      </section>

      <div className="px-4 pb-24 sm:px-6">
        <Suspense fallback={<PageSkeleton />}>
          <MetodologiContent status={status} />
        </Suspense>
      </div>
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

  return (
    <>
      <Part id="tentang" title="Tentang">
        <p className="text-xl text-ink leading-relaxed">
          Data layanan publik yang ingin dibandingkan seringkali hanya tersedia dalam dokumen PDF berat, tersebar di banyak halaman yang sulit diakses.
        </p>
        <p className="text-ink-muted leading-relaxed">
          Telusurin tidak pernah menambah atau mengurangi angka. Nilai yang tidak tersedia dicatat sebagai belum tersedia, tanpa interpolasi atau penggantian.
        </p>
        <div className="bg-ink/[0.03] p-8 rounded-2xl border border-rule">
          <p className="text-sm text-ink-muted leading-relaxed">Independen. Telusurin bukan produk BPS dan tidak didukung BPS.</p>
        </div>
      </Part>

      <Part id="data" title="Data yang dipakai">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">Provinsi</p>
            <p className="mt-2 text-lg font-bold text-ink">{meta.province?.name ?? "-"}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">Rentang tahun</p>
            <p className="mt-2 text-lg font-bold text-ink">
              {meta.years?.from ?? "-"} - {meta.years?.to ?? "-"}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">Jumlah indikator</p>
            <p className="mt-2 text-lg font-bold text-ink">{indicators.length}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">Versi dan tanggal pembaruan</p>
            <p className="mt-2 text-lg font-bold text-ink">{meta.version ?? "-"}</p>
            <p className="mt-1 text-xs text-ink-muted">{meta.updatedAt ?? "-"}</p>
          </div>
        </div>

        <p className="text-sm text-ink-muted">
          Cakupan geografis: Kabupaten dan kota di {meta.province?.name ?? "-"}. Status dataset:{" "}
          <StatusBadge status={status} />
        </p>

        <h3 className="text-xs font-bold uppercase tracking-widest text-ink-muted">Indikator</h3>
        <ul className="divide-y divide-rule">
          {indicators.map((item) => (
            <li key={item.code}>
              <p className="font-bold text-ink">{item.name}</p>
              <p className="mt-1 text-xs text-ink-muted">
                {FIELD_LABELS[item.field] ?? item.field} &middot; {item.unit} &middot; {item.code}
              </p>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{item.definition}</p>
            </li>
          ))}
        </ul>

        <h3 className="text-xs font-bold uppercase tracking-widest text-ink-muted">Sumber</h3>
        <ul className="divide-y divide-rule">
          {sources.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-ink underline decoration-dotted underline-offset-2 hover:text-accent"
              >
                {item.name}
              </a>
              <p className="mt-1 text-xs text-ink-muted">
                {item.publisher} &middot; {item.retrievedAt} &middot; {STATUS_LABELS[item.termsStatus] ?? item.termsStatus}
              </p>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{item.termsNote}</p>
            </li>
          ))}
        </ul>

        <h3 className="text-xs font-bold uppercase tracking-widest text-ink-muted">Catatan perubahan</h3>
        <ol className="space-y-3">
          {meta.changelog.map((item) => (
            <li key={`${item.version}-${item.date}`} className="flex gap-4">
              <span className="font-mono font-bold shrink-0">v{item.version}</span>
              <span className="text-ink-muted shrink-0">{item.date}</span>
              <span className="text-ink">{item.change}</span>
            </li>
          ))}
        </ol>
      </Part>

      <Part id="cara-membaca" title="Cara membaca angka">
        <h3 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-6">Status data</h3>
        <ul className="divide-y divide-rule">
          <li>
            <p className="font-bold text-ink">Resmi</p>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">
              Sumber, definisi, periode, satuan, dan ketentuan pakai sudah diperiksa memenuhi kriteria integritas Telusurin.
            </p>
          </li>
          <li>
            <p className="font-bold text-ink">Belum terverifikasi</p>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">
              Data berasal dari sumber otoritas namun masih dalam proses peninjauan lanjutan.
            </p>
          </li>
          <li>
            <p className="font-bold text-ink">Contoh</p>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">
              Data simulasi yang digunakan khusus untuk pengujian. Angka ini tidak mencerminkan kenyataan.
            </p>
          </li>
        </ul>

        <h3 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-6">Perhitungan</h3>
        <ul className="divide-y divide-rule">
          <li>
            <p className="font-bold text-ink">Nilai kosong</p>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">Disimpan sebagai belum tersedia. Tidak dilakukan interpolasi atau imputasi.</p>
          </li>
          <li>
            <p className="font-bold text-ink">Selisih</p>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">
              Nilai akhir dikurangi nilai awal, atau nilai daerah dikurangi rata-rata. Untuk indikator persen, selisihnya dalam poin persentase.
            </p>
          </li>
          <li>
            <p className="font-bold text-ink">Rata-rata</p>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">
              Rata-rata sederhana dari semua daerah yang bernilai pada tahun terpilih. Bukan angka resmi provinsi dan tidak dibobot jumlah penduduk.
            </p>
          </li>
          <li>
            <p className="font-bold text-ink">Peringkat</p>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">Urutan kompetisi 1, 2, 2, 4. Nilai kosong tidak diberi peringkat.</p>
          </li>
        </ul>

        <h3 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-6">Ringkasan otomatis</h3>
        <p className="text-sm text-ink-muted">
          Insight dibuat dari data berstatus resmi dengan aturan tetap, tanpa model bahasa.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-ink leading-relaxed">
          <li>
            <span className="font-bold text-ink">Tertinggi dan terendah:</span> minimal 3 daerah terpilih punya nilai pada tahun terpilih. Rumus: nilai tertinggi - nilai terendah.
          </li>
          <li>
            <span className="font-bold text-ink">Perubahan:</span> daerah terpilih punya nilai pada tahun tersedia pertama dan terakhir. Rumus: nilai terakhir - nilai pertama.
          </li>
          <li>
            <span className="font-bold text-ink">Terhadap rata-rata:</span> daerah terpilih punya nilai dan minimal 3 daerah di dataset punya nilai. Rumus: nilai daerah - rata-rata sederhana.
          </li>
          <li>
            <span className="font-bold text-ink">Kelengkapan:</span> ada daerah terpilih tanpa nilai pada tahun terpilih. Rumus: jumlah daerah tanpa nilai.
          </li>
          <li>
            <span className="font-bold text-ink">Data belum cukup:</span> syarat di atas tidak terpenuhi, maka kalimat insight menyebut alasannya.
          </li>
        </ul>
      </Part>

      <Part id="batasan" title="Batasan">
        <ul className="list-disc pl-5 space-y-2 text-sm text-ink leading-relaxed max-w-3xl">
          {meta.limitations.map((item) => (
            <li key={item}>{item}</li>
          ))}
          <li>Nilai yang lebih tinggi tidak otomatis berarti layanan lebih baik atau lebih buruk.</li>
          <li>Penggunaan perbandingan ini bukan bukti keberhasilan atau kegagalan pemerintah daerah.</li>
          <li>Tidak dapat membuktikan hubungan sebab dan akibat dari angka ini.</li>
          <li>Kondisi di dalam satu daerah, misalnya antarkecamatan atau antarkelompok, tidak tampak.</li>
          <li>Tahun atau daerah tanpa nilai tidak dapat diperkirakan dari tahun atau daerah lain.</li>
          <li>Perbedaan definisi, metode survei, atau tahun acuan antarsumber dapat memengaruhi perbandingan.</li>
        </ul>
        <Link
          href="/dashboard"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-ink px-8 text-sm font-bold text-white transition hover:opacity-90"
        >
          Buka dashboard
        </Link>
      </Part>
    </>
  );
}

interface PartProps {
  id: string;
  title: string;
  children: ReactNode;
}

function Part({ id, title, children }: PartProps) {
  return (
    <section id={id} className="scroll-mt-8 py-16 md:grid md:grid-cols-[220px_1fr] md:gap-12">
      <h2 className="text-2xl font-bold tracking-tight text-ink md:col-start-1">{title}</h2>
      <div className="min-w-0 space-y-8 md:col-start-2">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6">{children}</div>
      </div>
    </section>
  );
}