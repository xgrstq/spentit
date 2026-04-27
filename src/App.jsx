import { useState } from "react"
import { useAuth } from "./hooks/useAuth"

import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Wallets from "./pages/Wallets"
import WalletDetail from "./pages/WalletDetail"

function App() {
  const { user, loading } = useAuth()

  const [page, setPage] = useState("dashboard")
  const [selectedWallet, setSelectedWallet] = useState(null)

  if (loading) return <p>Loading...</p>

  if (!user) return <Auth />

  if (page === "wallets") {
    return (
      <Wallets
        setPage={setPage}
        setSelectedWallet={setSelectedWallet}
      />
    )
  }

  if (page === "walletDetail") {
    return (
      <WalletDetail
        wallet={selectedWallet}
        setPage={setPage}
      />
    )
  }

  return <Dashboard setPage={setPage} />
}

export default App