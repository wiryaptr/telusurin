# PRD Telusurin

**Versi:** 0.3 (draf untuk implementasi dan validasi)\
**Tanggal:** 25 Oktober 2026\
**Kompetisi:** WIA MIA 2026\
**Tema:** Designing Digital Futures: Powering Public Transparency\
**Subtema pilihan:** Data-Driven Decision Support\
**First Draft:** 1 November 2026\
**Final:** 16 November 2026\
**Dokumen terkait:** `design.md`, `spec.md`

> **Instruksi implementasi:** Dokumen ini adalah sumber kebutuhan
> produk, bukan bukti bahwa fitur atau data sudah tersedia. Jangan
> mengklaim implementasi, validasi pengguna, kelengkapan data, atau
> keberhasilan pengujian sebelum benar-benar dilakukan. Keputusan yang
> belum tersedia harus ditandai `OPEN`, bukan diisi dengan asumsi.

---

## 1. Ringkasan produk

### 1.1 Apa itu Telusurin?

Telusurin adalah platform web yang membantu masyarakat memahami dan
membandingkan indikator layanan publik dasar antardaerah menggunakan
data resmi yang dapat ditelusuri.

Pengguna dapat memilih indikator, daerah, dan periode untuk melihat
tren, perbandingan, tabel nilai, serta insight deskriptif berbasis
aturan. Setiap informasi numerik dilengkapi konteks yang relevan:
satuan, periode, sumber, status data, dan batas interpretasi.

Telusurin tidak menentukan daerah mana yang paling baik dalam memberikan
pelayanan publik. Telusurin membantu pengguna memahami apa yang
ditunjukkan data, apa yang belum diketahui, dan pertanyaan lanjutan apa
yang layak diajukan.

### 1.2 Pernyataan nilai utama

**Bandingkan data layanan publik dengan sumber yang jelas dan
perhitungan yang dapat diperiksa.**

Pembeda utama Telusurin bukan jumlah grafik atau kecanggihan teknologi,
melainkan transparansi data dan kemampuan pengguna menelusuri dasar
setiap insight.

### 1.3 Prinsip produk

1.  **Evidence first:** setiap angka harus memiliki asal-usul yang dapat
    diperiksa.
2.  **No fabricated data:** angka tidak boleh direka, diperkirakan, atau
    diinterpolasi untuk menutupi kekosongan.
3.  **Explain the calculation:** insight harus dapat ditelusuri ke nilai
    dasar dan rumus.
4.  **Show uncertainty and gaps:** data yang tidak tersedia atau belum
    terverifikasi harus terlihat jelas.
5.  **Neutral interpretation:** perbedaan angka tidak otomatis berarti
    keberhasilan, kegagalan, atau hubungan sebab-akibat.
6.  **Simple before complex:** pengalaman inti harus mudah digunakan
    sebelum fitur tambahan dikembangkan.
7.  **Accessible by default:** informasi tidak boleh bergantung hanya
    pada warna, hover, atau kemampuan membaca grafik.

---

## 2. Konteks dan tujuan kompetisi

Telusurin dikembangkan untuk mendukung transparansi publik dan
pengambilan keputusan berbasis data melalui penyajian indikator layanan
publik yang lebih mudah dipahami.

Informasi tentang tema, subtema, tenggat, dan persyaratan pengumpulan
harus mengikuti materi resmi panitia. Persyaratan yang belum
dikonfirmasi tidak boleh diperlakukan sebagai ketentuan resmi.

### 2.1 Tujuan

-   Menghasilkan produk web yang dapat didemonstrasikan, bukan sekadar
    konsep.
-   Menunjukkan bagaimana data publik dapat disajikan secara informatif
    tanpa menghilangkan konteks.
-   Membuktikan keterlacakan angka dan perhitungan.
-   Menghasilkan antarmuka yang konsisten, responsif, dan mudah
    dipahami.
-   Menyediakan dokumentasi implementasi, metodologi, sumber data, serta
    keterbatasan.
-   Memenuhi persyaratan pengumpulan First Draft dan final setelah
    diverifikasi dari panduan panitia.

### 2.2 Bukti yang perlu disiapkan

-   Repository publik sesuai persyaratan kompetisi.
-   README yang menjelaskan tujuan, fitur, teknologi, cara menjalankan
    proyek, dan status pengerjaan.
-   PDF konsep sesuai format dan batas yang ditentukan panitia.
-   Screenshot nyata dari landing page dan dashboard.
-   URL demo apabila deployment berhasil.
-   Dokumentasi sumber dan metodologi.
-   Hasil pengujian fungsional, validasi data, dan uji pengguna yang
    benar-benar dilakukan.

Persyaratan final, format berkas, dan kriteria penilaian terperinci
harus diverifikasi dari materi resmi panitia.

---

## 3. Masalah yang ingin diselesaikan

### 3.1 Rumusan masalah

Pengguna yang ingin memahami perbedaan layanan publik antardaerah perlu
mengumpulkan dan membandingkan data dari berbagai tabel atau publikasi.
Proses ini dapat menyulitkan pengguna ketika definisi, satuan, periode,
kelengkapan, dan sumber data berbeda.

