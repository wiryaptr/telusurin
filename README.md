# Telusurin

Telusurin adalah platform web untuk membandingkan indikator layanan publik dasar antardaerah. Setiap angka disertai satuan, periode, sumber, status data, dan batas interpretasinya.

Dikembangkan untuk WIA MIA 2026. Tema: *Designing Digital Futures: Powering Public Transparency*. Subtema: *Data-Driven Decision Support*.

> **Penafian Penting:** Telusurin bukan produk BPS dan tidak didukung BPS.

## Status saat ini (Draf Pertama)

| Bagian | Status |
| --- | --- |
| Dokumen produk, desain, dan spesifikasi | [x] Selesai (`prd.md`, `design.md`, `spec.md`) |
| Provinsi dan indikator draf | [x] Jawa Timur (kandidat), data simulasi aktif |
| Landing page (F1) | [x] Selesai (v0.4) |
| Dashboard: indikator, filter daerah, tren, perbandingan, tabel, sumber dan status (F2 sampai F7) | [x] Selesai (v0.4) |
| Metodologi (F8) | [x] Selesai (v0.4) |
| Insight berbasis aturan (F9) | [ ] Tahap Final |
| Ekspor CSV (F10) | [ ] Tahap Final |
| Integrasi data BPS asli | [ ] Tahap Final |

## Teknologi

Next.js (App Router), React, TypeScript, Tailwind CSS, Zod, Vitest, ESLint. Data berupa berkas JSON; tidak ada database atau API luar di versi draf.

## Menjalankan proyek

```bash
git clone <URL repository>
cd telusurin
npm install
npm run dev
```

Untuk pengujian draf pertama, pastikan environment `TELUSURIN_DATASET=fixture` aktif jika dataset produksi belum tersedia.

## Atribusi Sumber Data

Data yang digunakan dalam draf pertama ini adalah dataset **fixture (simulasi)** untuk tujuan pengembangan dan demonstrasi fungsi sistem.
- **Sumber Simulasi:** Buku Pendidikan Tahunan (contoh)
- **Status:** `contoh` (Data simulasi, bukan angka nyata)

## Pengembangan dengan AI

Proyek ini dikembangkan dengan bantuan alat bantu AI untuk mempercepat penulisan kode komponen, skema validasi, dan unit test. Seluruh hasil kode telah ditinjau, diuji, dan di-commit secara manual oleh anggota tim untuk memastikan kualitas dan kesesuaian dengan spesifikasi produk. Sebelumnya produk ini bernama Telusurin.

## Tim

| Nama | Peran |
| --- | --- |
| Arya WIrya Putra Jatmiko   | [ISI] |
| Mirza Fadhil Naufal        | [ISI] |
| Muhammad Afifudin Zain     | [ISI] |

## Lisensi

Data tetap tunduk pada ketentuan penggunaan sumber masing-masing.
