# Laporan validasi data

Hasil pemeriksaan dan validasi dataset Telusurin.

## 1. Validasi otomatis

| Hal | Isi |
| --- | --- |
| Tanggal dijalankan | 2026-11-09 |
| Versi dataset (`meta.version`) | 1.0.0 |
| Dijalankan oleh | Tim Telusurin |
| Perintah | `npm run validate-data` |
| Hasil | Lulus tanpa error |

Keluaran perintah validasi otomatis (dataset resmi):

```text
Indikator pend_aps_16_18: tahun tersedia 2020, 2021, 2022, 2023, 2024; jumlah null 0; jumlah nilai 0 0.
Indikator pend_rls: tahun tersedia 2020, 2021, 2022, 2023, 2024; jumlah null 0; jumlah nilai 0 0.
Indikator infra_air_layak: tahun tersedia 2020, 2021, 2022, 2023; jumlah null 0; jumlah nilai 0 0.
```

Temuan dari keluaran di atas dan tindak lanjutnya:

| Temuan | Tindak lanjut | Status |
| --- | --- | --- |
| Dataset resmi BPS Jawa Timur (APS 16-18, RLS, Air Minum Layak) lolos seluruh aturan integritas skema Zod serta relasi antar entitas, tanpa nilai null maupun nol pada seluruh periode yang tersedia. | Dilanjutkan untuk pengujian fungsional aplikasi. | Selesai |

## 2. Pemeriksaan sampel

Aturan:
- Minimal 10 nilai acak dari seluruh dataset, mencakup lebih dari satu indikator dan lebih dari satu tahun.
- Dicocokkan dengan sumber atau fixture pengujian.

| No | Daerah | Indikator | Tahun | Nilai di dataset | Lokasi di sumber | Pemeriksa 1 | Pemeriksa 2 | Cocok |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Kabupaten Pacitan | `infra_air_layak` | 2023 | 80.19 | BPS Jatim - Air Minum Layak | Afif | Mirza | Ya |
| 2 | Kabupaten Pacitan | `pend_aps_16_18` | 2024 | 84.81 | BPS Jatim - APS | Afif | Mirza | Ya |
| 3 | Kabupaten Ponorogo | `pend_aps_16_18` | 2022 | 78.18 | BPS Jatim - APS | Afif | Mirza | Ya |
| 4 | Kabupaten Ponorogo | `pend_rls` | 2024 | 7.80 | BPS Jatim - RLS | Afif | Mirza | Ya |
| 5 | Kabupaten Trenggalek | `pend_rls` | 2023 | 7.90 | BPS Jatim - RLS | Afif | Mirza | Ya |
| 6 | Kabupaten Trenggalek | `infra_air_layak` | 2020 | 80.64 | BPS Jatim - Air Minum Layak | Afif | Mirza | Ya |
| 7 | Kabupaten Pacitan | `pend_rls` | 2022 | 7.82 | BPS Jatim - RLS | Afif | Mirza | Ya |
| 8 | Kabupaten Ponorogo | `infra_air_layak` | 2021 | 96.30 | BPS Jatim - Air Minum Layak | Afif | Mirza | Ya |
| 9 | Kabupaten Trenggalek | `pend_aps_16_18` | 2023 | 83.34 | BPS Jatim - APS | Afif | Mirza | Ya |
| 10 | Kabupaten Pacitan | `pend_rls` | 2021 | 7.61 | BPS Jatim - RLS | Afif | Mirza | Ya |

## 3. Ketidakcocokan

Target: 0 ketidakcocokan.

| No sampel | Penyebab | Perbaikan | Diperiksa ulang oleh | Tanggal |
| --- | --- | --- | --- | --- |
| - | Tidak ada | - | Tim Telusurin | 2026-11-09 |

## 4. Kesimpulan

Jumlah nilai diperiksa: 10 sampel. Jumlah cocok: 10. Ketidakcocokan: 0. Status dataset resmi valid untuk pengujian sistem.
