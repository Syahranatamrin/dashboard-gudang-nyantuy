# Perbaikan Filter Konfirmasi Peralatan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Memastikan item peralatan approved tetap muncul saat status finance valid dan verifikasi SPV masih kosong atau bernilai false-like.

**Architecture:** Perbaikan difokuskan pada normalisasi data response webhook di util `normalizePeralatan.ts` tanpa mengubah endpoint, route, atau UI. Logika filter dibuat lebih toleran terhadap spasi dan nilai kosong dari Sheet/n8n, tetapi tetap menahan item yang sudah diverifikasi.

**Tech Stack:** React, TypeScript, Vite

---

### Task 1: Longgarkan normalisasi data peralatan

**Files:**
- Modify: `d:\Projects\dashboard-gudang-nyantuy\dashboard-gudang-nyantuy-main\src\utils\normalizePeralatan.ts`

- [ ] **Step 1: Perbaiki filter status finance dan verifikasi SPV**

```ts
const statusApproval = String(item['Status Approval Finance'] ?? '').trim().toLowerCase()
const rawVerifikasi = item['Verifikasi SPV']
const verifikasi = String(rawVerifikasi ?? '').trim().toLowerCase()
const statusOk = statusApproval === 'terima'
const verifFalse =
  rawVerifikasi == null ||
  verifikasi === '' ||
  rawVerifikasi === false ||
  verifikasi === 'false' ||
  rawVerifikasi === 0 ||
  verifikasi === '0'
```

- [ ] **Step 2: Pastikan mapping boolean tetap konsisten**

```ts
verifikasi_spv:
  item['Verifikasi SPV'] === true ||
  String(item['Verifikasi SPV'] ?? '').trim().toLowerCase() === 'true',
```

- [ ] **Step 3: Jalankan build untuk verifikasi**

Run: `npm run build`  
Expected: build sukses tanpa error TypeScript atau Vite.
