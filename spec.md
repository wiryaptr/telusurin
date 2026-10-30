# SPEC Telusurin

| | |
| --- | --- |
| Versi | 0.3 (draf untuk disetujui tim) |
| Tanggal | 25 Oktober 2026 |
| Dokumen pasangan | `prd.md` v0.3 (apa dan mengapa), `design.md` v0.3 (tampilan) |

Dokumen ini menjelaskan **bagaimana** Telusurin dibangun. Jika ada konflik, `prd.md` menentukan apa yang dibangun dan dokumen ini menentukan caranya. Nomor bagian PRD yang dirujuk di sini mengikuti `prd.md` v0.3. Hal yang belum diputuskan ditandai **[TERBUKA]** dan terdaftar di bagian 17. Keputusan yang sudah diambil ada di `docs/decisions/README.md`.

---

## 1. Aturan kerja

1. Bangun menurut prioritas PRD 8 dan aturan terlambat PRD 18.1. Jangan mengerjakan fitur Could sebelum semua fitur Must stabil.
2. Satu bahasa di seluruh repository: TypeScript (aplikasi, skrip impor, test).
3. **Tidak ada angka yang dikarang** (PRD 1.3, 7.3). Setiap nilai berasal dari sumber resmi yang terdokumentasi; nilai yang tidak tersedia adalah `null`. Fixture test memakai nama fiktif dan tidak masuk build produksi.
4. Setiap angka yang tampil membawa satuan, periode, dan status data.
5. Teks antarmuka berbahasa Indonesia sederhana, tanpa tanda pisah panjang, tanpa label tombol generik (`design.md` bagian 9).
6. Tidak ada rahasia di repository dan tidak ada data pribadi (PRD 14.3).
7. Semua commit dibuat oleh anggota tim; setiap perubahan lewat pull request yang ditinjau anggota lain.
8. Sebelum commit: `npm run lint`, `typecheck`, `test`, dan `validate-data` harus lulus.
9. Jika spesifikasi ambigu, pilih opsi paling sederhana dan catat di `docs/decisions/README.md`.
10. Pustaka dan font dipakai sesuai lisensinya; catat di `docs/references.md` (PRD 20).
11. Hasil pemeriksaan dilaporkan apa adanya. Jangan menulis "lulus" untuk perintah yang belum dijalankan (PRD 15.2).

## 2. Tech stack

Daftar mengikuti PRD 15. Versi tidak ditulis karena belum diverifikasi: pakai versi stabil terbaru saat inisialisasi dan kunci lewat `package-lock.json`.

| Komponen | Pilihan | Status |
| --- | --- | --- |
| Framework | Next.js (App Router), React | Dipilih |
| Bahasa | TypeScript, mode `strict` | Dipilih |
| Styling | Tailwind CSS dengan token dari `design.md` bagian 13 | Dipilih |
| Komponen UI | shadcn/ui hanya yang dipakai (select, checkbox, tabs, sheet), disesuaikan dengan `design.md` | Dipilih |
| Ikon | Lucide, hanya yang fungsional | Dipilih |
| Grafik | Recharts; cadangan SVG sendiri bila tidak cukup mengontrol pola garis, penanda, dan label langsung | Putuskan di awal Phase grafik |
| Validasi | Zod (dataset dan parameter URL) | Dipilih |
| Skrip impor | TypeScript dijalankan dengan `tsx`; pustaka pembaca CSV atau XLSX dipilih setelah format sumber diketahui | Dipilih |
| Penyimpanan | Berkas JSON di repository | Dipilih |
| Unit test | Vitest | Dipilih |
| Smoke test | Playwright, satu alur | Could, tahap Final |
| Lint dan format | ESLint, Prettier | Dipilih |
| CI | GitHub Actions | Belum pernah dijalankan |
| Deploy | Vercel | Akun dan batas paket belum diverifikasi |

Tidak dipakai di MVP: database, ORM, API publik, autentikasi, ETL terjadwal (PRD 5.2, 15.1). Tinjau keputusan ini hanya bila data melampaui puluhan ribu baris, perlu pembaruan berkala, atau ada fitur yang menulis data; catat di decisions.

## 3. Struktur repository

