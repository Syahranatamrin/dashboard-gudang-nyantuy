# Admin Warehouse Dashboard Labels

## Tujuan
- Mengganti label tampilan untuk modul `spv` agar user-facing copy menggunakan “Admin Warehouse” tanpa mengubah route, folder, atau key role yang ada.

## Lingkup
- Hanya perubahan teks/label UI.
- Tidak mengubah `href`/routing (tetap `/spv/home`).
- Tidak mengubah role key (`spv`) dan struktur folder `src/**/spv`.

## Perubahan
- Home page
  - Role label `spv`: “Supervisor (SPV)” → “Admin Warehouse”.
  - Kartu menu `spv`
    - Title: “SPV Dashboard” → “Admin Warehouse Dashboard”.
    - Subtitle: “Pilih outlet dan akses menu SPV” → “Pilih outlet dan akses menu Admin Warehouse”.
- Halaman pemilihan outlet (modul `spv`)
  - Heading: “SPV Dashboard” → “Admin Warehouse Dashboard”.

## Kriteria Sukses
- Home page menampilkan “Login sebagai Admin Warehouse …”.
- Kartu menu menampilkan “Admin Warehouse Dashboard” dan tetap menuju `/spv/home`.
- Halaman pemilihan outlet menampilkan heading “Admin Warehouse Dashboard”.
