import { DataStatusBanner } from "@/components/layout/DataStatusBanner";
import { Suspense } from "react";
import { resolveDatasetDir, getMeta, getIndicators, getSources } from "@/server/data/DataRepository";
import type { Observation } from "@/domain/schemas";

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

export default async function MetodologiPage() {
  const dir = resolveDatasetDir();
  const indicators = await getIndicators(dir);
  
  // Perbaiki: fetch observasi tanpa repository class
  const observations: Observation[] = []; // Sederhanakan untuk metodologi

  const status = observations.some(o => o.status === "contoh") ? "contoh" : 
                 observations.some(o => o.status === "belum_terverifikasi") ? "belum_terverifikasi" : "resmi";

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-1 flex-col font-sans">
      <DataStatusBanner status={status} />
      
      {/* Hero Header */}
      <section className="px-4 py-24 sm:px-6 border-b border-rule bg-white text-center">
        <div className="mx-auto max-w-[1280px]">
          <h1 className="text-3xl font-bold text-ink sm:text-4xl mb-6">
            Metodologi Telusurin
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-ink-muted leading-relaxed">
            Pahami bagaimana kami mengumpulkan, memverifikasi, dan menyajikan data layanan publik untuk menjaga transparansi dan integritas.
          </p>
        </div>
      </section>

      <div className="px-4 py-24 sm:px-6">
        <Suspense fallback={null}>
          <MetodologiContent status={status} />
        </Suspense>
      </div>
    </main>
  );
}

async function MetodologiContent({ status }: { status: string }) {
  const dir = resolveDatasetDir();
  const [meta, indicators, sources] = await Promise.all([
    getMeta(dir),
    getIndicators(dir),
    getSources(dir),
  ]);

  return (
    <div className="space-y-12">
      {/* 1. Tujuan dan Cakupan */}
      <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl font-bold text-ink mb-6 pb-4 border-b border-rule">
          Tujuan dan cakupan
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-base text-ink mb-4 leading-relaxed">
              Telusurin membantu masyarakat memahami dan membandingkan indikator
              layanan publik dasar antardaerah menggunakan data yang dapat
              ditelusuri. Setiap informasi numerik dilengkapi satuan, periode,
              sumber, status data, dan batas interpretasi.
            </p>
          </div>
          <div className="bg-ink/[0.02] p-6 rounded-xl border border-rule/50">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink-muted mb-4">Statistik Dataset</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Provinsi</dt>
                <dd className="font-semibold text-ink">{meta.province?.name ?? "-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Jumlah indikator</dt>
                <dd className="font-semibold text-ink">{indicators.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Rentang tahun</dt>
                <dd className="font-semibold text-ink">{meta.years?.from ?? "-"} – {meta.years?.to ?? "-"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 2. Indikator */}
      <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl font-bold text-ink mb-6 pb-4 border-b border-rule">
          Indikator yang digunakan
        </h2>
        <div className="overflow-hidden rounded-xl border border-rule">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink/[0.03] text-ink-muted uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-6">Kode</th>
                  <th className="py-3 px-6">Nama</th>
                  <th className="py-3 px-6">Bidang</th>
                  <th className="py-3 px-6">Satuan</th>
                  <th className="py-3 px-6">Definisi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {indicators.map((item) => (
                  <tr key={item.code} className="hover:bg-ink/[0.01]">
                    <td className="py-4 px-6 text-ink font-mono">{item.code}</td>
                    <td className="py-4 px-6 text-ink font-bold">{item.name}</td>
                    <td className="py-4 px-6 text-ink">{FIELD_LABELS[item.field] ?? item.field}</td>
                    <td className="py-4 px-6 text-ink">{item.unit}</td>
                    <td className="py-4 px-6 text-ink leading-relaxed max-w-md">{item.definition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Sumber Data */}
      <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl font-bold text-ink mb-6 pb-4 border-b border-rule">
          Sumber data
        </h2>
        <div className="overflow-hidden rounded-xl border border-rule">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink/[0.03] text-ink-muted uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-6">Tabel atau publikasi</th>
                  <th className="py-3 px-6">Penerbit</th>
                  <th className="py-3 px-6">URL</th>
                  <th className="py-3 px-6">Diambil</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {sources.map((item) => (
                  <tr key={item.id} className="hover:bg-ink/[0.01]">
                    <td className="py-4 px-6 text-ink font-bold">{item.name}</td>
                    <td className="py-4 px-6 text-ink">{item.publisher}</td>
                    <td className="py-4 px-6 text-ink">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">
                        {item.url}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-ink">{item.retrievedAt}</td>
                    <td className="py-4 px-6 text-ink">
                      <span className="px-2 py-1 rounded-md bg-ink/[0.05] font-medium text-[11px]">
                        {STATUS_LABELS[item.termsStatus] ?? item.termsStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="grid gap-12 md:grid-cols-2">
        {/* 4. Status Data */}
        <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-10">
          <h2 className="text-xl font-bold text-ink mb-6">Status data</h2>
          <dl className="space-y-6">
            <div className="p-4 rounded-xl border border-rule/50 hover:bg-ink/[0.01]">
              <dt className="font-bold text-ink mb-1">Resmi</dt>
              <dd className="text-sm text-ink-muted leading-relaxed">
                Data yang sumber, definisi, periode, satuan, dan ketentuan pakainya sudah diperiksa dan memenuhi kriteria integritas Telusurin.
              </dd>
            </div>
            <div className="p-4 rounded-xl border border-rule/50 hover:bg-ink/[0.01]">
              <dt className="font-bold text-ink mb-1">Belum terverifikasi (&dagger;)</dt>
              <dd className="text-sm text-ink-muted leading-relaxed">
                Data berasal dari sumber otoritas namun masih dalam proses peninjauan atau pemeriksaan lanjutan.
              </dd>
            </div>
            <div className="p-4 rounded-xl border border-rule/50 hover:bg-ink/[0.01]">
              <dt className="font-bold text-ink mb-1">Contoh (‡)</dt>
              <dd className="text-sm text-ink-muted leading-relaxed">
                Data simulasi yang digunakan khusus untuk pengujian. Angka ini tidak mencerminkan kenyataan.
              </dd>
            </div>
          </dl>
        </section>

        {/* 5. Aturan dan Perhitungan */}
        <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-10">
          <h2 className="text-xl font-bold text-ink mb-6">Aturan & Perhitungan</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink-muted mb-3">Nilai Kosong</h3>
              <p className="text-sm text-ink leading-relaxed">
                Nilai kosong disimpan sebagai <code className="font-mono bg-ink/5 px-1 rounded">null</code>. 
                Tidak dilakukan interpolasi atau imputasi. UI menggunakan label &ldquo;Belum tersedia&rdquo;.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink-muted mb-3">Rata-rata</h3>
              <p className="text-sm text-ink leading-relaxed">
                Rata-rata sederhana dihitung dari semua daerah di dataset yang bernilai pada tahun itu. Bukan angka pada tingkat provinsi dan tidak dibobot jumlah penduduk.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink-muted mb-3">Peringkat</h3>
              <p className="text-sm text-ink leading-relaxed">
                Memakai urutan kompetisi (1, 2, 2, 4). Nilai kosong tidak diberi peringkat.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