```text
Telusurin/
├─ README.md
├─ prd.md  design.md  spec.md
├─ docs/
│  ├─ data-sources.md              # sumber, gerbang indikator, kamus indikator
│  ├─ validation-report.md         # hasil validasi dan pemeriksaan sampel
│  ├─ decisions/README.md          # catatan keputusan
│  ├─ screenshots/
│  ├─ user-testing.md              # dibuat saat uji pengguna (Final)
│  ├─ references.md                # dibuat saat ada referensi pertama
│  └─ clarifications/README.md     # dibuat saat ada konfirmasi tertulis panitia
├─ data/
│  └─ raw/<source-id>/             # berkas asli + SOURCE.md
├─ scripts/
│  ├─ import/<source-id>.ts        # raw -> JSON dataset
│  └─ validate-data.ts
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                  # F1
│  │  ├─ dashboard/page.tsx        # F2 sampai F7, F9, F10
│  │  ├─ metodologi/page.tsx       # F8
│  │  ├─ error.tsx
│  │  └─ not-found.tsx
│  ├─ components/
│  │  ├─ ui/                       # shadcn yang dipakai
│  │  ├─ layout/                   # SiteHeader, SiteFooter, DataStatusBanner
│  │  └─ data/                     # StatusLabel, SourceNote, ChartFooter, ValueCell
│  ├─ features/
│  │  ├─ dashboard/                # FilterPanel, TrendChart, ComparisonChart, DataTable, url-state
│  │  ├─ insights/                 # InsightList, templates.ts
│  │  └─ methodology/
│  ├─ domain/                      # tipe, skema, konstanta, hitungan, aturan insight (tanpa React)
│  ├─ server/data/                 # DataRepository dan implementasi JSON
│  ├─ data/dataset/                # meta.json regions.json indicators.json observations.json
│  ├─ config/site.ts               # nama produk, teks status, penanda fitur
│  └─ lib/                         # format.ts (id-ID), csv.ts
├─ tests/
│  ├─ unit/
│  └─ fixtures/                    # data fiktif untuk test saja
├─ package.json  tsconfig.json  eslint.config.*  .gitignore  .env.example
└─ .github/workflows/ci.yml
```

Dokumentasi mengikuti PRD 21 dengan tiga penyederhanaan yang dicatat di decisions: `data-dictionary.md` digabung ke `data-sources.md`; tidak ada `docs/methodology.md` karena halaman `/metodologi` adalah satu-satunya sumber metodologi; `user-testing.md`, `references.md`, dan `clarifications/` dibuat saat ada isinya.

| Direktori | Tanggung jawab | Aturan |
| --- | --- | --- |
| `domain/` | Tipe, skema Zod, konstanta, hitungan, aturan insight | Tidak mengimpor React atau Next.js; satu-satunya tempat hitungan (PRD 15.1) |
| `server/data/` | Membaca dan memvalidasi dataset | Satu-satunya pembaca berkas dataset; galat validasi menggagalkan build |
| `features/` | Tampilan dan logika per fitur | Tidak membaca berkas data; data lewat props |
| `components/` | Komponen umum | Tanpa logika fitur |
| `app/` | Halaman dan layout | Server Component bawaan; data lewat repository |
| `config/` | Nama produk, teks status, penanda fitur | Ganti nama produk cukup di satu berkas |
| `scripts/` | Impor dan validasi data | Tidak mengimpor dari `src/app` atau `features` |

Komponen klien (`'use client'`) hanya untuk grafik, panel filter, dan tombol unduh.

## 4. Model data

### 4.1 Konstanta (`src/domain/constants.ts`)

Angka yang muncul di kode, teks, dan UI diambil dari sini agar konsisten (PRD 10.2).

```ts
export const MIN_REGIONS = 3;            // ambang minimum daerah bernilai: rata-rata, I1, I3, tahun tersedia
export const MAX_SELECTED_REGIONS = 5;   // batas daerah yang dipilih (filter)
export const DEFAULT_SELECTED_REGIONS = 3;
export const MIN_YEARS_WARNING = 3;      // di bawah ini validate-data memberi peringatan
```

### 4.2 Skema (Zod)

```ts
import { z } from "zod";

export const DataStatus = z.enum(["resmi", "belum_terverifikasi", "contoh"]);
export const FieldId = z.enum(["pendidikan", "kesehatan", "infrastruktur_dasar"]);
const HttpsUrl = z.string().url().refine((u) => u.startsWith("https://"), "wajib https");
const IsoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const RegionSchema = z.object({
  code: z.string().min(1),                       // kode sesuai sistem kode sumber
  name: z.string().min(1),
  kind: z.enum(["kabupaten", "kota"]),
});

export const SourceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),                       // tabel atau publikasi
  publisher: z.string().min(1),
  url: HttpsUrl,
  retrievedAt: IsoDate,
  termsStatus: z.enum(["diperiksa", "belum_diperiksa"]),
  termsNote: z.string(),                         // ketentuan pakai dan atribusi
  citation: z.string().min(1),
});

export const IndicatorSchema = z.object({
  code: z.string().regex(/^[a-z0-9_]+$/),
  name: z.string().min(1),
  field: FieldId,
  valueKind: z.enum(["percent", "years", "ratio", "count"]),
  unit: z.string().min(1),                       // "persen", "tahun", "unit per 100.000 penduduk"
  unitShort: z.string(),
  decimals: z.number().int().min(0).max(3),
  definition: z.string().min(1),                 // dari publikasi sumber
  sourceIds: z.array(z.string()).min(1),         // semua sumber yang dipakai
  transformNote: z.string().optional(),          // wajib bila sourceIds lebih dari satu atau ada transformasi
});

export const ObservationSchema = z.object({
  regionCode: z.string(),
  indicatorCode: z.string(),
  year: z.number().int().min(1990).max(2100),
  value: z.number().nullable(),
  nullReason: z.enum(["belum_dilaporkan", "tidak_tersedia"]).optional(),
  status: DataStatus,
  sourceId: z.string(),                          // sumber nilai ini (PRD 7.4)
});

export const DatasetMetaSchema = z.object({
  id: z.string(),
  version: z.string(),
  title: z.string(),
  province: z.object({ code: z.string(), name: z.string() }),
  regionCodeSystem: z.string(),
  updatedAt: IsoDate,
  years: z.object({ from: z.number().int(), to: z.number().int() }),
  sources: z.array(SourceSchema).min(1),
  limitations: z.array(z.string()).min(1),
  changelog: z.array(z.object({ version: z.string(), date: IsoDate, change: z.string() })).min(1),
});
```