Akibatnya, pengguna berisiko membandingkan angka yang tidak sebanding
atau menyimpulkan sesuatu yang tidak didukung oleh data.

Masalah tersebut merupakan hipotesis produk yang perlu divalidasi, bukan
klaim bahwa seluruh sumber data publik memiliki masalah yang sama.

### 3.2 Hipotesis produk

Jika indikator layanan publik disajikan dalam satu pengalaman yang
konsisten, dengan sumber yang jelas, perbandingan yang dapat diperiksa,
dan batas interpretasi yang terlihat, pengguna akan lebih mudah:

-   menemukan perbedaan nilai antardaerah;
-   memahami perubahan nilai dari waktu ke waktu;
-   mengetahui apakah perbandingan tersebut cukup didukung data;
-   menemukan sumber untuk pemeriksaan lanjutan; dan
-   menghindari kesimpulan yang melampaui bukti.

### 3.3 Validasi masalah

Sebelum final, lakukan wawancara atau pengujian singkat kepada 3–5
calon pengguna, terutama mahasiswa, pengurus komunitas, atau pembaca
data publik pemula.

Pertanyaan yang disarankan:

1.  Kapan terakhir kali Anda perlu membandingkan indikator layanan
    publik antardaerah?
2.  Bagian apa yang paling sulit saat menemukan dan membandingkan
    angkanya?
3.  Bagaimana Anda memastikan angka berasal dari sumber yang dapat
    dipercaya?
4.  Bagaimana Anda memahami data yang kosong atau berbeda definisi?
5.  Apakah tampilan Telusurin membantu Anda memahami perbandingan
    tersebut? Mengapa?

Catat temuan aktual, bukan jawaban yang diperkirakan tim.

**Keluaran:** ringkasan masalah yang terkonfirmasi, kebutuhan pengguna,
dan perubahan produk yang dilakukan berdasarkan temuan.

---

## 4. Target pengguna

### 4.1 Pengguna utama

**Mahasiswa yang membutuhkan data untuk tugas, riset awal, policy brief,
atau diskusi publik.**

Kebutuhan:

-   membandingkan beberapa daerah dengan cepat;
-   memahami tren indikator;
-   menemukan sumber yang bisa dikutip;
-   memeriksa cara perhitungan;
-   mengekspor data untuk analisis lanjutan.

### 4.2 Pengguna sekunder

**Warga atau pengurus komunitas:** membutuhkan penjelasan sederhana
tentang kondisi indikator di daerahnya dan bagaimana nilainya
dibandingkan dengan daerah lain.

**Jurnalis atau analis pemula:** membutuhkan cara memeriksa klaim
tentang perbedaan antardaerah, termasuk melihat nilai kosong, periode
data, dan keterbatasan perbandingan.

### 4.3 Kebutuhan utama

Pengguna tidak perlu memahami kode atau metode statistik yang kompleks
untuk menggunakan fitur inti. Namun, mereka harus dapat membuka
penjelasan metode jika ingin memeriksa dasar perhitungan.

---

## 5. Tujuan dan non-goals

### 5.1 Tujuan MVP

MVP harus memungkinkan pengguna untuk:

1.  Mengetahui cakupan data yang benar-benar tersedia.
2.  Memilih satu indikator dan periode.
3.  Membandingkan nilai beberapa daerah.
4.  Melihat perubahan nilai dari waktu ke waktu.
5.  Mengetahui status kelengkapan dan verifikasi data.
6.  Membaca insight yang dapat ditelusuri ke nilai dasar.
7.  Membuka sumber dan metodologi.
8.  Mengunduh data yang sedang dilihat, apabila fitur ekspor sudah masuk
    tahap final.

### 5.2 Non-goals

Tidak termasuk MVP:

-   akun, login, dan preferensi pengguna yang tersimpan;
-   database dan API publik;
-   pembaruan data otomatis;
-   prediksi atau peramalan;
-   klaim sebab-akibat antarindikator;
-   rekomendasi kebijakan yang diklaim valid secara ilmiah;
-   pemeringkatan keseluruhan kualitas pemerintahan;
-   peta interaktif;
-   aplikasi seluler terpisah;
-   chatbot AI yang menghasilkan interpretasi bebas;
-   pengumpulan data pribadi pengguna.

Fitur tambahan tidak boleh menggeser penyelesaian pengalaman inti.

---

## 6. Cakupan wilayah, periode, dan indikator

### 6.1 Wilayah

Target awal adalah satu provinsi dengan kabupaten/kota yang tercakup
secara konsisten dalam sumber data terpilih.

**Provinsi final: OPEN, harus diputuskan setelah audit ketersediaan
data.**

Prioritaskan wilayah dengan sumber resmi yang jelas, definisi konsisten,
dan cakupan tahun yang memadai. Jika cakupan lengkap satu provinsi tidak
memungkinkan, tim dapat mengurangi indikator, memperpendek periode, atau
mempersempit cakupan daerah dengan menyatakannya secara transparan.
Jangan menyebut cakupan lengkap apabila sebagian daerah tidak tersedia.

