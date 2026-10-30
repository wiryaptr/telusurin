# Sumber data dan gerbang indikator

Berkas ini adalah satu-satunya tempat mencatat sumber, hasil gerbang indikator, dan kamus indikator. Isi hanya dari pemeriksaan nyata pada publikasi sumber. Kolom yang belum diperiksa ditulis `OPEN`, bukan ditebak (PRD 6.4, 7).

Terakhir diperbarui: 27 Oktober 2026

## 1. Cakupan

| Hal | Nilai |
| --- | --- |
| Provinsi | Jawa Timur (kandidat awal, belum keputusan final) |
| Jumlah kabupaten/kota dalam dataset | OPEN (belum dikonfirmasi cakupan per indikator) |
| Sistem kode wilayah sumber | OPEN (belum dikonfirmasi sistem kode BPS yang digunakan) |
| Periode dataset | OPEN (belum dikonfirmasi rentang tahun per indikator) |
| Versi dataset | OPEN (belum ada dataset produksi) |

## 2. Sumber

Satu baris per tabel atau publikasi. `Ketentuan pakai` diisi setelah halaman ketentuannya dibaca langsung, bukan dari ringkasan pihak ketiga.

| ID sumber | Tabel atau publikasi | Penerbit | URL spesifik | Tanggal ambil | Diambil oleh | Ketentuan pakai dan atribusi | Status ketentuan |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `bps-jatim-aps-16-18` | Angka Partisipasi Sekolah (APS) Menurut Kabupaten/Kota dan Kelompok Umur - Tabel Statistik | BPS Provinsi Jawa Timur | https://jatim.bps.go.id/id/statistics-table/2/NjMyIzI=/angka-partisipasi-sekolah-aps-.html | 27 Oktober 2026 | Tim Telusurin | Gratis untuk komersial dan nonkomersial, harus mencantumkan kutipan BPS (judul, tanggal akses, penulis, tautan langsung), data dapat diubah/dihapus/ditarik oleh BPS kapan saja | diperiksa |
| `bps-jatim-rls` | Rata-Rata Lama Sekolah Penduduk Usia 25 Tahun ke Atas Menurut Kabupaten/Kota - Tabel Statistik | BPS Provinsi Jawa Timur | https://jatim.bps.go.id/id/statistics-table/2/MzIjMg==/rata-rata-lama-sekolah.html | 27 Oktober 2026 | Tim Telusurin | Sama di atas | diperiksa |
| `bps-jatim-statistik-kesehatan-2024` | Statistik Kesehatan Provinsi Jawa Timur 2024 | BPS Provinsi Jawa Timur | https://jatim.bps.go.id/id/publication/2026/04/30/d14a8b6e58550ccdebee6886/statistik-kesehatan-provinsi-jawa-timur-2025.html (halaman publikasi, PDF perlu dibuka untuk tabel asli) | 27 Oktober 2026 | Tim Telusurin | Sama di atas | diperiksa |
| `bps-jatim-air-minum-layak` | Persentase Rumah Tangga yang Memiliki Akses Terhadap Sumber Air Minum Layak Menurut Kabupaten/Kota di Provinsi Jawa Timur - Tabel Statistik | BPS Provinsi Jawa Timur | https://jatim.bps.go.id/id/statistics-table/3/TUU0eE4xbE9hMWhSVjNCSGNYaFpWRlJKUjFSTlp6MDkjMw==/persentase-rumah-tangga-yang-memiliki-akses-terhadap-sumber-air-minum-layak-menurut-kabupaten-kota-di-provinsi-jawa-timur--2020.html?year=2020 | 27 Oktober 2026 | Tim Telusurin | Sama di atas | diperiksa |
| `bps-jatim-transportasi-2024` | Transportation Statistics of Jawa Timur Province 2024 (Publikasi, Lampiran 1: Persentase Kemantapan Jalan Kabupaten dan Jalan Kota, 2024) | BPS Provinsi Jawa Timur | https://jatim.bps.go.id/en/publication/2025/06/30/8ef1f587557ade7b60f08145/transportation-statistics-of-jawa-timur-province-2024.html | 27 Oktober 2026 | Tim Telusurin | Sama di atas | diperiksa |
| `bps-jatim-jalan-kondisi` | Panjang Jalan Kewenangan Provinsi Menurut Kondisi Jalan dan Kabupaten/Kota - Tabel Statistik | BPS Provinsi Jawa Timur | https://jatim.bps.go.id/id/statistics-table/2/NTQyIzI=/panjang-jalan-kewenangan-provinsi-menurut-kondisi-jalan-dan-kabupaten-kota.html | 27 Oktober 2026 | Tim Telusurin | Sama di atas | diperiksa |