### 4.3 Aturan integritas

Diperiksa oleh `validate-data` dan saat dataset dimuat. Kegagalan menghentikan build dengan pesan yang menunjuk baris bermasalah (PRD 14.3).

1. Kunci unik: (`regionCode`, `indicatorCode`, `year`) tidak boleh ganda.
2. Semua `regionCode`, `indicatorCode`, dan `sourceId` yang direferensikan ada; `observation.sourceId` termasuk dalam `indicator.sourceIds`.
3. `year` berada dalam `meta.years`.
4. Indikator `percent` bernilai 0 sampai 100; semua nilai tidak negatif.
5. `nullReason` hanya boleh ada bila `value` adalah `null`.
6. `transformNote` wajib bila `sourceIds` lebih dari satu.
7. Observasi berstatus `resmi` hanya boleh merujuk sumber dengan `termsStatus = "diperiksa"`; selain itu status harus `belum_terverifikasi` (PRD 7.2).
8. Status `contoh` ditolak oleh build produksi; hanya boleh di `tests/fixtures` (PRD 7.2).
9. `meta.version` sama dengan `version` entri terakhir `changelog`, dan `meta.updatedAt` sama dengan tanggal entri itu.

Laporan yang dicetak (bukan kegagalan): per indikator, daftar tahun, jumlah daerah bernilai per tahun, jumlah `null`, jumlah nilai 0 (untuk diperiksa manual terhadap sumber), apakah lengkap (semua daerah, semua tahun), dan peringatan bila jumlah tahun di bawah `MIN_YEARS_WARNING` atau ada tahun dengan daerah bernilai di bawah `MIN_REGIONS`.

### 4.4 Representasi dan turunan

- Nilai disimpan sebagai angka JSON dengan presisi sumber; pembulatan hanya saat tampil (`indicator.decimals`). Persen disimpan 0 sampai 100 (72,4 berarti 72,4 persen).
- `null` berarti belum tersedia. Tidak ada nol pengganti (PRD 7.3). Label tampilan: `belum_dilaporkan` menjadi "Belum dilaporkan", `tidak_tersedia` atau kosong menjadi "Belum tersedia".
- **Tahun tersedia** sebuah indikator adalah tahun yang punya sekurang-kurangnya `MIN_REGIONS` daerah bernilai (status bukan `contoh`). Hanya tahun ini yang muncul di pilihan tahun dan grafik tren. Tahun lain tetap dapat dilihat di tabel dan metodologi.
- **Cakupan lengkap** hanya boleh disebut di UI bila semua daerah punya nilai pada semua tahun tersedia. Selain itu UI menyebut cakupan sebenarnya, misalnya "{n} dari {m} daerah" (PRD 6.1).

## 5. Impor data dari sumber resmi

Tidak ada ETL otomatis (PRD 5.2). Data diimpor manual dari berkas yang diunduh anggota tim.

1. Unduh berkas dari sumber resmi dan simpan **tanpa diubah** di `data/raw/<source-id>/`.
2. Buat `data/raw/<source-id>/SOURCE.md`: nama tabel atau publikasi, penerbit, URL, tanggal ambil, anggota yang mengambil, ringkasan ketentuan pakai (setelah dibaca), teks atribusi yang diminta.
3. Isi bagian sumber dan indikator di `docs/data-sources.md` (gerbang PRD 6.4). Indikator yang gagal gerbang tidak masuk dataset produksi.
4. Tulis `scripts/import/<source-id>.ts` yang membaca berkas mentah dan menulis ke `src/data/dataset/*.json`. Skrip deterministik, mencetak ringkasan (jumlah baris, `null`, anomali), dan tidak mengisi nilai yang hilang.
5. Jalankan `npm run validate-data`; simpan keluarannya di `docs/validation-report.md`.
6. **Pemeriksaan sampel:** dua anggota yang bukan penulis skrip mencocokkan minimal 10 nilai acak dengan berkas sumber dan mencatatnya di `docs/validation-report.md` (PRD 16.1).
7. Setelah gerbang dan pemeriksaan lolos, `termsStatus` sumber menjadi `diperiksa`, status observasi menjadi `resmi`, dan entri baru ditambahkan ke `meta.changelog`. Sampai saat itu statusnya `belum_terverifikasi`.