### 6.2 Periode

Target awal: lima tahun terakhir yang tersedia secara konsisten.

**Periode final: OPEN, ditentukan dari data yang benar-benar
terverifikasi.**

Jika suatu indikator hanya memiliki dua atau tiga tahun data, jangan
menyebutnya sebagai tren lima tahun. Periode setiap indikator harus
ditampilkan sesuai cakupan sebenarnya.

### 6.3 Kandidat indikator

Kandidat berikut belum menjadi daftar final. Nama, definisi, satuan,
sumber, dan cakupannya wajib dicocokkan dengan publikasi resmi sebelum
digunakan.

| Kode kerja | Indikator kandidat | Bidang | Satuan kerja |
| --- | --- | --- | --- |
| `pend_aps_16_18` | Angka partisipasi sekolah usia 16–18 tahun | Pendidikan | Persen |
| `pend_rls` | Rata-rata lama sekolah penduduk usia 25 tahun ke atas | Pendidikan | Tahun |
| `kes_persalinan_faskes` | Persalinan di fasilitas kesehatan | Kesehatan | Persen |
| `kes_puskesmas_rasio` | Puskesmas per 100.000 penduduk | Kesehatan | Unit per 100.000 penduduk |
| `infra_air_layak` | Rumah tangga dengan akses air minum layak | Infrastruktur dasar | Persen |
| `infra_jalan_baik` | Jalan dengan kondisi baik | Infrastruktur dasar | Persen |

**Target:** sekurang-kurangnya empat indikator yang lolos audit data,
idealnya mencakup minimal dua bidang. Jumlah indikator bukan prioritas
jika kualitas sumber, konsistensi definisi, atau cakupan daerah tidak
memadai.

### 6.4 Gerbang kelayakan indikator

Indikator hanya dapat masuk ke dataset produksi setelah tim mencatat:

-   nama dan definisi resmi;
-   satuan resmi;
-   sumber dan URL spesifik;
-   periode yang tersedia;
-   cakupan geografis;
-   tanggal pengambilan;
-   ketentuan penggunaan dan atribusi;
-   cara ekstraksi data;
-   aturan transformasi jika ada;
-   hasil validasi nilai dan cakupan.

Jika persyaratan tersebut belum terpenuhi, indikator harus tetap
berstatus belum terverifikasi atau dikeluarkan dari tampilan produksi.

---

## 7. Kebijakan data dan keterlacakan

### 7.1 Prinsip sumber

Gunakan publikasi atau portal resmi pemerintah yang relevan, misalnya
BPS, kementerian, atau portal data pemerintah daerah.

Keberadaan sebuah portal resmi tidak otomatis membuktikan bahwa setiap
dataset di dalamnya cocok digunakan. Sumber dan ketentuan penggunaan
harus diperiksa pada tingkat dataset atau publikasi yang digunakan.

### 7.2 Status data

| Status | Makna | Perlakuan |
| --- | --- | --- |
| `resmi` | Sumber, definisi, periode, satuan, dan ketentuan penggunaan telah diperiksa | Boleh ditampilkan sebagai data terverifikasi dan digunakan oleh insight |
| `belum_terverifikasi` | Asal data telah ditemukan, tetapi masih ada metadata atau pemeriksaan yang belum selesai | Tampilkan peringatan yang jelas; jangan gunakan untuk insight |
| `contoh` | Data khusus pengujian atau demonstrasi internal | Tidak boleh bercampur dengan dataset produksi |

Data berstatus `contoh` tidak boleh menyamar sebagai data resmi daerah
nyata. Build produksi harus menolak dataset contoh.

### 7.3 Nilai yang tidak tersedia

-   Nilai kosong disimpan sebagai `null`.
-   Nilai kosong tidak boleh diganti dengan nol.
-   Jangan melakukan interpolasi atau imputasi untuk mengisi data yang
    tidak tersedia.
-   UI menggunakan label seperti **"Belum tersedia"** atau **"Belum
    dilaporkan"** sesuai makna sumber.
-   Ketiadaan angka tidak otomatis berarti nilai indikator nol atau
    daerah tidak memberikan layanan.

### 7.4 Metadata sumber

Setiap observasi harus dapat ditelusuri ke metadata minimal berikut:

-   identitas indikator;
-   identitas daerah;
-   tahun atau periode referensi;
-   nilai asli;
-   satuan;
-   status data;
-   sumber dan URL;
-   tanggal pengambilan;
-   catatan transformasi;
-   versi atau identitas dataset.

Hubungan antara setiap observasi dan sumbernya harus tetap dapat
diperiksa.

### 7.5 Penanganan perbedaan sumber

Jika dua sumber resmi memiliki angka berbeda:

1.  Jangan memilih angka secara diam-diam.
2.  Periksa definisi, periode, satuan, revisi publikasi, dan cakupan.
3.  Dokumentasikan alasan pemilihan sumber.
4.  Jika perbedaan belum terselesaikan, jangan gabungkan angka
    seolah-olah setara.
5.  Jika diperlukan, tampilkan catatan keterbatasan atau keluarkan
    indikator dari MVP.

