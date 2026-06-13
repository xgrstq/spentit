import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"

import {
  getWallets,
  createWallet,
  updateWallet,
  deleteWallet,
} from "../services/walletService"

import Topbar from "../components/layout/Topbar"

function Wallets({
  setPage,
  setSelectedWallet,
}) {
  const { user, logout } = useAuth()

  const [wallets, setWallets] = useState([])

  const [name, setName] = useState("")

  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState("")

  const [loading, setLoading] = useState(true)

  const fetchWalletsData = async () => {
    if (!user) return

    setLoading(true)

    const { data } = await getWallets(user.id)

    setWallets(data || [])

    setLoading(false)
  }

  useEffect(() => {
    fetchWalletsData()
  }, [user])

  const handleCreate = async () => {
    if (!name.trim()) return

    await createWallet(name, user.id)

    setName("")

    fetchWalletsData()
  }

  const handleUpdate = async (id) => {
    if (!editName.trim()) return

    await updateWallet(id, editName)

    setEditingId(null)

    fetchWalletsData()
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this wallet?"
    )

    if (!confirmDelete) return

    await deleteWallet(id)

    fetchWalletsData()
  }

  if (!user) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f6f4] flex items-center justify-center">
        <p className="text-sm text-[#86958c] font-mono">
          Loading wallets...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f6f4] text-[#2c3531] px-5 py-5 md:px-10 relative">

      {/* 🌫️ BACKGROUND */}
      <div className="fixed top-[-120px] right-[-120px] w-[300px] h-[300px] bg-[#dfe6df] blur-[120px] rounded-full opacity-70 pointer-events-none" />

      <div className="fixed bottom-[-100px] left-[-80px] w-[260px] h-[260px] bg-[#e8ece8] blur-[120px] rounded-full opacity-80 pointer-events-none" />

      {/* 🌿 CONTAINER */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* 🟢 TOPBAR */}
        <Topbar
          currentPage="wallets"
          setPage={setPage}
          logout={logout}
        />

        {/* 🟢 HERO */}
        <section className="mb-8">

          <p className="text-[11px] uppercase tracking-[0.25em] text-[#86958c] font-mono mb-3">
            Wallet Workspace
          </p>

          <h1 className="text-3xl md:text-5xl tracking-tight text-[#1a221f] leading-[1.1] mb-4">
            Organize your money
            <span className="italic font-serif text-[#4f5d56]">
              {" "}with clarity.
            </span>
          </h1>

          <p className="text-sm text-[#606f66] leading-relaxed max-w-2xl">
            Separate balances, manage different spending spaces,
            and keep every financial flow intentionally structured.
          </p>

        </section>

        {/* 🟢 CREATE WALLET */}
        <section className="bg-white border border-[#e1e6e1] rounded-[32px] p-6 md:p-7 shadow-[0_20px_50px_rgba(45,58,52,0.03)] mb-6">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Create a new wallet..."
              className="flex-1 bg-[#f7f9f7] border border-[#e5ebe5] rounded-2xl px-5 py-3 outline-none text-sm placeholder:text-[#98a59d] focus:border-[#b8c5bc] transition-all duration-200"
            />

            <button
              onClick={handleCreate}
              className="bg-[#2d3a34] hover:bg-[#1f2924] text-[#f4f6f4] px-6 py-3 rounded-2xl text-sm transition-all duration-200 active:scale-[0.98]"
            >
              Create Wallet
            </button>

          </div>

        </section>

        {/* 🟢 WALLET GRID */}
        {wallets.length === 0 ? (

          <div className="bg-white border border-[#e1e6e1] rounded-[32px] p-10 text-center shadow-[0_20px_50px_rgba(45,58,52,0.03)]">

            <p className="text-[#86958c] text-sm">
              No wallets created yet.
            </p>

          </div>

        ) : (

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {wallets.map((wallet) => (

              <div
                key={wallet.id}
                className="group bg-white border border-[#e1e6e1] rounded-[30px] p-6 shadow-[0_20px_50px_rgba(45,58,52,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(45,58,52,0.06)] transition-all duration-300"
              >

                {editingId === wallet.id ? (

                  <>

                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-[#f7f9f7] border border-[#e5ebe5] rounded-2xl px-4 py-3 outline-none text-sm mb-4"
                    />

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() => handleUpdate(wallet.id)}
                        className="bg-[#2d3a34] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#1f2924] transition-all duration-200"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingId(null)}
                        className="text-sm text-[#86958c] hover:text-[#1a221f] transition-colors duration-200"
                      >
                        Cancel
                      </button>

                    </div>

                  </>

                ) : (

                  <>

                    {/* TOP */}
                    <div className="flex items-start justify-between mb-8">

                      <div>

                        <p className="text-[11px] uppercase tracking-[0.25em] text-[#86958c] font-mono mb-3">
                          Personal Wallet
                        </p>

                        <h3 className="text-2xl tracking-tight text-[#1a221f]">
                          {wallet.name}
                        </h3>

                      </div>

                      <div className="w-2 h-2 rounded-full bg-[#4f5d56] opacity-60 mt-2 group-hover:opacity-100 transition-all duration-300" />

                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center justify-between">

                      <button
                        onClick={() => {
                          setSelectedWallet(wallet)
                          setPage("walletDetail")
                        }}
                        className="text-sm text-[#2d3a34] hover:text-[#1f2924] transition-colors duration-200"
                      >
                        Open Workspace →
                      </button>

                      <div className="flex items-center gap-4">

                        <button
                          onClick={() => {
                            setEditingId(wallet.id)
                            setEditName(wallet.name)
                          }}
                          className="text-sm text-[#86958c] hover:text-[#1a221f] transition-colors duration-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(wallet.id)}
                          className="text-sm text-[#86958c] hover:text-[#a14646] transition-colors duration-200"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </>

                )}

              </div>

            ))}

          </section>

        )}

      </div>

    </div>
  )
}

export default Wallets