Indikator turunan (misalnya Puskesmas per 100.000 penduduk, yang butuh data penduduk dari sumber lain) hanya boleh masuk jika kedua sumber lolos gerbang dan `transformNote` menjelaskan rumus, tahun penduduk yang dipakai, dan alasan keduanya sebanding (PRD 12). Bila tidak, indikator itu dikeluarkan.

Jika dua sumber resmi memberi angka berbeda untuk nilai yang sama, ikuti PRD 7.5: jangan memilih diam-diam, catat alasan pemilihan di `docs/decisions/README.md`, dan jangan menggabungkan angka yang belum terselesaikan.

## 6. DataRepository

Semua pembacaan data lewat antarmuka ini sehingga sumber dapat diganti tanpa mengubah UI.

```ts
export interface DataRepository {
  getMeta(): Promise<DatasetMeta>;
  getRegions(): Promise<Region[]>;
  getIndicators(): Promise<Indicator[]>;
  getSources(): Promise<Source[]>;
  getObservations(q: {
    indicator: string;
    regions?: string[];   // kosong berarti semua daerah (dipakai untuk rata-rata)
    years?: number[];
  }): Promise<Observation[]>;
}
```

`StaticJsonRepository` memvalidasi keempat berkas JSON sekali per proses dan menyimpannya di memori. Galat validasi melempar `DataError` dengan lokasi yang bermasalah; halaman menampilkan pesan umum lewat `error.tsx`, tidak pernah angka bawaan yang tampak valid (PRD 14.3).

## 7. Fungsi hitung (`src/domain`)

Murni (tanpa efek samping), menerima `number | null`, dan mengembalikan `null` bila data tidak cukup (PRD 10.4).

```ts
type Num = number | null;

changeAbs(from: Num, to: Num): Num
simpleMean(values: Num[], minCount = MIN_REGIONS): { mean: Num; n: number }
gapToMean(value: Num, mean: Num): Num
rankDesc(items: { code: string; value: Num }[]): { code: string; rank: number | null }[]
sameAtPrecision(a: Num, b: Num, decimals: number): boolean
availableYears(observations: Observation[], minRegions = MIN_REGIONS): number[]
```

Aturan:

- **Selisih** indikator persen ditampilkan dalam **poin persentase**; indikator lain mengikuti satuannya (PRD 10.1). Persen relatif tidak ditampilkan.
- **Rata-rata sederhana** dihitung dari **semua daerah dalam dataset** yang bernilai pada tahun itu, bukan hanya daerah terpilih, agar acuannya tidak berubah mengikuti filter. Labelnya "Rata-rata sederhana antar daerah yang memiliki data ({n} daerah)". Tidak dibobot penduduk dan bukan angka resmi provinsi (PRD 10.2). Bila jumlah daerah bernilai di bawah `MIN_REGIONS`, hasilnya `null`.
- **Peringkat** memakai urutan kompetisi (1, 2, 2, 4); `null` tidak diberi peringkat (PRD 10.3). Peringkat dipakai untuk mengurutkan grafik batang dan memilih nilai tertinggi atau terendah; tidak ditampilkan sebagai kolom "peringkat".
- **Tidak berubah:** dua nilai yang sama pada presisi tampil dianggap tidak berubah.
- Pembulatan hanya saat tampil. Hasil tidak boleh `NaN` atau `Infinity` dan tidak melempar galat.

## 8. Insight berbasis aturan (F9)

Deterministik, tanpa model bahasa (PRD 11.1). Aturan di `src/domain/insights.ts`, kalimat di `src/features/insights/templates.ts`. Hanya observasi berstatus `resmi` yang diproses (PRD 11.2).

Cakupan: I1, I2, I4 bekerja pada **daerah yang dipilih**; I3 membandingkan satu daerah terpilih dengan rata-rata semua daerah di dataset. Setiap kalimat menyebut cakupannya.

| ID | Syarat | Templat kalimat |
| --- | --- | --- |
| I1 Tertinggi dan terendah | Minimal `MIN_REGIONS` daerah terpilih bernilai pada tahun terpilih | "Pada {tahun}, di antara {n} daerah terpilih, {indikator} tertinggi di {daerah} ({nilai}) dan terendah di {daerah} ({nilai}). Selisihnya {selisih}." Bila seri, sebut sampai 3 nama lalu "dan {k} daerah lain" |
| I2 Perubahan | Daerah terpilih bernilai pada tahun awal dan akhir dari tahun tersedia indikator | "Dari {tahunA} ke {tahunB}, {indikator} di {daerah} {naik atau turun} {selisih} (dari {nilaiA} ke {nilaiB})." Bila sama pada presisi tampil: "tidak berubah" |
| I3 Terhadap rata-rata | Daerah terpilih bernilai dan rata-rata punya n minimal `MIN_REGIONS` | "Pada {tahun}, {indikator} di {daerah} ({nilai}) {di atas, di bawah, atau sama dengan} rata-rata sederhana {n} daerah ({rata-rata}), selisih {selisih}." |
| I4 Kelengkapan | Ada daerah terpilih yang `null` pada tahun terpilih | "Data {indikator} untuk {k} dari {m} daerah terpilih belum tersedia pada {tahun}: {nama}." |
| I5 Data belum cukup | Syarat I1, I2, atau I3 tidak terpenuhi | Satu kalimat per alasan di bawah |

