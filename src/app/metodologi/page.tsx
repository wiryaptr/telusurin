import { DataStatusBanner } from "@/components/layout/DataStatusBanner";
import { StatusBadge } from "@/components/layout/StatusBadge";
import { Suspense } from "react";
import { resolveDatasetDir, getMeta, getIndicators, getSources, getObservations } from "@/server/data/DataRepository";
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

      {/* Hero Header */}
      <section className="px-4 py-24 sm:px-6 border-b border-rule text-center">
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

async function MetodologiContent({ status }: { status: DataStatus }) {
  const dir = resolveDatasetDir();
  const [meta, indicators, sources] = await Promise.all([
    getMeta(dir),
    getIndicators(dir),
    getSources(dir),
  ]);

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-ink-muted">Status dataset:</span>
        <StatusBadge status={status} />
      </div>

      {/* 1. Tujuan dan Cakupan */}
      <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-ink mb-6 pb-4 border-b border-rule">Tujuan dan cakupan</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-base text-ink mb-4 leading-relaxed">
              Telusurin membantu masyarakat memahami dan membandingkan indikator layanan publik dasar antardaerah menggunakan data yang dapat ditelusuri. Setiap informasi numerik dilengkapi satuan, periode, sumber, status data, dan batasan interpretasi.
            </p>
          </div>
          <div>
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
                <dt className="text-ink-muted">Cakupan geografis</dt>
                <dd className="font-semibold text-ink">Kabupaten dan kota di {meta.province?.name ?? "-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Pembaruan data</dt>
                <dd className="font-semibold text-ink">{meta.updatedAt}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Versi dataset</dt>
                <dd className="font-semibold text-ink">{meta.version}</dd>
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
      <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-ink mb-6 pb-4 border-b border-rule">Indikator yang digunakan</h2>
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
      <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-ink mb-6 pb-4 border-b border-rule">Sumber data</h2>
        <div className="overflow-hidden rounded-xl border border-rule">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink/[0.03] text-ink-muted uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-6">Tabel atau publikasi</th>
                  <th className="py-3 px-6">Penerbit</th>
                  <th className="py-3 px-6">URL</th>
                  <th className="py-3 px-6">Diambil</th>
                  <th className="py-3 px-6">Status ketentuan</th>
                  <th className="py-3 px-6">Ketentuan dan atribusi</th>
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
                    <td className="py-4 px-6 text-ink leading-relaxed max-w-sm">{item.termsNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="grid gap-12 md:grid-cols-2">
        {/* 4. Status Data */}
        <section>
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
        <section>
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
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink-muted mb-3">Selisih</h3>
              <p className="text-sm text-ink leading-relaxed">
                Selisih adalah nilai akhir dikurangi nilai awal, atau nilai daerah dikurangi rata-rata. Untuk indikator persen, selisih dinyatakan dalam poin persentase, bukan persen relatif. Dua nilai yang sama pada presisi tampilan dianggap tidak berubah.
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

      {/* 6. Insight */}
      <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-ink mb-6 pb-4 border-b border-rule">Aturan pembentukan insight</h2>
        <p className="text-sm text-ink leading-relaxed mb-6 max-w-3xl">
          Insight dibuat dengan aturan tetap, tanpa model bahasa, dan hanya dari data berstatus resmi. Setiap kalimat menyebut cakupannya dan punya tautan &ldquo;Lihat dasar hitung&rdquo; berisi nilai dasar, rumus, arti hasil, keterbatasan, dan sumber.
        </p>
        <div className="overflow-x-auto rounded-xl border border-rule">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink/[0.03] text-ink-muted uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-6">Aturan</th>
                <th className="py-3 px-6">Syarat</th>
                <th className="py-3 px-6">Rumus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              <tr><td className="py-4 px-6 font-bold text-ink">Tertinggi dan terendah</td><td className="py-4 px-6 text-ink">Minimal 3 daerah terpilih punya nilai pada tahun terpilih</td><td className="py-4 px-6 font-mono text-ink">nilai tertinggi - nilai terendah</td></tr>
              <tr><td className="py-4 px-6 font-bold text-ink">Perubahan</td><td className="py-4 px-6 text-ink">Daerah terpilih punya nilai pada tahun tersedia pertama dan terakhir</td><td className="py-4 px-6 font-mono text-ink">nilai_B - nilai_A</td></tr>
              <tr><td className="py-4 px-6 font-bold text-ink">Terhadap rata-rata</td><td className="py-4 px-6 text-ink">Daerah punya nilai dan minimal 3 daerah di dataset punya nilai pada tahun itu</td><td className="py-4 px-6 font-mono text-ink">nilai daerah - rata-rata sederhana</td></tr>
              <tr><td className="py-4 px-6 font-bold text-ink">Kelengkapan</td><td className="py-4 px-6 text-ink">Ada daerah terpilih tanpa nilai pada tahun terpilih</td><td className="py-4 px-6 font-mono text-ink">jumlah daerah tanpa nilai</td></tr>
              <tr><td className="py-4 px-6 font-bold text-ink">Data belum cukup</td><td className="py-4 px-6 text-ink">Syarat di atas tidak terpenuhi; kalimat menyebut alasannya</td><td className="py-4 px-6 font-mono text-ink">-</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Keterbatasan */}
      <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-ink mb-6 pb-4 border-b border-rule">Keterbatasan perbandingan</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-ink leading-relaxed max-w-3xl">
          {meta.limitations.map((item) => (<li key={item}>{item}</li>))}
          <li>Rata-rata sederhana tidak dibobot jumlah penduduk dan bukan angka resmi provinsi.</li>
          <li>Perbedaan definisi, metode survei, atau tahun acuan antarsumber dapat memengaruhi perbandingan.</li>
        </ul>
        <h3 className="text-sm font-bold uppercase tracking-wider text-ink-muted mt-8 mb-3">Yang tidak bisa disimpulkan dari data ini</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-ink leading-relaxed max-w-3xl">
          <li>Nilai yang lebih tinggi tidak otomatis berarti layanan lebih baik atau lebih buruk.</li>
          <li>Perbedaan antardaerah bukan bukti keberhasilan atau kegagalan pemerintah daerah.</li>
          <li>Hubungan sebab dan akibat tidak dapat dibuktikan dari angka ini.</li>
          <li>Kondisi di dalam satu daerah, misalnya antarkecamatan atau antarkelompok, tidak tampak.</li>
          <li>Tahun atau daerah tanpa nilai tidak dapat diperkirakan dari tahun atau daerah lain.</li>
          <li>Telusurin bukan produk BPS dan tidak didukung BPS.</li>
        </ul>
      </section>

      {/* 8. Changelog */}
      <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-ink mb-6 pb-4 border-b border-rule">Catatan perubahan dataset</h2>
        <ol className="space-y-3 text-sm text-ink">
          {meta.changelog.map((item) => (
            <li key={`${item.version}-${item.date}`} className="flex gap-4">
              <span className="font-mono font-bold shrink-0">v{item.version}</span>
              <span className="text-ink-muted shrink-0">{item.date}</span>
              <span>{item.change}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 9. Tentang Telusurin */}
      <section className="bg-white border border-rule shadow-sm rounded-2xl p-8 md:p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-ink mb-6 pb-4 border-b border-rule">Tentang Telusurin</h2>
        <div className="max-w-3xl">
          <p className="text-xl text-ink-muted leading-relaxed">
            Telusurin lahir dari kebutuhan akan transparansi data publik yang mudah diakses, dimengerti, dan diverifikasi oleh siapa saja.
          </p>
          <div className="mt-8 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-ink mb-4">Visi &amp; Misi</h3>
              <p className="text-ink-muted leading-relaxed">
                Visi kami adalah menjadi jembatan antara data publik yang kompleks dengan pemahaman masyarakat. Misi kami adalah menyediakan platform pembanding data yang jujur, tanpa manipulasi, dan sepenuhnya dapat ditelusuri ke sumber aslinya.
              </p>
            </section>
            <section>
              <h3 className="text-xl font-bold text-ink mb-4">Mengapa Telusurin?</h3>
              <p className="text-ink-muted leading-relaxed">
                Seringkali, membandingkan performa layanan publik antar daerah menjadi tantangan karena data tersebar di berbagai dokumen PDF yang sulit diolah. Telusurin hadir untuk mengumpulkan data tersebut ke dalam satu dashboard terpadu, menjadikannya alat bantu pengambilan keputusan berbasis fakta untuk setiap warga.
              </p>
            </section>
            <section>
              <h3 className="text-xl font-bold text-ink mb-4">Penafian &amp; Independensi</h3>
              <div className="bg-ink/[0.03] p-8 rounded-2xl border border-rule">
                <p className="text-sm text-ink-muted leading-relaxed">
                  Telusurin adalah inisiatif independen yang dikembangkan untuk kompetisi WIA MIA 2026. Kami menggunakan data statistik resmi (seperti BPS) sebagai sumber utama, namun <strong>Telusurin tidak memiliki hubungan struktural, afiliasi, maupun dukungan resmi dari badan terkait.</strong>
                </p>
              </div>
            </section>
            <section>
              <h3 className="text-xl font-bold text-ink mb-4">Prinsip Data Kami</h3>
              <ul className="space-y-4">
                <li><strong className="text-ink">Bebas Asumsi:</strong> Kami tidak menambah atau mengurangi angka. Jika data tidak tersedia, kami tampilkan apa adanya.</li>
                <li><strong className="text-ink">Audit-Ready:</strong> Setiap angka dilengkapi ID sumber agar Anda dapat melakukan audit silang secara mandiri.</li>
                <li><strong className="text-ink">Netral:</strong> Platform ini tidak memberikan opini daerah mana yang &ldquo;terbaik&rdquo;, melainkan menyajikan fakta numerik untuk interpretasi Anda.</li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