### 7.6 Perubahan dan pembaruan data

Untuk MVP, riwayat perubahan dapat dicatat melalui dokumentasi versi dan
commit repository. Setiap perubahan data harus mencatat apa yang
berubah, sumber perubahan, tanggal, alasan, dan hasil validasi ulang.

---

## 8. Fitur dan prioritas

Prioritas: **Must**, **Should**, dan **Could**. Tahap D berarti First
Draft, sedangkan F berarti final.

| ID | Fitur | Prioritas | Tahap | Kriteria penerimaan |
| --- | --- | --- | --- | --- |
| F1 | Landing page | Must | D | Menjelaskan tujuan, cakupan aktual, sumber data, dan cara membuka dashboard; CTA bekerja |
| F2 | Dashboard indikator | Must | D | Pengguna dapat memilih indikator dan periode yang tersedia; grafik dan tabel menggunakan pilihan yang sama |
| F3 | Filter daerah | Must | D | Pengguna dapat memilih daerah yang valid; perbandingan berubah konsisten dengan pilihan |
| F4 | Tren waktu | Must | D | Menampilkan tahun, nilai, satuan, dan penanganan data kosong dengan jelas |
| F5 | Perbandingan daerah | Must | D | Menampilkan nilai per daerah pada periode terpilih; tidak menyamakan nilai kosong dengan nol |
| F6 | Tabel data | Must | D | Nilai dapat diperiksa tanpa mengandalkan grafik; metadata penting tersedia |
| F7 | Sumber dan status data | Must | D | Sumber, status, dan periode dapat ditemukan dari tampilan data terkait |
| F8 | Metodologi | Must | F | Menjelaskan definisi, sumber, perhitungan, batas interpretasi, dan penanganan data kosong |
| F9 | Insight berbasis aturan | Must | F | Setiap insight memiliki bukti, periode, nilai dasar, dan rumus yang dapat diperiksa |
| F10 | Ekspor CSV | Should | F | CSV mengikuti filter aktif dan menyertakan metadata sumber serta status |
| F11 | Pencarian teks | Could | F | Pengguna dapat menemukan indikator atau daerah jika waktu memungkinkan |
| F12 | Peta, akun, personalisasi | Out of scope | - | Tidak dikerjakan dalam MVP |

### 8.1 Persyaratan global

Semua halaman harus menangani kondisi data kosong, parameter URL tidak
valid, indikator atau daerah yang tidak ditemukan, galat pembacaan data,
halaman 404, tampilan layar kecil, navigasi keyboard, dan kegagalan
pemuatan fitur yang tidak esensial.

Parameter URL tidak valid harus menghasilkan fallback yang aman dan
pesan yang dapat dipahami, bukan hasil yang diam-diam berbeda dari
pilihan pengguna.

### 8.2 Definisi fitur selesai

Fitur tidak dinyatakan selesai hanya karena tampil di layar. Fitur
selesai jika kriteria penerimaan terpenuhi, kasus kosong dan kasus tepi
ditangani, pengujian relevan lulus, tidak menampilkan klaim atau angka
yang tidak didukung data, dan dapat didemonstrasikan melalui alur
pengguna.

---

## 9. Pengalaman pengguna utama

### 9.1 Alur utama

1.  Pengguna membuka landing page.
2.  Pengguna mengetahui indikator, wilayah, periode, dan cakupan data
    yang tersedia.
3.  Pengguna membuka dashboard.
4.  Pengguna memilih indikator dan tahun.
5.  Pengguna memilih satu atau beberapa daerah untuk dibandingkan.
6.  Pengguna melihat tren, perbandingan, dan tabel.
7.  Pengguna memeriksa sumber, status data, dan catatan interpretasi.
8.  Jika tersedia, pengguna membuka insight dan memeriksa dasar
    hitungnya.
9.  Pengguna membuka metodologi atau mengunduh CSV.

### 9.2 Prinsip antarmuka

-   Satu pertanyaan analitis utama per tampilan.
-   Grafik tidak boleh menggantikan tabel data yang dapat diperiksa.
-   Sumber dan periode harus terlihat tanpa memaksa pengguna mencari di
    halaman lain.
-   Penjelasan interpretasi harus berada dekat dengan grafik atau
    insight terkait.
-   Pengguna harus dapat membedakan nilai nol, nilai kosong, dan nilai
    belum terverifikasi.
-   Pilihan filter harus tercermin pada URL agar tampilan dapat
    dibagikan dan dibuka kembali.
-   Gunakan bahasa Indonesia yang jelas dan tidak berlebihan secara
    teknis.

### 9.3 Tampilan ponsel

Pada layar kecil, urutan informasi adalah judul indikator, sumber dan
status, kontrol filter, grafik tren, grafik perbandingan, tabel data,
insight, lalu tautan metodologi dan ekspor.

Tabel boleh digulir secara horizontal jika perlu, tetapi informasi
penting tidak boleh hilang atau terpotong tanpa petunjuk.

---

## 10. Aturan perhitungan

Semua perhitungan harus memiliki implementasi deterministik dan
pengujian otomatis.

### 10.1 Selisih

