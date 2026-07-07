import { POItem } from '../types'

export const normalizePOList = (raw: any): POItem[] => {
  const arr = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.data) ? raw.data : [])
  return (arr as any[])
    .filter(item => {
      const statusFinance = String(
        item.VerifikasiFinance ??
        item['Verifikasi Finance'] ??
        item['Status Approval Finance'] ??
        item['VERIFIKASI FINANCE'] ??
        '',
      ).trim().toLowerCase()
      const rawVerifikasi =
        item.VerifikasiSPV ??
        item['VerifSPV'] ??
        item['Verifikasi SPV'] ??
        item['VERIFIKASI SPV OUTLET']
      const verifikasi = String(rawVerifikasi ?? '').trim().toLowerCase()
      const statusOk = statusFinance === 'terima'
      const verifFalse =
        rawVerifikasi == null ||
        verifikasi === '' ||
        rawVerifikasi === false ||
        verifikasi === 'false' ||
        rawVerifikasi === 0 ||
        verifikasi === '0'
      return statusOk && verifFalse
    })
    .map(item => ({
      id_transaksi: String(item['ID TRANSAKSI'] || item.id_transaksi || ''),
      nama_barang: String(item['NAMA BARANG'] || item.nama_barang || ''),
      outlet: String(item.outlet ?? item.Outlet ?? item['OUTLET'] ?? ''),
      jumlah_po: Number(item['JUMLAH BARANG'] ?? item['JUMLAH'] ?? item.jumlah_po ?? 0),
      harga_satuan: Number(item['HARGA PERBARANG'] ?? item['HARGA'] ?? item.harga_satuan ?? 0),
      total_harga: Number(item['TOTAL HARGA PERBARANG'] ?? item['TOTAL HARGA'] ?? item.total_harga ?? 0),
      supplier: String(item['NAMA SUPLIER'] ?? item.supplier ?? ''),
      id_barang: String(item['ID BARANG'] ?? item.id_barang ?? ''),
      satuan: String(item['SATUAN BARANG'] ?? item['SATUAN'] ?? item.satuan ?? ''),
      tanggal: String(item['TANGGAL PO'] ?? item.tanggal ?? ''),
      jenis: String(item['JENIS'] ?? item.Jenis ?? item.jenis ?? ''),
    }))
}
