import { useEffect, useState } from 'react'
import { ApprovalItem } from '../types'
import { fetchApprovalItems } from '../services/approval'

type UseApprovalItemsResult = {
  items: ApprovalItem[]
  loading: boolean
  error: string | null
  cabangFilter: string
  setCabangFilter: (value: string) => void
  loadData: (forceRefresh?: boolean) => Promise<void>
}

export function useApprovalItemsWithCabangFilter(defaultErrorMessage: string): UseApprovalItemsResult {
  const [items, setItems] = useState<ApprovalItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cabangFilter, setCabangFilter] = useState('')
  const [dataCache, setDataCache] = useState<Record<string, ApprovalItem[]>>({})

  const loadData = async (forceRefresh = false) => {
    if (!forceRefresh && dataCache[cabangFilter] !== undefined) {
      setItems(dataCache[cabangFilter])
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await fetchApprovalItems(cabangFilter)
      setItems(data)
      setDataCache((prev) => ({
        ...prev,
        [cabangFilter]: data,
      }))
    } catch (e) {
      setError(defaultErrorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [cabangFilter])

  return {
    items,
    loading,
    error,
    cabangFilter,
    setCabangFilter,
    loadData,
  }
}