Alasan I5 (PRD 11.4), masing-masing satu kalimat spesifik:

| Kode alasan | Kalimat |
| --- | --- |
| `kurang_daerah` | "Pilih minimal {MIN_REGIONS} daerah yang punya data pada {tahun} untuk melihat nilai tertinggi dan terendah. Saat ini {n} daerah." |
| `tahun_pembanding_tidak_ada` | "Perubahan di {daerah} belum dapat dihitung: nilai {tahunA} atau {tahunB} belum tersedia." |
| `rata_rata_tidak_cukup` | "Rata-rata sederhana belum dapat dihitung: hanya {n} daerah yang punya data pada {tahun}, kurang dari {MIN_REGIONS}." |
| `status_belum_resmi` | "Data {indikator} belum berstatus resmi, sehingga belum dipakai untuk insight." |

Setiap insight membawa bukti agar dapat ditelusuri dan diuji (PRD 11.3):

```ts
type InsightEvidence = {
  ruleId: "I1" | "I2" | "I3" | "I4" | "I5";
  indicatorCode: string;
  unit: string;
  years: number[];
  regionCodes: string[];
  values: (number | null)[];
  formula: string;         // mis. "nilai_B - nilai_A"
  meaning: string;         // arti hasil, satu kalimat
  limitation: string;      // keterbatasan, satu kalimat
  sourceIds: string[];
  n?: number;
  reason?: "kurang_daerah" | "tahun_pembanding_tidak_ada" | "rata_rata_tidak_cukup" | "status_belum_resmi";
};
```

UI menampilkan tautan "Lihat dasar hitung" yang membuka nilai dasar, rumus, arti hasil, keterbatasan, dan sumber. Teks `limitation` untuk I1 dan I3: "Nilai yang lebih tinggi tidak otomatis berarti kondisi lebih baik atau lebih buruk; arah penilaian bergantung pada definisi indikator."

**Larangan bahasa** (PRD 11.4). Templat, `meaning`, `limitation`, dan hasil render tidak boleh memuat: "membaik", "memburuk", "terbaik", "terburuk", "berhasil", "gagal", "karena", "akibat", "menyebabkan". Unit test memeriksa semuanya.

## 9. State URL dan validasi parameter

```text
/dashboard?i=infra_air_layak&y=2024&r=3578,3573,3574
```

Contoh di atas hanya ilustrasi format. Kode daerah nyata bergantung pada keputusan wilayah.

| Parameter | Arti | Aturan | Bawaan |
| --- | --- | --- | --- |
| `i` | Kode indikator | Harus ada di dataset | Indikator pertama menurut urutan bidang |
| `y` | Tahun | Termasuk tahun tersedia indikator | Tahun tersedia terbaru |
| `r` | Daerah yang ditampilkan, urutan menentukan warna dan penanda | Daftar kode dipisah koma; 1 sampai `MAX_SELECTED_REGIONS`; semua harus ada di dataset | `DEFAULT_SELECTED_REGIONS` daerah pertama menurut kode wilayah |

Daerah terpilih **menyaring**: grafik tren, grafik perbandingan, tabel, insight, dan CSV hanya memuat daerah di `r` (PRD F3, 16.2). Satu-satunya data lintas daerah adalah rata-rata sederhana acuan.

Penanganan parameter tidak valid (PRD 8.1): nilai diganti bawaan atau dibersihkan dan halaman menampilkan **satu kalimat pemberitahuan** yang menyebut apa yang diubah.

| Kasus | Perilaku dan pemberitahuan |
| --- | --- |
| `i` tidak dikenal | Pakai bawaan. "Indikator pada tautan tidak ditemukan. Menampilkan {nama}." |
| `y` bukan tahun tersedia | Pakai tahun tersedia terbaru. "Tahun {y} belum tersedia untuk indikator ini. Menampilkan {tahun}." |
| Kode daerah tidak dikenal | Buang kode itu. "{k} kode daerah pada tautan tidak dikenal dan diabaikan." |
| Lebih dari `MAX_SELECTED_REGIONS` | Pakai yang pertama. "Hanya {MAX} daerah yang dapat ditampilkan sekaligus. Menampilkan {MAX} pertama." |
| Semua kode tidak valid atau `r` kosong | Pakai bawaan. "Pilihan daerah pada tautan tidak valid. Menampilkan {DEFAULT} daerah pertama." |

Filter di UI selalu menyisakan minimal satu daerah (kotak centang terakhir tidak bisa dimatikan dan diberi petunjuk). Skema `searchParams` ditulis dengan Zod dan di-test.

## 10. Halaman dan komponen

### 10.1 Landing page (`/`, F1)