Ketentuan penggunaan BPS (dibaca langsung dari https://jatim.bps.go.id/id/term-of-use, 27 Oktober 2026):

- Konten gratis untuk komersial dan nonkomersial, seluruh dunia, terus-menerus, non-eksklusif.
- Wajib memberikan kutipan/kredit kepada BPS: judul konten, tanggal akses, penulis (jika ada), dan tautan langsung ke konten asli.
- Data dapat diubah, dihapus, atau ditarik oleh BPS kapan saja tanpa pemberitahuan.
- Tidak boleh membuat dukungan atau asosiasi palsu yang menyiratkan BPS mendukung aktivitas pribadi.

## 3. Gerbang indikator

Indikator masuk dataset produksi hanya bila semua baris di bawah terisi dan keputusannya "masuk". Target: minimal 4 indikator lolos, idealnya di minimal 2 bidang. Empat indikator yang valid lebih baik daripada enam yang meragukan (PRD 6.3, 23).

### 3.1 Ringkasan status kandidat

| Kode kerja | Indikator kandidat | Bidang | Satuan kerja | Status gerbang |
| --- | --- | --- | --- | --- |
| `pend_aps_16_18` | Angka partisipasi sekolah usia 16 sampai 18 tahun | Pendidikan | Persen | PERLU VERIFIKASI |
| `pend_rls` | Rata-rata lama sekolah penduduk usia 25 tahun ke atas | Pendidikan | Tahun | PERLU VERIFIKASI |
| `kes_persalinan_faskes` | Persalinan di fasilitas kesehatan | Kesehatan | Persen | PERLU VERIFIKASI |
| `kes_puskesmas_rasio` | Puskesmas per 100.000 penduduk | Kesehatan | Unit per 100.000 penduduk | BELUM DIPERIKSA (butuh data penduduk dari sumber kedua + `transformNote`, sumber kedua belum teridentifikasi — catatan kelayakan, bukan hasil pemeriksaan) |
| `infra_air_layak` | Rumah tangga dengan akses air minum layak | Infrastruktur dasar | Persen | PERLU VERIFIKASI |
| `infra_jalan_baik` | Jalan dengan kondisi baik | Infrastruktur dasar | Persen | PERLU VERIFIKASI |

### 3.2 Templat per indikator

**Indikator: `pend_aps_16_18`**

| Pertanyaan | Jawaban |
| --- | --- |
| Nama dan definisi resmi (kutip dari publikasi) | Angka Partisipasi Sekolah (APS) penduduk usia 16-18 tahun. Definisi resmi perlu dikutip langsung dari publikasi BPS setelah tabel dibuka. |
| Satuan resmi | Persen |
| Sumber dan URL spesifik | BPS Provinsi Jawa Timur, Tabel Statistik APS Menurut Kabupaten/Kota dan Kelompok Umur, https://jatim.bps.go.id/id/statistics-table/2/NjMyIzI=/angka-partisipasi-sekolah-aps-.html |
| Periode yang tersedia | OPEN (tabel ditemukan, tahun tersedia belum dikonfirmasi) |
| Cakupan geografis: berapa dari berapa kabupaten/kota punya nilai, per tahun | OPEN (belum dikonfirmasi, Jawa Timur memiliki 29 kabupaten dan 9 kota) |
| Tanggal pengambilan | 27 Oktober 2026 |
| Ketentuan penggunaan dan atribusi | Gratis, wajib kutipan BPS (lihat bagian 2 di atas) |
| Cara ekstraksi (berkas, tabel, halaman) | OPEN (tabel statistik web BPS, perlu buka halaman untuk melihat struktur tabel) |
| Aturan transformasi, bila ada | Tidak ada |
| Hasil validasi nilai dan cakupan (rujuk `validation-report.md`) | OPEN (belum ada dataset produksi) |
| Definisi sama sepanjang periode dan antardaerah? | OPEN (belum diverifikasi) |
| Keputusan: masuk, keluar, atau belum terverifikasi, beserta alasannya | PERLU VERIFIKASI - sumber resmi ditemukan, namun tabel asli dan tahun tersedia belum dibuka untuk memastikan cakupan kabupaten/kota dan periode konsisten |

**Indikator: `pend_rls`**

| Pertanyaan | Jawaban |
| --- | --- |
| Nama dan definisi resmi (kutip dari publikasi) | Rata-Rata Lama Sekolah Penduduk Usia 25 Tahun ke Atas. Definisi resmi perlu dikutip langsung dari publikasi BPS setelah tabel dibuka. |
| Satuan resmi | Tahun |
| Sumber dan URL spesifik | BPS Provinsi Jawa Timur, Tabel Statistik RLS Menurut Kabupaten/Kota, https://jatim.bps.go.id/id/statistics-table/2/MzIjMg==/rata-rata-lama-sekolah.html |
| Periode yang tersedia | OPEN (tabel ditemukan, tahun tersedia belum dikonfirmasi) |
| Cakupan geografis: berapa dari berapa kabupaten/kota punya nilai, per tahun | OPEN (belum dikonfirmasi) |
| Tanggal pengambilan | 27 Oktober 2026 |
| Ketentuan penggunaan dan atribusi | Gratis, wajib kutipan BPS (lihat bagian 2 di atas) |
| Cara ekstraksi (berkas, tabel, halaman) | OPEN (tabel statistik web BPS, perlu buka halaman untuk melihat struktur tabel) |
| Aturan transformasi, bila ada | Tidak ada |
| Hasil validasi nilai dan cakupan (rujuk `validation-report.md`) | OPEN (belum ada dataset produksi) |
| Definisi sama sepanjang periode dan antardaerah? | OPEN (belum diverifikasi) |
| Keputusan: masuk, keluar, atau belum terverifikasi, beserta alasannya | PERLU VERIFIKASI - sumber resmi ditemukan, namun tabel asli dan tahun tersedia belum dibuka untuk memastikan cakupan kabupaten/kota dan periode konsisten |

**Indikator: `kes_persalinan_faskes`**

| Pertanyaan | Jawaban |
| --- | --- |
| Nama dan definisi resmi (kutip dari publikasi) | Persentase persalinan di fasilitas kesehatan. Definisi resmi perlu dikutip dari publikasi Statistik Kesehatan Provinsi Jawa Timur atau metadata indikator BPS. |
| Satuan resmi | Persen |
| Sumber dan URL spesifik | BPS Provinsi Jawa Timur, Statistik Kesehatan Provinsi Jawa Timur 2024, https://jatim.bps.go.id/id/publication/2026/04/30/d14a8b6e58550ccdebee6886/statistik-kesehatan-provinsi-jawa-timur-2025.html ; metadata indikator https://sirusa.web.bps.go.id/metadata/indikator/535b6d6f-f1ba-8cb5-8481-f2a4d7a76a8d |
| Periode yang tersedia | OPEN (publikasi 2024 terbit 26 Juni 2025, publikasi 2025 terbit 30 April 2026, tabel asli perlu dibuka dari PDF) |
| Cakupan geografis: berapa dari berapa kabupaten/kota punya nilai, per tahun | OPEN (belum dikonfirmasi, perlu buka PDF publikasi untuk melihat tabel per kabupaten/kota) |
| Tanggal pengambilan | 27 Oktober 2026 |
| Ketentuan penggunaan dan atribusi | Gratis, wajib kutipan BPS (lihat bagian 2 di atas) |
| Cara ekstraksi (berkas, tabel, halaman) | OPEN (PDF publikasi Statistik Kesehatan, perlu download dan periksa tabel asli beserta nomor halaman) |
| Aturan transformasi, bila ada | Tidak ada |
| Hasil validasi nilai dan cakupan (rujuk `validation-report.md`) | OPEN (belum ada dataset produksi) |
| Definisi sama sepanjang periode dan antardaerah? | OPEN (belum diverifikasi) |
| Keputusan: masuk, keluar, atau belum terverifikasi, beserta alasannya | PERLU VERIFIKASI - publikasi resmi ditemukan, namun tabel asli per kabupaten/kota dan nomor halaman belum diverifikasi dari PDF |

**Indikator: `kes_puskesmas_rasio`**

| Pertanyaan | Jawaban |
| --- | --- |
| Nama dan definisi resmi (kutip dari publikasi) | Puskesmas per 100.000 penduduk. Indikator turunan (butuh jumlah puskesmas dan jumlah penduduk). |
| Satuan resmi | Unit per 100.000 penduduk |
| Sumber dan URL spesifik | Belum ada sumber kedua (data penduduk) yang teridentifikasi untuk Jawa Timur |
| Periode yang tersedia | OPEN |
| Cakupan geografis | OPEN |
| Tanggal pengambilan | 27 Oktober 2026 |
| Ketentuan penggunaan dan atribusi | OPEN |
| Cara ekstraksi (berkas, tabel, halaman) | Belum ada |
| Aturan transformasi, bila ada | Butuh `transformNote`: rumus = (jumlah puskesmas / jumlah penduduk) × 100.000, tahun populasi yang dipakai, dan alasan keduanya sebanding (PRD 5, spec bagian 5) |
| Hasil validasi nilai dan cakupan (rujuk `validation-report.md`) | OPEN |
| Definisi sama sepanjang periode dan antardaerah? | OPEN |
| Keputusan: masuk, keluar, atau belum terverifikasi, beserta alasannya | BELUM DIPERIKSA - butuh data penduduk dari sumber kedua dan `transformNote` sesuai PRD bagian 5 dan spec bagian 5. Sumber kedua belum teridentifikasi. Tidak boleh dipaksa masuk tanpa verifikasi kedua sumber. |

**Indikator: `infra_air_layak`**

| Pertanyaan | Jawaban |
| --- | --- |
| Nama dan definisi resmi (kutip dari publikasi) | Persentase rumah tangga yang memiliki akses terhadap sumber air minum layak. Definisi resmi perlu dikutip dari tabel statistik BPS setelah dibuka. |
| Satuan resmi | Persen |
| Sumber dan URL spesifik | BPS Provinsi Jawa Timur, Tabel Statistik Akses Air Minum Layak Menurut Kabupaten/Kota, https://jatim.bps.go.id/id/statistics-table/3/TUU0eE4xbE9hMWhSVjNCSGNYaFpWRlJKUjFSTlp6MDkjMw==/persentase-rumah-tangga-yang-memiliki-akses-terhadap-sumber-air-minum-layak-menurut-kabupaten-kota-di-provinsi-jawa-timur--2020.html?year=2020 |
| Periode yang tersedia | OPEN (tabel ditemukan, tahun tersedia belum dikonfirmasi) |
| Cakupan geografis: berapa dari berapa kabupaten/kota punya nilai, per tahun | OPEN (belum dikonfirmasi) |
| Tanggal pengambilan | 27 Oktober 2026 |
| Ketentuan penggunaan dan atribusi | Gratis, wajib kutipan BPS (lihat bagian 2 di atas) |
| Cara ekstraksi (berkas, tabel, halaman) | OPEN (tabel statistik web BPS, perlu buka halaman untuk melihat struktur tabel) |
| Aturan transformasi, bila ada | Tidak ada |
| Hasil validasi nilai dan cakupan (rujuk `validation-report.md`) | OPEN (belum ada dataset produksi) |
| Definisi sama sepanjang periode dan antardaerah? | OPEN (belum diverifikasi) |
| Keputusan: masuk, keluar, atau belum terverifikasi, beserta alasannya | PERLU VERIFIKASI - sumber resmi ditemukan, namun tabel asli dan tahun tersedia belum dibuka untuk memastikan cakupan kabupaten/kota dan periode konsisten |

**Indikator: `infra_jalan_baik`**

| Pertanyaan | Jawaban |
| --- | --- |
| Nama dan definisi resmi (kutip dari publikasi) | Persentase jalan dengan kondisi baik. Definisi resmi perlu dikutip dari publikasi Transportation Statistics of Jawa Timur Province 2024 atau tabel statistik BPS. |
| Satuan resmi | Persen |
| Sumber dan URL spesifik | BPS Provinsi Jawa Timur, Transportation Statistics of Jawa Timur Province 2024 (terbit 30 Juni 2025, No. Publikasi 35000.25025, ISSN 2407-3261), https://jatim.bps.go.id/en/publication/2025/06/30/8ef1f587557ade7b60f08145/transportation-statistics-of-jawa-timur-province-2024.html ; dan Tabel Statistik Panjang Jalan Kewenangan Provinsi Menurut Kondisi Jalan dan Kabupaten/Kota, https://jatim.bps.go.id/id/statistics-table/2/NTQyIzI=/panjang-jalan-kewenangan-provinsi-menurut-kondisi-jalan-dan-kabupaten-kota.html |
| Periode yang tersedia | OPEN (publikasi 2024 memiliki Lampiran 1 halaman 55: Persentase Kemantapan Jalan Kabupaten dan Jalan Kota, 2024; tabel statistik perlu dibuka) |
| Cakupan geografis: berapa dari berapa kabupaten/kota punya nilai, per tahun | OPEN (belum dikonfirmasi) |
| Tanggal pengambilan | 27 Oktober 2026 |
| Ketentuan penggunaan dan atribusi | Gratis, wajib kutipan BPS (lihat bagian 2 di atas) |
| Cara ekstraksi (berkas, tabel, halaman) | OPEN (PDF publikasi Transportasi, Lampiran 1 halaman 55; atau tabel statistik web BPS) |
| Aturan transformasi, bila ada | Tidak ada |
| Hasil validasi nilai dan cakupan (rujuk `validation-report.md`) | OPEN (belum ada dataset produksi) |
| Definisi sama sepanjang periode dan antardaerah? | OPEN (belum diverifikasi) |
| Keputusan: masuk, keluar, atau belum terverifikasi, beserta alasannya | PERLU VERIFIKASI - sumber resmi dan referensi halaman (Lampiran 1, halaman 55) ditemukan, namun tabel asli perlu diverifikasi dari PDF dan tahun tersedia belum dikonfirmasi |

### 3.3 Tabel audit kelayakan

| Indikator | Sumber | Ketersediaan tahun | Cakupan wilayah | Konsistensi definisi | Kendala | Keputusan |
| --- | --- | --- | --- | --- | --- | --- |
| `pend_aps_16_18` | BPS Jatim (kandidat), Tabel Statistik APS | OPEN (tabel ditemukan, tahun belum dikonfirmasi) | OPEN (belum dikonfirmasi per kabupaten/kota) | OPEN | Tabel statistik web belum dibuka untuk memastikan tahun dan cakupan lengkap | PERLU VERIFIKASI |
| `pend_rls` | BPS Jatim (kandidat), Tabel Statistik RLS | OPEN (tabel ditemukan, tahun belum dikonfirmasi) | OPEN (belum dikonfirmasi per kabupaten/kota) | OPEN | Tabel statistik web belum dibuka untuk memastikan tahun dan cakupan lengkap | PERLU VERIFIKASI |
| `kes_persalinan_faskes` | BPS Jatim (kandidat), Statistik Kesehatan Jatim 2024/2025 | OPEN (publikasi 2024 terbit 2025, 2025 terbit 2026) | OPEN (per kabupaten/kota perlu diverifikasi dari PDF) | OPEN | PDF publikasi perlu dibuka untuk tabel asli dan nomor halaman | PERLU VERIFIKASI |
| `kes_puskesmas_rasio` | Belum ada sumber kedua | OPEN | OPEN | OPEN | Butuh data penduduk dari sumber kedua + `transformNote` (PRD 5, spec 5) | Belum diperiksa |
| `infra_air_layak` | BPS Jatim (kandidat), Tabel Statistik Air Minum Layak | OPEN (tabel ditemukan, tahun belum dikonfirmasi) | OPEN (belum dikonfirmasi per kabupaten/kota) | OPEN | Tabel statistik web belum dibuka untuk memastikan tahun dan cakupan lengkap | PERLU VERIFIKASI |
| `infra_jalan_baik` | BPS Jatim (kandidat), Transportation Statistics 2024 / Tabel Statistik Jalan | OPEN (Lampiran 1 halaman 55 untuk 2024; tabel statistik perlu dibuka) | OPEN (belum dikonfirmasi per kabupaten/kota) | OPEN | PDF publikasi perlu dibuka untuk memastikan tabel asli dan konsistensi | PERLU VERIFIKASI |

### 3.4 Rekomendasi indikator lolos untuk First Draft

Berdasarkan temuan audit di atas, rekomendasi berikut didukung oleh sumber resmi yang telah ditemukan (URL dan publikasi BPS Jawa Timur terverifikasi melalui pencarian web), namun **belum dibuktikan secara langsung terhadap tabel asli PDF** karena langkah tersebut memerlukan unduhan dan pemeriksaan berkas sumber yang belum dilakukan:

1. `pend_aps_16_18` (Pendidikan, Persen) - sumber BPS Jatim (kandidat) tabel statistik APS ditemukan, perlu verifikasi tabel asli
2. `pend_rls` (Pendidikan, Tahun) - sumber BPS Jatim (kandidat) tabel statistik RLS ditemukan, perlu verifikasi tabel asli
3. `infra_air_layak` (Infrastruktur dasar, Persen) - sumber BPS Jatim (kandidat) tabel statistik air minum layak ditemukan, perlu verifikasi tabel asli
4. `kes_persalinan_faskes` (Kesehatan, Persen) - publikasi Statistik Kesehatan Jatim 2024/2025 ditemukan, perlu verifikasi tabel asli dari PDF

Rekomendasi: **Jawa Timur sebagai kandidat provinsi awal**, dengan **empat indikator dari tiga bidang** (Pendidikan x2, Kesehatan, Infrastruktur dasar) yang memenuhi syarat minimal PRD 6.3 (minimal 4 indikator, minimal 2 bidang).

Indikator `kes_puskesmas_rasio` tidak direkomendasikan untuk First Draft karena gagal gerbang (butuh sumber kedua dan `transformNote`). Indikator `infra_jalan_baik` dapat dipertimbangkan setelah `infra_air_layak` diverifikasi, karena sumbernya juga ditemukan (Transportation Statistics 2024, Lampiran 1 halaman 55).

### 3.5 Kendala yang perlu diatasi sebelum data masuk produksi

1. **Tabel asli belum dibuka** - semua indikator di atas masih PERLU VERIFIKASI karena tabel statistik web BPS dan PDF publikasi belum dibuka langsung untuk memastikan tahun tersedia, cakupan kabupaten/kota, dan nilai aktual.
2. **Tidak ada data resmi yang dimasukkan ke `src/data/dataset/`** - sesuai PRD 7.2 dan D-002, dataset produksi hanya diisi dari data resmi terverifikasi. Fixture di `tests/fixtures/` hanya untuk pengembangan dan statusnya `contoh`.
3. **Pemeriksaan sampel oleh dua anggota belum dilakukan** - PRD 16.1 dan spec bagian 5 butuh 10 nilai acak dicocokkan oleh dua anggota yang bukan penulis skrip impor. Belum dilakukan karena belum ada skrip impor dan dataset produksi.
4. **`meta.version`, `meta.updatedAt`, dan `meta.changelog` belum diisi** - belum ada dataset produksi yang tersedia.

## 4. Kamus indikator

Diisi hanya untuk indikator yang masuk dataset. Kolom mengikuti skema `Indicator` di spec bagian 4.2.

| Kode | Nama | Bidang | Jenis nilai | Satuan | Desimal | Sumber | Catatan transformasi |
| --- | --- | --- | --- | --- | --- | --- | --- |
| OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN |

## 5. Spesifikasi grafik

Isi bagian ini saat grafik dibangun, mengikuti tabel di spec bagian 11: pertanyaan yang dijawab, variabel, satuan, cakupan, agregasi, sumber, keterbatasan, dan teks cara membaca. Belum diisi.

## 6. Perbedaan antarsumber

Catat setiap kasus dua sumber resmi yang memberi angka berbeda untuk nilai yang sama: indikator, daerah, tahun, kedua angka dan sumbernya, hasil pemeriksaan definisi dan revisi, serta keputusan dan alasannya (PRD 7.5). Jangan memilih diam-diam.

| Tanggal | Indikator, daerah, tahun | Sumber A dan angkanya | Sumber B dan angkanya | Hasil pemeriksaan | Keputusan |
| --- | --- | --- | --- | --- | --- |

## 7. Perubahan data

Setiap perubahan data dicatat juga di `meta.changelog` pada dataset: apa yang berubah, sumber perubahan, tanggal, alasan, dan hasil validasi ulang (PRD 7.6).
