# Catatan keputusan

Satu baris per keputusan yang punya lebih dari satu alternatif. Status **Diputuskan** berarti tim sudah menetapkan; **Diusulkan** berarti ditulis di dokumen tetapi belum disetujui tim. Ubah status dan tanggal saat tim menyetujui atau mengganti keputusan; jangan menghapus baris lama, tandai **Diganti** dan rujuk ID barunya.

| ID | Tanggal | Keputusan | Alasan | Alternatif | Status |
| --- | --- | --- | --- | --- | --- |
| D-001 | 2026-10-25 | Nama produk Telusurin | Diganti oleh D-017 | Veridara (nama kerja awal) | Diganti oleh D-017 |
| D-002 | 2026-10-25 | Memakai daerah nyata dan hanya sumber resmi; tidak ada data sintetis di dataset produksi | Dipilih tim; selaras dengan PRD 7 | Data contoh untuk daerah fiktif | Diputuskan |
| D-003 | 2026-10-25 | Subtema Data-Driven Decision Support | Produk membantu pengguna membandingkan kondisi dan menyusun pertanyaan dari data | Subtema lain | Diputuskan |
| D-004 | 2026-10-25 | Data berupa JSON statis yang divalidasi Zod; tanpa database, API, ETL, atau login | PRD 15.1; volume kecil, tidak ada penulisan oleh pengguna | PostgreSQL dan ETL (rencana lama) | Diputuskan |
| D-005 | 2026-10-25 | Filter daerah **menyaring**: grafik, tabel, insight, dan CSV hanya memuat daerah terpilih | Dipilih tim; sesuai PRD F3 dan 16.2 | Daerah terpilih hanya disorot, semua daerah tetap tampil | Diputuskan |
| D-006 | 2026-10-25 | Maksimal 5 daerah terpilih; bawaan 3 daerah pertama menurut kode wilayah; minimal 1 | Lima garis masih terbaca dengan pola dan penanda berbeda; urutan kode netral dan dapat diulang | Tanpa batas; bawaan kosong; mode "semua daerah" khusus grafik batang (Could) | Diusulkan |
| D-007 | 2026-10-25 | Rata-rata sederhana acuan dihitung dari semua daerah di dataset yang bernilai pada tahun itu, bukan dari daerah terpilih | Acuan tidak berubah saat filter berubah; rata-rata dari tiga daerah terpilih kurang bermakna | Rata-rata daerah terpilih | Diusulkan |
| D-008 | 2026-10-25 | Insight I1, I2, I4 bekerja pada daerah terpilih; I3 membandingkan satu daerah terpilih dengan rata-rata dataset; setiap kalimat menyebut cakupannya | Insight mengikuti apa yang sedang dibandingkan pengguna tanpa menyiratkan peringkat seluruh provinsi | Semua insight pada seluruh dataset | Diusulkan |
| D-009 | 2026-10-25 | Tabel berbentuk matriks daerah terpilih x tahun tersedia; CSV memuat isi tabel itu. Tahun terpilih hanya mengatur grafik perbandingan dan insight | Satu tabel melayani tren, pemeriksaan nilai, dan ekspor. Ini menafsirkan "periode yang dipilih" di PRD 13 sebagai seluruh periode indikator, jadi perlu persetujuan | CSV hanya untuk tahun terpilih | Diusulkan |
| D-010 | 2026-10-25 | Tahun tersedia suatu indikator adalah tahun dengan sekurang-kurangnya 3 daerah bernilai (`MIN_REGIONS`) | Rata-rata, tertinggi, dan terendah tidak bermakna di bawah 3 daerah; satu konstanta untuk kode, teks, dan UI (PRD 10.2) | Ambang lain; semua tahun ditampilkan | Diusulkan |
| D-011 | 2026-10-25 | Menggabungkan `data-dictionary.md` ke `data-sources.md`; tidak membuat `docs/methodology.md` karena halaman `/metodologi` menjadi satu-satunya sumber; `user-testing.md`, `references.md`, `clarifications/` dibuat saat ada isinya | PRD 21 membolehkan penggabungan dan melarang dokumen tanpa fungsi atau duplikasi | Mengikuti daftar PRD 21 penuh sejak awal | Diusulkan |
| D-012 | 2026-10-25 | Halaman metodologi versi minimal sudah ada di First Draft; versi lengkap di Final | Tautan Metodologi ada di header dan landing; PRD 16.3 melarang elemen utama yang mati | Menyembunyikan tautan sampai Final | Diusulkan |
| D-013 | 2026-10-25 | Semua commit dibuat oleh anggota tim; repository tidak dihubungkan ke alat AI | Pernyataan tim; karya harus orisinal dan dapat dijelaskan anggota (PRD 20) | | Diputuskan |
| D-014 | 2026-10-27 | `cacheComponents` aktif di next.config.ts; `export const dynamic = "force-dynamic"` tidak kompatibel → pakai `<Suspense fallback>` di page yang mengakses data | Next.js 16.4.3 dengan cache components; `dynamic = "force-dynamic"` ditolak build | `dynamic = "force-dynamic"` | Diganti |
| D-015 | 2026-10-27 | `resolveDatasetDir` menerima `Record<string, string | undefined>` agar typecheck lolos dengan partial env di test | `NodeJS.ProcessEnv` memerlukan `NODE_ENV` yang tidak tersedia di panggilan test | `NodeJS.ProcessEnv` | Diputuskan |
| D-016 | 2026-10-27 | `status contoh` diblokir validate-data hanya ketika bukan fixture (env `TELUSURIN_DATASET` !== "fixture") | Dataset fixture untuk pengembangan boleh berstatus contoh; build produksi harus menolaknya | Blokir contoh selalu | Diputuskan |
| D-017 | 2026-10-30 | Nama produk Telusurin | Lebih mudah diingat dan menyiratkan ketertelusuran sumber, keunggulan utama produk | TransINDA | Diputuskan |
| D-017 | 2026-10-27 | `FilterPanel` mengelola URL sendiri via `router.replace`; tidak menerima event handler `onChange` dari Server Component | Next.js 16 larang melewatkan event handler ke Client Component props | Server Component mengubah URL | Diputuskan |
| D-018 | 2026-10-28 | `cacheComponents` dan `partialPrefetching` dihapus dari next.config.ts setelah error "uncached data during prerendering" pada `/metodologi` | Fitur tersebut tidak diperlukan spec; dataset JSON statis, error terjadi karena cache aktif saat membaca file di page statik | Cache components + Suspense | Diputuskan |

| D-019 | 2026-10-28 | Modernisasi visual "Modern Editorial" terinspirasi pola ketuk.app | Meningkatkan keterbacaan dan kesan profesional sesuai arahan tim | Desain v0.3 (Gading/Serif) | Diputuskan |

## Templat entri baru

| ID | Tanggal | Keputusan | Alasan | Alternatif | Status |
| --- | --- | --- | --- | --- | --- |
| D-0xx | YYYY-MM-DD | | | | Diusulkan |