Server Component. Isi: judul, dua kalimat penjelasan yang dibangkitkan dari dataset, tombol "Buka dashboard", tautan "Baca metodologi", tabel "Data yang tersedia", dan baris sumber dengan status. Semua cakupan (provinsi, bidang, jumlah daerah, rentang tahun) dibaca dari dataset; tidak ada angka atau klaim periode yang ditulis tangan (PRD 6.2). Tidak ada angka dampak, testimoni, atau gambar dekoratif. `DataStatusBanner` tampil bila ada status selain `resmi`.

### 10.2 Dashboard (`/dashboard`, F2 sampai F7, F9, F10)

Server Component yang membaca `searchParams`, memanggil repository dan fungsi `domain`, lalu memberi props ke komponen.

| Komponen | Jenis | Fitur | Perilaku |
| --- | --- | --- | --- |
| `FilterPanel` | Klien | F2, F3 | Indikator dan tahun (pilihan tunggal), daerah (pilihan ganda, maksimal `MAX_SELECTED_REGIONS`); mengubah URL dengan `router.replace`; label selalu terlihat; keyboard penuh |
| `TrendChart` | Klien | F4 | Satu garis per daerah terpilih; pola garis dan penanda berbeda; celah untuk `null`; label langsung; deskripsi teks; garis acuan rata-rata tidak digambar di tren |
| `ComparisonChart` | Klien | F5 | Batang horizontal berurut untuk tahun `y`; warna daerah sama dengan di tren; basis nol; garis putus rata-rata sederhana; nilai dicetak di ujung batang; "Belum tersedia" bagi `null` |
| `DataTable` | Server | F6 | Matriks daerah terpilih (baris) dan tahun tersedia (kolom), kolom tahun `y` ditandai; selisih terhadap rata-rata untuk tahun `y`; status per sel |
| `ChartFooter` | Server | F7 | Sumber, tanggal ambil, status, cara membaca, batas interpretasi; selalu di bawah grafik |
| `InsightList` | Server | F9 | Daftar insight dengan "Lihat dasar hitung" |
| `DownloadCsvButton` | Klien | F10 | Tampil hanya bila `config.features.csv` aktif; nonaktif dengan alasan bila nol baris |

`ValueCell` menampilkan nilai bersatuan, atau label nilai kosong, dan penanda teks bila status bukan `resmi` (lihat `design.md` bagian 6.4). `FilterPanel` menampilkan jumlah daerah terpilih dan batasnya.

Kondisi: parameter tidak valid (bagian 9), tidak ada data untuk indikator dan tahun (keadaan kosong dengan penjelasan), galat pembacaan data (`error.tsx`), dan kegagalan memuat grafik (error boundary pada `TrendChart` dan `ComparisonChart` yang menampilkan teks "Grafik tidak dapat dimuat. Data tersedia di tabel di bawah." sementara tabel tetap tampil; PRD 8.1).

### 10.3 Metodologi (`/metodologi`, F8)

Server Component yang membaca dataset, jadi isinya tidak menyimpang dari data.

- **Draft:** versi minimal yang cukup agar tautan di header dan landing tidak mati (PRD 16.3): daftar indikator (nama, bidang, definisi, satuan, sumber), tabel sumber (penerbit, tautan, tanggal ambil, status ketentuan pakai), arti tiga status data, aturan nilai kosong, dan keterbatasan dari `meta.limitations`.
- **Final:** ditambah penjelasan selisih, rata-rata, dan peringkat; aturan insight beserta rumusnya; tanggal pembaruan data dan changelog dataset; bagian "Yang tidak bisa disimpulkan dari data ini" (PRD 12, butir 1 sampai 12).

### 10.4 Header, footer, galat

`SiteHeader`: nama produk (dari `config/site.ts`) sebagai tautan beranda, Dashboard, Metodologi. `SiteFooter`: atribusi sumber dan catatan batas penggunaan. `error.tsx`: pesan umum dan tombol "Muat ulang". `not-found.tsx`: tautan ke beranda.

## 11. Spesifikasi grafik

Disalin dan diisi di `docs/data-sources.md` bagian "Spesifikasi grafik" saat grafik dibangun.

| | Grafik tren | Grafik perbandingan |
| --- | --- | --- |
| Pertanyaan | Bagaimana satu indikator berubah per tahun di daerah terpilih? | Bagaimana daerah terpilih dibandingkan pada satu indikator di satu tahun? |
| Variabel | tahun (x), nilai (y) | daerah (kategori), nilai |
| Satuan | `indicator.unit` | `indicator.unit` |
| Cakupan | Daerah terpilih; tahun tersedia indikator | Daerah terpilih; tahun `y` |
| Agregasi | Tidak ada | Garis acuan rata-rata sederhana semua daerah di dataset |
| Sumber | Sumber nilai (`observation.sourceId`) | Sama |
| Keterbatasan | `null` tampak sebagai celah; perubahan kecil bisa di bawah presisi tampil; tidak ada interpolasi | `null` tidak punya batang; rata-rata tidak dibobot penduduk |
| Cara membaca | "Setiap garis adalah satu daerah yang kamu pilih." | "Batang yang lebih panjang berarti nilai yang lebih besar, bukan layanan yang lebih baik." |