Untuk indikator persentase, selisih dua nilai persentase ditampilkan
dalam **poin persentase**, bukan persen relatif.

Contoh: perubahan dari 60% menjadi 65% adalah kenaikan 5 poin
persentase. Untuk indikator nonpersentase, selisih mengikuti satuan
indikator.

### 10.2 Rata-rata sederhana

Jika digunakan, rata-rata harus diberi label **"Rata-rata sederhana
antar daerah yang memiliki data."**

Rata-rata tersebut tidak dibobot jumlah penduduk dan tidak boleh disebut
sebagai angka resmi tingkat provinsi. Jika jumlah daerah dengan nilai
tersedia di bawah ambang minimum yang ditentukan, hasil rata-rata harus
`null` atau dinyatakan tidak cukup data.

Ambang minimum harus konsisten antara kode, dokumentasi, dan UI.

### 10.3 Peringkat

-   Nilai yang sama berbagi peringkat.
-   Gunakan peringkat kompetisi, misalnya 1, 2, 2, 4.
-   Nilai `null` tidak diberi peringkat.
-   Peringkat hanya menjelaskan urutan untuk indikator dan periode
    tertentu, bukan kualitas pemerintahan secara keseluruhan.
-   Nilai tertinggi tidak selalu berarti kondisi terbaik; arah
    interpretasi bergantung pada definisi indikator.

### 10.4 Pembulatan dan nilai tidak valid

Perhitungan menggunakan nilai asli; pembulatan hanya dilakukan saat
menampilkan hasil. Nilai tidak valid tidak boleh berubah menjadi `NaN`,
`Infinity`, atau angka yang tampak valid di UI. Pembagian dengan nol,
data yang tidak tersedia, atau input tidak valid harus menghasilkan
keadaan yang aman dan terdefinisi.

---

## 11. Insight berbasis aturan

### 11.1 Tujuan

Insight membantu pengguna menemukan pola deskriptif pada data yang
tersedia. Insight bukan prediksi, penilaian kinerja, atau penjelasan
sebab-akibat. Implementasi awal harus deterministik, dapat diuji, dan
tidak memerlukan model bahasa generatif.

### 11.2 Kandidat insight

| ID | Insight | Syarat minimum |
| --- | --- | --- |
| I1 | Nilai tertinggi dan terendah | Minimal tiga daerah dengan nilai valid pada indikator dan tahun yang sama |
| I2 | Perubahan dari waktu ke waktu | Nilai valid pada periode awal dan akhir |
| I3 | Perbandingan dengan rata-rata sederhana | Nilai daerah valid dan jumlah data memenuhi ambang |
| I4 | Kelengkapan data | Terdapat daerah yang belum memiliki nilai pada periode terpilih |
| I5 | Data belum cukup | Syarat insight lain tidak terpenuhi |

Insight yang menggunakan data hanya boleh memproses observasi berstatus
`resmi`.

### 11.3 Syarat transparansi

Setiap insight harus menyediakan indikator dan satuan, daerah yang
relevan, periode, nilai dasar, rumus atau metode perhitungan, penjelasan
singkat tentang arti hasil, keterbatasan jika diperlukan, serta
referensi ke data sumber.

### 11.4 Bahasa dan kondisi data tidak cukup

Gunakan deskripsi faktual seperti "Nilai tercatat sebesar ... pada tahun
...", "Nilai meningkat sebesar ... poin persentase dari ... ke ...",
atau "Data belum cukup untuk membuat perbandingan ini."

Hindari klaim seperti "daerah terbaik", "pemerintah berhasil", "kinerja
memburuk", "karena", atau "menyebabkan" kecuali ada dasar analitis yang
benar-benar mendukung klaim tersebut. Analisis sebab-akibat berada di
luar ruang lingkup MVP.

Jika data tidak cukup, tampilkan alasan spesifik, misalnya jumlah daerah
dengan nilai terlalu sedikit, periode pembanding tidak tersedia, atau
status data belum memenuhi syarat. Jangan memaksakan kesimpulan.

---

## 12. Metodologi dan dokumentasi

Halaman metodologi merupakan bagian dari produk inti, bukan sekadar
dokumentasi tambahan.

Halaman tersebut minimal memuat:

1.  tujuan dan cakupan Telusurin;
2.  daftar indikator yang digunakan;
3.  definisi dan satuan setiap indikator;
4.  sumber, URL, dan tanggal pengambilan;
5.  periode dan cakupan geografis;
6.  status verifikasi dan ketentuan penggunaan;
7.  penjelasan perhitungan selisih, rata-rata, dan peringkat;
8.  aturan penanganan nilai kosong;
9.  aturan pembentukan insight;
10. keterbatasan perbandingan;
11. tanggal pembaruan data;
12. versi dataset atau catatan perubahan.

Jika data dari beberapa publikasi digabungkan, dokumentasikan
transformasi yang dilakukan dan alasan data dianggap sebanding.

---

## 13. Ekspor data

Fitur ekspor CSV ditargetkan untuk tahap final.

