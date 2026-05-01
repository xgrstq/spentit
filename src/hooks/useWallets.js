import { useEffect, useState } from "react"
import {
  getWallets,
  createWallet,
  updateWallet,
  deleteWallet,
} from "../services/walletService"

export function useWallets(user) {
  const [wallets, setWallets] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchWallets = async () => {
    if (!user) return

    setLoading(true)

    const { data } = await getWallets(user.id)
    setWallets(data || [])

    setLoading(false)
  }

  useEffect(() => {
    if (user) fetchWallets()
  }, [user])

  const create = async (name) => {
    if (!name) return
    await createWallet(name, user.id)
    fetchWallets()
  }

  const update = async (id, name) => {
    await updateWallet(id, name)
    fetchWallets()
  }

  const remove = async (id) => {
    await deleteWallet(id)
    fetchWallets()
  }

  return {
    wallets,
    loading,
    create,
    update,
    remove,
    refetch: fetchWallets,
  }
}