## 12. Ekspor CSV (F10, Should, Final)

- Dibuat di browser oleh `lib/csv.ts` dari data yang sedang tampil: indikator terpilih, **daerah terpilih**, dan seluruh tahun tersedia, sama dengan isi `DataTable`. Tahun `y` hanya mengatur grafik perbandingan dan insight, jadi tidak mempersempit CSV (lihat decisions D-009).
- RFC 4180: koma, UTF-8 dengan BOM, akhir baris CRLF, titik desimal. README mencatat bahwa Excel berlokal Indonesia mungkin perlu impor dengan pemisah koma.
- Kolom: `kode_daerah, daerah, kode_indikator, indikator, satuan, tahun, nilai, keterangan_kosong, status, sumber, url_sumber, tanggal_ambil, versi_dataset`.
- `null` menjadi sel kosong dan `keterangan_kosong` memuat alasannya.
- Sel teks yang diawali `=`, `+`, `-`, atau `@` diberi awalan `'` (mencegah injeksi rumus). Kolom `nilai` tidak diubah.
- Nol baris: tombol nonaktif dengan alasan; tidak ada berkas kosong yang dihasilkan (PRD 13).
- Nama berkas: `telusurin_{kode_indikator}.csv`.

## 13. Pengujian

| Area | Kasus yang wajib diuji |
| --- | --- |
| Hitungan | selisih normal; salah satu `null`; hasil sama pada presisi tampil; rata-rata dengan n di bawah `MIN_REGIONS`; peringkat dengan nilai sama dan `null`; tidak ada `NaN` atau `Infinity` |
| Skema dan integritas | data valid lolos; kunci ganda ditolak; kode tak dikenal ditolak; `observation.sourceId` di luar `indicator.sourceIds` ditolak; persen di luar 0 sampai 100 ditolak; `nullReason` pada nilai bukan `null` ditolak; `transformNote` wajib untuk lebih dari satu sumber; `resmi` dengan sumber `belum_diperiksa` ditolak; `contoh` ditolak di build produksi; URL non-https ditolak; `meta.version` tidak cocok dengan changelog ditolak |
| Tahun tersedia | tahun dengan daerah bernilai di bawah `MIN_REGIONS` tidak muncul |
| Insight | I1 sampai I5 dengan data kecil; setiap kode alasan I5; hanya status `resmi` dipakai; bukti selalu lengkap (satuan, arti, keterbatasan, sumber); tidak ada kata terlarang di templat dan hasil |
| Parameter URL | setiap baris tabel bagian 9; urutan `r` menentukan slot warna; kotak centang terakhir tidak bisa dimatikan |
| Format | angka `id-ID`; `null` menjadi label yang sesuai `nullReason`; satuan sesuai `unitShort` |
| CSV | kolom dan urutan; hanya daerah terpilih; `null` kosong dengan keterangan; tanda kutip dan koma dalam sel; injeksi rumus diberi awalan; nol baris tidak menghasilkan berkas |
| Repository | dataset nyata dimuat tanpa galat; fixture rusak menghasilkan `DataError` yang menunjuk lokasi |
| Komponen (Could) | `StatusLabel`, `ValueCell`, `DataTable` dengan `null` dan status campuran, kegagalan grafik menampilkan pesan dan tabel tetap tampil |
| Alur utama (Could, Final) | landing, dashboard, ubah filter, metodologi, unduh CSV |
| Manual | 360, 768, 1280 px; keyboard; pembaca layar pada filter dan tabel; Lighthouse pada produksi dengan kondisi pengujian dicatat (PRD 14) |

## 14. Skrip, CI, lingkungan, deploy

| Skrip | Fungsi |
| --- | --- |
| `dev`, `build`, `start` | Jalankan, bangun, sajikan |
| `lint`, `format` | ESLint dan Prettier |
| `typecheck` | `tsc --noEmit` |
| `test` | Vitest |
| `validate-data` | Aturan integritas bagian 4.3 dan laporan; dijalankan otomatis sebelum `build` |
| `import:<source-id>` | Skrip impor satu sumber |

- **CI (`ci.yml`)**: pada setiap pull request jalankan install, `lint`, `typecheck`, `test`, `validate-data`, `build`. Belum pernah dijalankan; jangan dinyatakan berfungsi sebelum terbukti.
- **Lingkungan**: tidak ada variabel wajib. Bila perlu, catat di `.env.example`; jangan commit nilai rahasia.
- **Deploy**: hubungkan ke Vercel, deploy pratinjau per pull request, periksa URL sebelum dilaporkan. Akun dan batas paket belum diverifikasi.
- **Git**: `main` stabil; cabang `feat/...` dan `fix/...`; pesan commit berawalan `feat:`, `fix:`, `docs:`, `chore:`, `test:`; periksa `git diff` sebelum commit; `.gitignore` mencakup `node_modules`, `.next`, `.env*`, dan hasil build.