CSV harus mengikuti indikator, periode, dan daerah yang dipilih;
menyertakan identitas indikator dan daerah, tahun, nilai, satuan, status
data, referensi sumber, dan tanggal pengambilan; mempertahankan nilai
kosong sebagai nilai kosong; serta menggunakan format yang konsisten dan
didokumentasikan.

Jika filter menghasilkan nol baris, berikan pesan yang jelas dan jangan
menghasilkan file yang menyesatkan.

---

## 14. Kebutuhan nonfungsional

### 14.1 Aksesibilitas

Target internal:

-   Lighthouse Accessibility minimal 90 pada halaman utama dan dashboard;
-   seluruh kontrol utama dapat digunakan dengan keyboard;
-   label form dan filter dapat dipahami pembaca layar;
-   kontras teks memenuhi WCAG 2.2 AA sejauh dapat diverifikasi;
-   grafik memiliki ringkasan teks atau tabel data pendamping;
-   status tidak dibedakan hanya melalui warna;
-   fokus keyboard terlihat.

Skor otomatis tidak menggantikan pemeriksaan aksesibilitas manual.

### 14.2 Performa

Target internal:

-   Lighthouse Performance minimal 80 pada halaman utama dan dashboard;
-   data MVP dibaca dari berkas lokal atau mekanisme sederhana;
-   hindari dependensi, animasi, dan visualisasi yang tidak memberi nilai nyata;
-   tidak ada permintaan jaringan yang tidak diperlukan untuk menampilkan data inti.

Catat kondisi pengujian agar hasil dapat dibandingkan.

### 14.3 Keandalan, keamanan, dan privasi

-   Validasi data dilakukan sebelum build atau melalui perintah validasi
    khusus.
-   Kegagalan validasi data harus menghasilkan pesan yang bisa
    ditindaklanjuti.
-   Build produksi tidak boleh menerima data contoh.
-   Parameter URL harus divalidasi.
-   Error tidak boleh ditutupi dengan angka default yang tampak valid.
-   Jangan mengumpulkan informasi pribadi yang tidak diperlukan.
-   Jangan menaruh token, API key, atau kredensial dalam repository.
-   Pastikan URL eksternal yang ditampilkan berasal dari metadata sumber
    yang telah diperiksa.

---

## 15. Arsitektur dan batas implementasi

Stack yang direncanakan:

-   Next.js App Router;
-   React dan TypeScript strict;
-   Tailwind CSS;
-   komponen UI yang diperlukan dari shadcn/ui;
-   Lucide untuk ikon;
-   Recharts atau SVG sederhana untuk grafik;
-   Zod untuk validasi runtime;
-   JSON untuk penyimpanan dataset MVP;
-   Vitest untuk unit test;
-   Playwright untuk smoke test bila waktu memungkinkan;
-   ESLint dan Prettier;
-   GitHub Actions untuk pemeriksaan otomatis jika telah dikonfigurasi;
-   Vercel untuk deployment jika tersedia dan berhasil diverifikasi.

Versi dependensi harus dipastikan saat inisialisasi proyek dan dikunci
melalui lockfile.

### 15.1 Batas arsitektur

Jangan menambahkan database, ORM, autentikasi, API publik, sistem ETL
terjadwal, atau infrastruktur kompleks tanpa kebutuhan MVP yang jelas.

Logika domain untuk validasi data, perhitungan, dan insight harus
dipisahkan dari komponen UI agar dapat diuji tanpa browser.

### 15.2 Kualitas kode

Sebelum perubahan masuk ke branch utama, jalankan lint, typecheck, unit
test, validasi dataset, dan build produksi sesuai konfigurasi proyek.
Jika sebuah pemeriksaan belum dikonfigurasi, dokumentasikan statusnya.
Jangan menulis bahwa pemeriksaan lulus jika belum dijalankan.

---

## 16. Kriteria penerimaan produk

### 16.1 Integritas data

-   [ ] Semua angka produksi dapat ditelusuri ke sumber.
-   [ ] Setiap angka memiliki satuan, periode, dan status yang sesuai.
-   [ ] Tidak ada nilai rekaan atau data contoh yang masuk ke produksi.
-   [ ] Nilai kosong tidak diganti nol.
-   [ ] Definisi indikator dan satuan konsisten dengan sumber.
-   [ ] Pemeriksaan sampel dilakukan oleh dua anggota berbeda.
-   [ ] Perbedaan sumber atau transformasi yang relevan terdokumentasi.

### 16.2 Fungsionalitas

-   [ ] Filter indikator, daerah, dan tahun bekerja sesuai cakupan
    dataset.
-   [ ] Grafik dan tabel mencerminkan filter yang sama.
-   [ ] URL merepresentasikan pilihan yang aktif.
-   [ ] Parameter URL yang tidak valid ditangani dengan aman.
-   [ ] Pengguna dapat membuka sumber data.
-   [ ] Insight menampilkan bukti dan metode hitung.
-   [ ] CSV sesuai filter jika fitur ekspor telah dirilis.

### 16.3 Pengalaman pengguna

