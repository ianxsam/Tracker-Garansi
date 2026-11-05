# Garansi Desk

Aplikasi web statis berbahasa Indonesia untuk memantau garansi laptop baru dan second. Desain flat responsif tanpa font, CDN, atau layanan backend eksternal. Dibangun dari source unggahan Tracker Garansi Pembelian.

## Jalankan lokal

Butuh Node.js 24 dan npm untuk tooling pengembangan; aplikasi yang dipublikasikan tidak memerlukan Node.js.

```sh
npm ci
npm start
```

Buka server lokal pada port 8000. Untuk menjalankan tanpa tooling Node.js, gunakan `python -m http.server 8000` dari direktori aplikasi. Gunakan HTTP/HTTPS agar IndexedDB dan API browser bekerja konsisten.

## Build dan test

```sh
npx playwright install --with-deps chromium
npm test
npm run build
```

Build menghasilkan `dist/` berisi HTML, CSS, JavaScript dan `.nojekyll`. Semua aset menggunakan path relatif sehingga mendukung subpath GitHub Pages (`/Tracker-Garansi/`). Jika Chromium sudah tersedia, gunakan `CHROMIUM_PATH=/usr/bin/chromium npm test` sebagai alternatif download browser. Enam pengujian browser mencakup desktop dan mobile: CRUD, status, persistensi, kategori, pencarian, filter, backup/restore, impor invalid atomik, CSV aman, keyboard, dan layout.

## Publikasi ke GitHub Pages

1. Upload seluruh source proyek (termasuk `.github/workflows/pages.yml`, `package.json`, dan `package-lock.json`) ke branch `main` repository `ianxsam/Tracker-Garansi`.
2. Di GitHub, buka **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push ke `main` atau jalankan **Actions → Test and deploy GitHub Pages → Run workflow**.
4. Workflow menjalankan test dahulu. Build dan deploy hanya dilanjutkan jika test lulus. URL hasil publikasi tampil pada job deployment.

Alternatif upload manual: salin isi `dist/` ke root branch yang dipilih pada Settings → Pages → Deploy from a branch. Jangan upload data backup pelanggan, `node_modules`, atau file `.git` dari arsip unggahan.

Workflow sudah disiapkan; keberhasilan pengujian lokal bukan bukti deployment online telah dilakukan.

## Alur penggunaan

Pilih Laptop Baru atau Laptop Second, lalu **Catat unit masuk**. Buka nama unit untuk memperbarui detail, status dan konfirmasi marketing. Pemilihan status langsung menyimpan detail form saat itu; tombol Simpan menyimpan edit detail lain. Dashboard menampilkan maksimal delapan kasus yang perlu perhatian; **Semua kasus** menampilkan seluruh data sesuai filter.

Laptop Baru: Barang masuk → Dalam pengecekan teknisi → Menunggu dikirim ke Service Center → Unit di Service Center → Kembali ke toko → Selesai. Laptop Second menggunakan Supplier Second pada tahap pengiriman dan perbaikan.

## Penyimpanan dan backup

- Data disimpan di IndexedDB browser, terpisah per origin dan profil browser. Tidak ada sinkronisasi antarperangkat atau akun tim.
- Gunakan **Backup & ekspor → Unduh backup** secara berkala. Membersihkan data browser dapat menghapus seluruh catatan.
- Pulihkan JSON untuk menggabungkan data. ID yang sama diperbarui oleh backup. Seluruh file divalidasi sebelum transaksi impor; file tidak valid tidak mengubah data. Batas ukuran impor 10 MB.
- Ekspor CSV mendukung laporan bulan masuk atau semua periode dan melindungi awalan formula spreadsheet.
- Backup JSON versi source lama tetap didukung jika berisi model, tanggal masuk dan status yang valid.
- Berpindah dari localhost ke GitHub Pages tidak memindahkan data otomatis. Ekspor dari origin lama lalu impor di origin baru.
- Simpan backup berisi informasi pelanggan di lokasi yang aman. GitHub Pages melayani source aplikasi secara publik, sedangkan data yang diketik tidak diunggah oleh aplikasi.
