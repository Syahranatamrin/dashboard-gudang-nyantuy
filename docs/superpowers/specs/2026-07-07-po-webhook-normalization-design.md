# Perbaikan Normalisasi Webhook PO SPV

## Tujuan
- Menyesuaikan frontend dengan struktur response webhook PO SPV yang sebenarnya agar item PO yang valid tampil di dashboard konfirmasi.

## Masalah Saat Ini
- Webhook mengirim field uppercase seperti `VERIFIKASI FINANCE`, `VERIFIKASI SPV OUTLET`, `JUMLAH BARANG`, dan `SATUAN BARANG`.
- Frontend masih membaca key lama seperti `VerifikasiFinance`, `VerifikasiSPV`, `JUMLAH`, dan `SATUAN`.
- Response webhook tidak selalu menyertakan field outlet, sehingga filter outlet di dashboard membuang semua item.

## Perubahan Yang Diusulkan
- Di `src/utils/normalizePO.ts`:
  - Baca status finance dari key lama dan key uppercase webhook.
  - Baca verifikasi SPV dari `VERIFIKASI SPV OUTLET` selain key lama.
  - Mapping jumlah/satuan/harga dari field webhook aktual (`JUMLAH BARANG`, `SATUAN BARANG`, `HARGA PERBARANG`, `TOTAL HARGA PERBARANG`).
- Di `src/components/spv/PODashboard.tsx`:
  - Jika item memiliki `outlet`, tetap lakukan filter by outlet.
  - Jika item tidak memiliki `outlet`, jangan buang item karena diasumsikan webhook sudah memfilter berdasarkan query.

## Dampak
- Item dengan `VERIFIKASI FINANCE = Terima` dan `VERIFIKASI SPV OUTLET = false` tampil di dashboard.
- Data PO tetap kompatibel dengan format lama bila webhook berubah kembali.
- UI dan route tidak berubah.

## Kriteria Sukses
- Dashboard PO menampilkan item yang valid dari webhook aktif.
- Item yang sudah diverifikasi SPV tetap tidak muncul.
- Build frontend tetap sukses.
