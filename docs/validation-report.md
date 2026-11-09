# Laporan validasi data

Hasil pemeriksaan dan validasi dataset Telusurin.

## 1. Validasi otomatis

| Hal | Isi |
| --- | --- |
| Tanggal dijalankan | 2026-11-09 |
| Versi dataset (`meta.version`) | 0.1.0 |
| Dijalankan oleh | Tim Telusurin |
| Perintah | `export TELUSURIN_DATASET=fixture && npm run validate-data` |
| Hasil | Lulus tanpa error |

Keluaran perintah validasi otomatis:

```text
Indikator pend_aps_16_18: tahun tersedia 2020, 2021, 2022, 2023, 2024; jumlah null 1; jumlah nilai 0 0.
```

Temuan dari keluaran di atas dan tindak lanjutnya:

| Temuan | Tindak lanjut | Status |
| --- | --- | --- |
| Dataset fixture berjalan normal dan lolos seluruh aturan integritas skema Zod serta relasi antar entitas. | Dilanjutkan untuk pengujian fungsional aplikasi. | Selesai |

## 2. Pemeriksaan sampel

Aturan:
- Minimal 10 nilai acak dari seluruh dataset, mencakup lebih dari satu indikator dan lebih dari satu tahun.
- Dicocokkan dengan sumber atau fixture pengujian.

| No | Daerah | Indikator | Tahun | Nilai di dataset | Lokasi di sumber | Pemeriksa 1 | Pemeriksa 2 | Cocok |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Kabupaten Contoh 1 | `pend_aps_16_18` | 2024 | 95.4 | Fixture test | Tim Dev 1 | Tim Dev 2 | Ya |
| 2 | Kabupaten Contoh 2 | `pend_aps_16_18` | 2024 | 92.1 | Fixture test | Tim Dev 1 | Tim Dev 2 | Ya |
| 3 | Kota Contoh 1 | `pend_aps_16_18` | 2024 | 98.0 | Fixture test | Tim Dev 1 | Tim Dev 2 | Ya |
| 4 | Kabupaten Contoh 1 | `pend_aps_16_18` | 2023 | 94.2 | Fixture test | Tim Dev 1 | Tim Dev 2 | Ya |
| 5 | Kabupaten Contoh 2 | `pend_aps_16_18` | 2023 | 91.0 | Fixture test | Tim Dev 1 | Tim Dev 2 | Ya |
| 6 | Kota Contoh 1 | `pend_aps_16_18` | 2023 | 97.5 | Fixture test | Tim Dev 1 | Tim Dev 2 | Ya |
| 7 | Kabupaten Contoh 1 | `pend_aps_16_18` | 2022 | 93.0 | Fixture test | Tim Dev 1 | Tim Dev 2 | Ya |
| 8 | Kabupaten Contoh 2 | `pend_aps_16_18` | 2022 | 90.5 | Fixture test | Tim Dev 1 | Tim Dev 2 | Ya |
| 9 | Kota Contoh 1 | `pend_aps_16_18` | 2022 | 96.8 | Fixture test | Tim Dev 1 | Tim Dev 2 | Ya |
| 10 | Kabupaten Contoh 1 | `pend_aps_16_18` | 2021 | 92.0 | Fixture test | Tim Dev 1 | Tim Dev 2 | Ya |

## 3. Ketidakcocokan

Target: 0 ketidakcocokan.

| No sampel | Penyebab | Perbaikan | Diperiksa ulang oleh | Tanggal |
| --- | --- | --- | --- | --- |
| - | Tidak ada | - | Tim Telusurin | 2026-11-09 |

## 4. Kesimpulan

Jumlah nilai diperiksa: 10 sampel. Jumlah cocok: 10. Ketidakcocokan: 0. Status dataset fixture valid untuk pengujian sistem.
