# Telusurin

Telusurin adalah platform web untuk membandingkan indikator layanan publik dasar antar kabupaten/kota di Jawa Timur. Setiap angka disertai satuan, periode, sumber, status data, dan batas interpretasinya, sehingga pengguna bisa menelusuri angka itu sampai ke tabel BPS asalnya.

Dikembangkan untuk WIA MIA 2026. Tema: *Designing Digital Futures: Powering Public Transparency*. Subtema: *Data-Driven Decision Support*.

> Telusurin bukan produk BPS dan tidak didukung BPS.

![Landing](docs/screenshots/landing.png)

![Dashboard](docs/screenshots/Dashboard.png)

![About](docs/screenshots/About.png)

## Fitur

- **Dashboard perbandingan.** Pilih indikator, tahun, dan 1 sampai 5 daerah. Bawaan: 3 daerah pertama menurut kode wilayah.
- **Grafik tren** per tahun (garis dengan pola dan penanda berbeda per daerah, tidak bergantung pada warna saja) dan **grafik perbandingan** batang pada tahun terpilih, lengkap dengan garis rata-rata semua daerah.
- **Tabel data** daerah terpilih x tahun tersedia, termasuk selisih terhadap rata-rata.
- **Insight otomatis berbasis aturan** (I1 sampai I5): tertinggi dan terendah, perubahan antar tahun, posisi terhadap rata-rata, dan kelengkapan data. Deterministik, tanpa model bahasa, hanya memproses data berstatus `resmi`, dan setiap insight menyertakan formula, makna, serta keterbatasannya.
- **Ekspor CSV** dari isi tabel (lihat [Format CSV](#format-csv)).
- **Status data** (`resmi`, `belum_terverifikasi`, `contoh`) tampil di banner, badge, dan tabel. Nilai yang tidak tersedia tidak diisi atau diperkirakan.
- **Halaman Metodologi**: sumber, cara hitung, cara membaca, dan batasan.
- **Tema gelap dan terang.**
- **Tautan yang bisa dibagikan.** Pilihan dashboard tersimpan di URL (`?i=<indikator>&y=<tahun>&r=<kode,kode,...>`). Parameter yang tidak valid diganti nilai bawaan disertai pemberitahuan.

## Data

Dataset resmi `telusurin-jatim-resmi` versi `1.0.0` (diperbarui 2026-11-09): **38 kabupaten/kota** Jawa Timur (29 kabupaten dan 9 kota), **532 observasi**, seluruhnya berstatus `resmi`.

| Kode indikator | Indikator | Satuan | Tahun |
| --- | --- | --- | --- |
| `pend_aps_16_18` | Angka partisipasi sekolah usia 16 sampai 18 tahun | persen | 2020 sampai 2024 |
| `pend_rls` | Rata-rata lama sekolah penduduk usia 25 tahun ke atas | tahun | 2020 sampai 2024 |
| `infra_air_layak` | Persentase rumah tangga dengan akses air minum layak | persen | 2020 sampai 2023 |

Semua sumber adalah tabel statistik BPS Provinsi Jawa Timur. Ketentuan penggunaan BPS sudah diperiksa (wajib atribusi, tidak boleh menyiratkan dukungan BPS). Rincian sumber ada di `src/data/dataset/sources.json` dan `docs/data-sources.md`.

**Belum masuk dataset:**

- Kesehatan (persalinan di fasilitas kesehatan): sumber berbentuk PDF agregat.
- Kondisi jalan: data tidak tersedia di sumber BPS.

Berkas mentah unduhan BPS disimpan di `data/raw/<source-id>/`, masing-masing dengan `SOURCE.md` yang mencatat tabel, URL, tanggal ambil, dan status ketentuan penggunaan. Hasil validasi dan pemeriksaan sampel ada di `docs/validation-report.md`.

> Repositori ini belum memiliki skrip impor otomatis dari `data/raw/` ke `src/data/dataset/`. Berkas JSON diperbarui secara manual dan dijaga oleh `npm run validate-data`.

## Teknologi

Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, Zod 4, Vitest, ESLint, dan Prettier. Data berupa berkas JSON statis yang divalidasi dengan Zod. Tidak ada database, API luar, atau login.

## Menjalankan proyek

Kebutuhan: Node.js dan npm.

```bash
git clone https://github.com/wiryaptr/telusurin.git
cd telusurin
npm install
npm run dev
```

Buka http://localhost:3000. Tanpa konfigurasi tambahan, aplikasi membaca dataset resmi di `src/data/dataset`.

### Build produksi

```bash
npm run build
npm run start
```

`npm run build` menjalankan `validate-data` lebih dulu, lalu `next build`. Build gagal bila dataset melanggar aturan integritas atau memuat status `contoh`.

### Dataset fixture (opsional)

Untuk pengembangan atau tes dengan data kecil yang terisolasi, arahkan aplikasi ke `tests/fixtures/dataset`:

```bash
# Bash
export TELUSURIN_DATASET=fixture
# PowerShell
$env:TELUSURIN_DATASET="fixture"
```

Untuk `npm run dev`, nilai ini juga bisa ditaruh di `.env.local` (salin dari `.env.example`, nilai bawaannya `resmi`). Perintah yang dijalankan lewat `tsx` (`validate-data`, `build`) tidak membaca `.env.local`, jadi variabelnya perlu di-set langsung di terminal. Mode fixture mengizinkan status `contoh` dan nilai kosong, yang ditolak pada build produksi.

## Script

| Script | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan |
| `npm run build` | Menjalankan `validate-data`, lalu `next build` |
| `npm run start` | Menyajikan hasil build |
| `npm run lint` | Memeriksa kode dengan ESLint |
| `npm run typecheck` | Memeriksa tipe TypeScript |
| `npm test` | Menjalankan tes unit dengan Vitest |
| `npm run validate-data` | Memvalidasi dataset terhadap skema dan aturan integritas |
| `npm run format` | Merapikan kode dengan Prettier |

**Catatan `typecheck`:** tipe global `LayoutProps` dihasilkan oleh Next.js. Pada checkout yang masih bersih, `npm run typecheck` gagal dengan `Cannot find name 'LayoutProps'` sampai tipe itu dibuat. Jalankan `npx next typegen` (atau `npm run dev` / `npm run build` sekali), lalu ulangi.

## Validasi data

`npm run validate-data` memeriksa, antara lain:

- skema Zod untuk meta, daerah, indikator, sumber, dan observasi;
- kunci unik `(regionCode, indicatorCode, year)` dan semua rujukan daerah, indikator, serta sumber;
- tahun berada dalam rentang `meta.years`, nilai tidak negatif, dan nilai kosong wajib punya alasan;
- observasi `resmi` hanya boleh merujuk sumber yang ketentuan penggunaannya sudah `diperiksa`;
- status `contoh` ditolak di luar mode fixture;
- `meta.version` dan `meta.updatedAt` sama dengan entri terakhir di changelog.

## Format CSV

Koma sebagai pemisah, UTF-8 dengan BOM, akhir baris CRLF, titik desimal. Excel berlokal Indonesia mungkin perlu **Data > Dari Teks/CSV** dengan pemisah koma. Isi mengikuti tabel di dashboard (daerah terpilih, semua tahun tersedia). Nilai kosong tetap kosong dengan alasan di kolom `keterangan_kosong`. Sel teks yang diawali `=`, `+`, `-`, atau `@` diberi awalan `'` untuk mencegah injeksi rumus.

Kolom: `kode_daerah`, `daerah`, `kode_indikator`, `indikator`, `satuan`, `tahun`, `nilai`, `keterangan_kosong`, `status`, `sumber`, `url_sumber`, `tanggal_ambil`, `versi_dataset`.

## Struktur proyek

```text
src/
  app/            Halaman: landing, /dashboard, /metodologi, error dan not-found
  components/     Komponen layout (header, footer, banner status) dan UI umum
  config/         Konfigurasi situs
  data/dataset/   Dataset resmi (meta, regions, indicators, sources, observations)
  domain/         Skema Zod, konstanta, perhitungan, dan aturan insight
  features/       Dashboard (filter, grafik, URL) dan daftar insight
  lib/            Format angka, status data, dan pembuat CSV
  server/data/    DataRepository: pembaca dan validator dataset
data/raw/         Unduhan mentah BPS beserta SOURCE.md per sumber
scripts/          validate-data.ts
tests/            Tes unit dan fixture dataset
docs/             Sumber data, catatan keputusan, laporan validasi, tangkapan layar
```

## Dokumen proyek

| Berkas | Isi |
| --- | --- |
| `prd.md` | Dokumen kebutuhan produk |
| `design.md` | Arah visual |
| `spec.md` | Spesifikasi teknis |
| `docs/data-sources.md` | Sumber data, gerbang indikator, dan kamus indikator |
| `docs/decisions/README.md` | Catatan keputusan tim |
| `docs/validation-report.md` | Laporan validasi data dan pemeriksaan sampel |

## Status dan yang belum dikerjakan

Sudah ada: landing page, dashboard, metodologi, insight, ekspor CSV, dataset resmi BPS Jawa Timur, serta validasi data otomatis dan tes unit.

Belum dilakukan atau belum terdokumentasi:

- Uji pengguna 3 sampai 5 orang (`docs/user-testing.md` belum ada).
- Pengukuran Lighthouse pada versi produksi dan deploy.
- Indikator kesehatan dan kondisi jalan (lihat bagian Data).
- Skrip impor dari `data/raw/` ke dataset JSON.
- Tes untuk komponen UI dan halaman.

## Atribusi sumber data

Data berasal dari tabel statistik BPS Provinsi Jawa Timur yang diakses pada 2026-11-09:

- Angka Partisipasi Sekolah (APS) Menurut Kabupaten/Kota dan Kelompok Umur
- Rata-Rata Lama Sekolah Penduduk Usia 25 Tahun ke Atas Menurut Kabupaten/Kota
- Persentase Rumah Tangga yang Memiliki Akses Terhadap Sumber Air Minum Layak Menurut Kabupaten/Kota di Provinsi Jawa Timur

Tautan dan kutipan lengkap ada di `src/data/dataset/sources.json`. Data dapat diubah atau ditarik BPS kapan saja. Nilai di Telusurin adalah salinan pada tanggal akses di atas.

## Pengembangan dengan AI

Proyek ini dikembangkan dengan bantuan alat bantu AI (opencode) untuk mempercepat penulisan kode, skema validasi, dan unit test. Seluruh perubahan ditinjau dan di-commit oleh anggota tim.

## Tim

| Nama | Peran |
| --- | --- |
| Arya Wirya Putra Jatmiko | [Menulis & Review Kode] |
| Mirza Fadhil Naufal | [Menulis & Mereview Kode] |
| Muhammad Afifudin Zain | [Menulis & Mereview Kode] |

## Lisensi

Lisensi kode: belum ditentukan. Data tetap tunduk pada ketentuan penggunaan sumber masing-masing.