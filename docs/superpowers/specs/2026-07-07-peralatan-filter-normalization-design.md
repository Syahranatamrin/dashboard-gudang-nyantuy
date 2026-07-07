# Perbaikan Filter Konfirmasi Peralatan

## Tujuan
- Membuat data peralatan yang valid tetap muncul di dashboard konfirmasi meskipun nilai dari Sheet atau n8n memiliki spasi tambahan atau kolom verifikasi SPV masih kosong.

## Masalah Saat Ini
- `Status Approval Finance` hanya dianggap valid jika persis sama dengan `terima` setelah `toLowerCase()`, tanpa `trim()`.
- `Verifikasi SPV` hanya dianggap belum diverifikasi jika nilainya `false`, `'false'`, `0`, atau `'0'`.
- Nilai kosong pada `Verifikasi SPV` dibuang, padahal secara bisnis masih bisa dianggap belum diverifikasi.

## Perubahan Yang Diusulkan
- Di `src/utils/normalizePeralatan.ts`:
  - Normalisasi `Status Approval Finance` dengan `trim().toLowerCase()`.
  - Perlakukan `Verifikasi SPV` kosong, `null`, atau `undefined` sebagai belum diverifikasi.
  - Tetap anggap nilai `true` sebagai sudah diverifikasi agar item yang sudah dikonfirmasi tidak muncul lagi.

## Dampak
- Baris dengan status `Terima`, `Terima `, atau variasi kapitalisasi tetap lolos.
- Baris dengan `Verifikasi SPV` kosong tetap tampil sebagai item yang menunggu konfirmasi.
- Filter outlet dan UI tidak berubah.

## Kriteria Sukses
- Dashboard peralatan menampilkan item approved yang sebelumnya tersembunyi akibat spasi atau nilai verifikasi kosong.
- Item yang sudah diverifikasi SPV tetap tidak muncul.
- Build frontend tetap sukses.
