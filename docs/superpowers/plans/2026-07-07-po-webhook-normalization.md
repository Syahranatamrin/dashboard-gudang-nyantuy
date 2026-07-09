# Perbaikan Normalisasi Webhook PO SPV Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menampilkan item PO valid dari webhook SPV meskipun format field response berbeda dari asumsi frontend sebelumnya.

**Architecture:** Perubahan difokuskan pada adaptasi pembacaan response webhook di util normalisasi dan sedikit pelonggaran filter outlet di dashboard. Pendekatan ini menjaga UI, endpoint, dan route tetap sama sambil membuat frontend kompatibel dengan format webhook aktual.

**Tech Stack:** React, TypeScript, Vite

---

### Task 1: Sesuaikan pembacaan response webhook PO

**Files:**
- Modify: `d:\Projects\dashboard-gudang-nyantuy\dashboard-gudang-nyantuy-main\src\utils\normalizePO.ts`
- Modify: `d:\Projects\dashboard-gudang-nyantuy\dashboard-gudang-nyantuy-main\src\components\spv\PODashboard.tsx`

- [ ] **Step 1: Perluas key finance dan verifikasi SPV**

```ts
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
```

- [ ] **Step 2: Mapping field PO sesuai webhook aktual**

```ts
outlet: String(item.outlet ?? item.Outlet ?? item['OUTLET'] ?? ''),
jumlah_po: Number(item['JUMLAH BARANG'] ?? item['JUMLAH'] ?? item.jumlah_po ?? 0),
harga_satuan: Number(item['HARGA PERBARANG'] ?? item['HARGA'] ?? item.harga_satuan ?? 0),
total_harga: Number(item['TOTAL HARGA PERBARANG'] ?? item['TOTAL HARGA'] ?? item.total_harga ?? 0),
satuan: String(item['SATUAN BARANG'] ?? item['SATUAN'] ?? item.satuan ?? ''),
```

- [ ] **Step 3: Jangan buang item jika outlet kosong**

```ts
const filtered = data.filter(item => {
  const itemOutlet = String(item.outlet ?? '').trim().toLowerCase()
  const activeOutlet = String(outlet).trim().toLowerCase()
  return !itemOutlet || itemOutlet === activeOutlet
})
```

- [ ] **Step 4: Verifikasi dengan build**

Run: `npm run build`  
Expected: build sukses tanpa error.