## 15. Pemetaan fitur PRD ke implementasi

| Fitur PRD | Prioritas, tahap | Implementasi | Bukti selesai |
| --- | --- | --- | --- |
| F1 Landing page | Must, D | `app/page.tsx` | Cakupan dibaca dari dataset; tombol bekerja |
| F2 Dashboard indikator | Must, D | `FilterPanel`, `dashboard/page.tsx` | Indikator dan tahun tersedia saja; grafik dan tabel memakai pilihan yang sama |
| F3 Filter daerah | Must, D | `FilterPanel`, `url-state` | Pilihan menyaring semua tampilan; parameter tak valid ditangani |
| F4 Tren waktu | Must, D | `TrendChart` | Tahun, nilai, satuan, celah untuk `null` |
| F5 Perbandingan daerah | Must, D | `ComparisonChart` | `null` bukan nol; rata-rata berlabel |
| F6 Tabel data | Must, D | `DataTable`, `ValueCell` | Semua nilai terbaca tanpa grafik; status per sel |
| F7 Sumber dan status | Must, D | `ChartFooter`, `SourceNote`, `StatusLabel`, `DataStatusBanner` | Sumber, status, periode terlihat di tampilan data |
| F8 Metodologi | Must, F (minimal di D) | `metodologi/page.tsx` | Butir PRD 12 terpenuhi di Final |
| F9 Insight | Must, F | `domain/insights.ts`, `InsightList` | Bukti lengkap dan test lulus |
| F10 CSV | Should, F | `lib/csv.ts`, `DownloadCsvButton` | Sesuai bagian 12 |
| F11 Pencarian | Could, F | Tidak dirancang sampai Must stabil | N/A |
| F12 Peta, akun | Di luar MVP | Tidak dikerjakan | N/A |

## 16. Definition of done

Fitur selesai bila kriteria PRD 8.2 terpenuhi, dan:

- [ ] Kriteria fitur di PRD 8 serta bagian terkait PRD 16 terpenuhi.
- [ ] `lint`, `typecheck`, `test`, `validate-data`, `build` lulus dan hasilnya dicatat.
- [ ] Diperiksa pada 360, 768, 1280 px dan dengan keyboard.
- [ ] Semua angka bersatuan, berperiode, dan berstatus; sumber terlihat.
- [ ] Keadaan kosong, galat, dan parameter tidak valid ditangani.
- [ ] Checklist review desain (`design.md` bagian 14) terisi.
- [ ] Ditinjau anggota lain; dokumentasi terpengaruh diperbarui.

**First Draft (1 November 2026).** Syarat panitia berikut berasal dari materi yang diberikan tim dan perlu dicocokkan lagi dengan panduan resmi (PRD 2, 22):

- [ ] Repository publik dengan README berisi judul, deskripsi 1 sampai 2 kalimat, tech stack, cara menjalankan, dan progres.
- [ ] F1 sampai F7 berjalan dengan data berstatus `resmi`; metodologi minimal tersedia; tidak ada tautan atau tombol utama yang mati.
- [ ] PDF maksimal 10 halaman dan 10 MB bernama `WIA_FSDMIA2026_NamaTim`, berisi konsep, sitemap, wireframe atau mockup, fitur utama, dan minimal dua screenshot nyata (landing page dan satu halaman lain).
- [ ] Pemeriksaan sampel 10 nilai selesai dan tercatat di `docs/validation-report.md`.

**Final (16 November 2026):** definisi selesai PRD 23, termasuk Lighthouse (aksesibilitas minimal 90, performa minimal 80), uji pengguna 3 sampai 5 orang di `docs/user-testing.md`, dan deployment yang terverifikasi bila tautan demo ikut dikumpulkan.

## 17. Hal yang belum diputuskan

Mengikuti PRD 22, ditambah yang khusus teknis. Tiap butir perlu pemilik dan tenggat.

- [ ] **[TERBUKA]** Provinsi, daftar kabupaten/kota, dan sistem kode wilayah sumber.
- [ ] **[TERBUKA]** Indikator final setelah gerbang PRD 6.4; sumber dan format berkasnya.
- [ ] **[TERBUKA]** Ketentuan pakai dan atribusi tiap sumber.
- [ ] **[TERBUKA]** Periode final.
- [ ] **[TERBUKA]** Pustaka pembaca CSV atau XLSX untuk skrip impor.
- [ ] **[TERBUKA]** Recharts atau SVG sendiri.
- [ ] **[TERBUKA]** Lisensi repository, font, dan komponen.
- [ ] **[TERBUKA]** Nama, keahlian, dan tanggung jawab tiga anggota.
- [ ] **[TERBUKA]** Persyaratan final 16 November, nama tim, dan format berkas.
- [ ] **[TERBUKA]** Perlu tidaknya mode "semua daerah" untuk grafik perbandingan (Could, setelah batas lima daerah diuji ke pengguna).