-   [ ] Landing page menjelaskan tujuan dan cakupan data aktual.
-   [ ] Dashboard dapat digunakan pada desktop dan ponsel.
-   [ ] Tabel tersedia sebagai alternatif untuk memahami grafik.
-   [ ] Status data dan keterbatasan interpretasi mudah ditemukan.
-   [ ] Tidak ada elemen interaktif utama yang tidak berfungsi.
-   [ ] Tidak ada halaman kosong tanpa penjelasan.

### 16.4 Kualitas teknis

-   [ ] Lint lulus.
-   [ ] Typecheck lulus.
-   [ ] Unit test lulus.
-   [ ] Validasi data lulus.
-   [ ] Build produksi lulus.
-   [ ] Smoke test alur utama lulus jika telah dikonfigurasi.
-   [ ] Tidak ada error kritis yang diketahui pada alur demo.

---

## 17. Metrik keberhasilan

Target berikut adalah target internal, bukan klaim dampak sosial.

| Metrik | Target | Metode |
| --- | --- | --- |
| Pengguna dapat menemukan nilai suatu daerah untuk indikator dan tahun tertentu | Minimal 4 dari 5 penguji | Pengujian tugas |
| Pengguna dapat menjelaskan arah perubahan dan sumber data | Minimal 4 dari 5 penguji | Pengujian tugas |
| Pengguna memahami bahwa perbedaan nilai bukan otomatis bukti sebab-akibat | Minimal 4 dari 5 penguji | Pertanyaan setelah penggunaan |
| Angka tanpa satuan, periode, atau status yang diwajibkan | 0 pada audit tampilan | Pemeriksaan manual dan test |
| Ketidakcocokan pada sampel nilai yang diperiksa | 0 ketidakcocokan yang belum dijelaskan | Pencocokan dengan sumber |
| Insight yang tidak dapat ditelusuri ke nilai dasar | 0 | Unit test |
| Pemeriksaan kode dan build yang diwajibkan | Semua lulus | Catatan hasil perintah |
| Lighthouse Accessibility | Minimal 90 | Pengujian halaman produksi |
| Lighthouse Performance | Minimal 80 | Pengujian halaman produksi |

Untuk uji pengguna, gunakan 3–5 orang jika memungkinkan. Catat jumlah
peserta, tugas, hasil, dan masalah yang ditemukan. Jangan menyimpulkan
bahwa produk berhasil untuk semua pengguna hanya berdasarkan sampel
kecil.

---

## 18. Jadwal pengerjaan

Jadwal berikut adalah rencana kerja dan harus disesuaikan dengan progres
aktual.

| Tanggal | Target |
| --- | --- |
| 25–26 Oktober | Tentukan wilayah, audit sumber, pilih indikator yang layak, buat repository dan validasi data awal |
| 27 Oktober | Implementasikan fondasi visual dan landing page |
| 28–30 Oktober | Implementasikan dashboard, filter, grafik, tabel, dan status data |
| 31 Oktober | Uji alur utama, lengkapi README, screenshot, dan PDF First Draft |
| 1 November | Pengumpulan First Draft |
| 2–4 November | Tinjau masukan mentor dan tentukan revisi prioritas |
| 5–8 November | Selesaikan insight berbasis aturan dan metodologi |
| 9–11 November | Selesaikan ekspor CSV, responsif, aksesibilitas, dan pencarian jika memungkinkan |
| 12–13 November | Uji pengguna, perbaiki masalah prioritas |
| 14 November | Audit data dan fitur, deployment, dokumentasi final |
| 15 November | Buffer untuk masalah yang tersisa |
| 16 November | Pengumpulan final |

### 18.1 Aturan prioritas ketika terlambat

Jika waktu tidak cukup, prioritaskan menurut urutan ini:

1.  integritas dan kelengkapan metadata data;
2.  alur utama dashboard;
3.  grafik dan tabel yang benar;
4.  sumber serta metodologi;
5.  insight yang dapat diverifikasi;
6.  responsivitas dan aksesibilitas;
7.  ekspor dan fitur tambahan.

Kurangi jumlah indikator atau fitur jika diperlukan. Jangan mengorbankan
validitas data untuk mengejar kuantitas.

---

## 19. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Data resmi tidak tersedia untuk cukup banyak daerah atau tahun | Cakupan produk terlalu kecil | Audit data lebih awal dan tetapkan fallback |
| Definisi indikator berbeda antarsumber | Perbandingan menyesatkan | Verifikasi definisi dan dokumentasikan keputusan |
| Angka tidak cocok dengan publikasi sumber | Kepercayaan pengguna turun | Validasi otomatis dan pemeriksaan sampel manual |
| Produk terasa seperti dashboard generik | Nilai pembeda tidak terlihat | Jadikan keterlacakan, status, dan dasar hitung bagian inti UI |
| Grafik terlalu padat | Sulit dibaca | Batasi jumlah daerah yang disorot dan sediakan tabel |
| Pengguna menyimpulkan sebab-akibat | Risiko salah interpretasi | Gunakan bahasa netral dan tampilkan batas interpretasi |
| Timeline terlalu ketat | Fitur inti tidak selesai | Bekukan scope MVP dan prioritaskan Must |
| Pengujian hanya dilakukan oleh tim | Masalah penggunaan tidak ditemukan | Uji kepada calon pengguna di luar tim |
| Persyaratan final kompetisi belum jelas | Berkas pengumpulan tidak sesuai | Verifikasi panduan resmi dan catat konfirmasi |
| Ketentuan penggunaan data tidak jelas | Risiko atribusi atau penggunaan yang tidak tepat | Periksa ketentuan sumber sebelum publikasi |

