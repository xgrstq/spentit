import { useEffect, useState } from "react"
import {
  getTransactions,
  getTransactionsByWallet,
} from "../services/transactionService"

export function useTransactions(user, walletId = null) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    if (!user) return

    setLoading(true)

    const res = walletId
      ? await getTransactionsByWallet(user.id, walletId)
      : await getTransactions(user.id)

    setTransactions(res.data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (user) fetchData()
  }, [user, walletId])

  return {
    transactions,
    loading,
    refetch: fetchData,
  }
}