# Laporan validasi data

Isi hanya dengan hasil yang benar-benar dijalankan atau diperiksa. Bagian yang belum dikerjakan dibiarkan `OPEN` (PRD 16.1, 17).

## 1. Validasi otomatis

| Hal | Isi |
| --- | --- |
| Tanggal dijalankan | OPEN |
| Versi dataset (`meta.version`) | OPEN |
| Commit | OPEN |
| Dijalankan oleh | OPEN |
| Perintah | `npm run validate-data` |
| Hasil | OPEN (lulus atau gagal) |

Tempel keluaran lengkap perintah, termasuk laporan cakupan per indikator (tahun, jumlah daerah bernilai per tahun, jumlah `null`, jumlah nilai 0, peringatan):

```text
OPEN
```

Temuan dari keluaran di atas dan tindak lanjutnya:

| Temuan | Tindak lanjut | Status |
| --- | --- | --- |
| OPEN | OPEN | OPEN |

## 2. Pemeriksaan sampel

Aturan:

- Minimal 10 nilai acak dari seluruh dataset, mencakup lebih dari satu indikator dan lebih dari satu tahun.
- Dilakukan oleh **dua anggota yang bukan penulis skrip impor**, masing-masing mencocokkan nilai di dataset dengan berkas atau halaman sumber, bukan dengan skrip.
- Cara memilih sampel dicatat di bawah agar dapat diulang.
- Nilai kosong (`null`) ikut disampel: pastikan di sumber memang kosong atau tidak dilaporkan.

Cara memilih sampel: OPEN

| No | Daerah | Indikator | Tahun | Nilai di dataset | Nilai di sumber | Lokasi di sumber (berkas, tabel, sel atau halaman) | Pemeriksa 1 | Pemeriksa 2 | Cocok |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN |
| 2 | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN |
| 3 | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN |
| 4 | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN |
| 5 | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN |
| 6 | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN |
| 7 | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN |
| 8 | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN |
| 9 | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN |
| 10 | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN |

## 3. Ketidakcocokan

Target: 0 ketidakcocokan yang belum dijelaskan (PRD 17). Setiap ketidakcocokan dicatat dengan penyebab dan perbaikannya.

| No sampel | Penyebab | Perbaikan | Diperiksa ulang oleh | Tanggal |
| --- | --- | --- | --- | --- |

## 4. Kesimpulan

Diisi setelah bagian 1 sampai 3 selesai: jumlah nilai diperiksa, jumlah cocok, jumlah ketidakcocokan yang sudah dijelaskan, dan apakah status `resmi` boleh diberikan. OPEN