---

## 20. Keaslian karya dan atribusi

-   Kode, konten, desain, dan keputusan produk harus dapat dijelaskan
    oleh anggota tim.
-   Referensi eksternal dicatat dalam `docs/references.md`.
-   Pustaka, komponen, dan font digunakan sesuai lisensinya.
-   Data dan klaim dari publikasi eksternal mencantumkan atribusi yang
    sesuai.
-   Jangan menyalin proyek atau desain pihak lain tanpa izin.
-   Penggunaan alat bantu pengembangan harus mengikuti ketentuan
    kompetisi yang telah diverifikasi.
-   Catat kontribusi anggota tim secara jujur.

---

## 21. Struktur dokumentasi yang disarankan

Jangan membuat file Markdown hanya untuk menambah jumlah dokumentasi.
Setiap file harus memiliki fungsi dan pemilik yang jelas.

``` text
Telusurin/
├── README.md
├── prd.md
├── design.md
├── spec.md
└── docs/
    ├── data-dictionary.md
    ├── data-sources.md
    ├── methodology.md
    ├── validation-report.md
    ├── user-testing.md
    ├── references.md
    ├── decisions/
    │   └── README.md
    └── clarifications/
        └── README.md
```

Fungsi dokumen:

-   `prd.md`: masalah, pengguna, tujuan, scope, fitur, dan kriteria
    penerimaan.
-   `design.md`: arah visual, layout, tipografi, komponen,
    responsivitas, dan aksesibilitas.
-   `spec.md`: arsitektur, struktur data, kontrak fungsi, validasi,
    perhitungan, dan pengujian.
-   `data-dictionary.md`: definisi dan satuan indikator.
-   `data-sources.md`: sumber, URL, periode, tanggal pengambilan,
    status, dan ketentuan penggunaan.
-   `methodology.md`: metode perhitungan, insight, asumsi, dan
    keterbatasan.
-   `validation-report.md`: hasil pemeriksaan data dan sampel yang
    benar-benar dilakukan.
-   `user-testing.md`: tugas, peserta, hasil, temuan, dan perubahan
    produk.
-   `references.md`: referensi desain, teknis, dan pustaka eksternal.
-   `decisions/`: keputusan penting yang memiliki beberapa alternatif.
-   `clarifications/`: konfirmasi tertulis terkait ketentuan kompetisi.

Dokumentasi boleh digabung jika isinya masih sedikit. Hindari duplikasi
yang membuat dua dokumen memiliki versi berbeda.

---

## 22. Keputusan terbuka

-   [ ] Provinsi dan cakupan kabupaten/kota.
-   [ ] Daftar indikator final setelah audit data.
-   [ ] Periode data final.
-   [ ] URL dan ketentuan penggunaan setiap sumber.
-   [ ] Nama anggota, keahlian, dan pembagian tanggung jawab.
-   [ ] Lisensi repository.
-   [ ] Persyaratan final kompetisi yang telah dikonfirmasi.
-   [ ] Nama tim dan format berkas final.
-   [ ] URL deployment.
-   [ ] Hasil validasi masalah dari calon pengguna.
-   [ ] Hasil pengujian pengguna dan revisi berdasarkan temuannya.

Setiap keputusan harus memiliki pemilik dan tenggat. Keputusan yang
belum ditentukan tidak boleh diisi dengan asumsi tersembunyi.

---

## 23. Definisi selesai

Telusurin dianggap siap untuk pengumpulan final ketika:

1.  cakupan data dan indikator dinyatakan dengan jujur;
2.  sumber dan metadata dapat ditelusuri;
3.  tidak ada data contoh yang bercampur dengan data produksi;
4.  dashboard menyelesaikan alur pengguna utama;
5.  tabel dan grafik menyajikan nilai yang konsisten;
6.  insight dapat diperiksa melalui nilai dasar dan rumus;
7.  metodologi serta keterbatasan tersedia;
8.  pengujian teknis yang diwajibkan lulus;
9.  uji pengguna dilakukan dan temuannya didokumentasikan;
10. README, screenshot, PDF, dan berkas lain memenuhi persyaratan
    kompetisi yang telah diverifikasi;
11. deployment dapat diakses jika tautan demo menjadi bagian dari
    pengumpulan;
12. semua klaim tentang fitur, data, dan hasil pengujian sesuai kondisi
    sebenarnya.

**Prinsip penutup:** lebih baik memiliki empat indikator yang valid,
dapat ditelusuri, dan mudah dipahami daripada enam indikator dengan
cakupan atau definisi yang meragukan. Keberhasilan Telusurin ditentukan
oleh kepercayaan dan kegunaan produknya, bukan banyaknya fitur.
