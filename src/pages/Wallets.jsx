import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../hooks/useAuth"

function Wallets({ setPage, setSelectedWallet }) {
  const { user } = useAuth()
  const [wallets, setWallets] = useState([])
  const [name, setName] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState("")

  const fetchWallets = async () => {
    if (!user) return

    const { data } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setWallets(data || [])
  }

  useEffect(() => {
    fetchWallets()
  }, [user])

  const handleCreate = async () => {
    if (!name) return

    await supabase.from("wallets").insert([
      { name, user_id: user.id },
    ])

    setName("")
    fetchWallets()
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-md md:max-w-4xl p-4 md:p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setPage("dashboard")}
            className="text-sm text-gray-400"
          >
            ← Back
          </button>

          <h1 className="text-xl font-semibold">Wallets 💼</h1>
        </div>

        {/* CREATE */}
        <div className="mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Wallet name..."
            className="w-full p-3 mb-2 bg-[#0a0a0a] border border-[#1f1f1f] rounded focus:border-emerald-500 outline-none"
          />

          <button
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 p-3 rounded text-sm transition"
          >
            Create Wallet
          </button>
        </div>

        {/* LIST */}
        {wallets.map((w) => (
          <div
            key={w.id}
            className="p-4 bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[#1f1f1f] rounded-xl mb-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >

            {editingId === w.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full mb-2 p-2 bg-[#000] border border-[#222] rounded outline-none"
                />

                {/* 🔥 FIX BUTTON GAP */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={async () => {
                      await supabase
                        .from("wallets")
                        .update({ name: editName })
                        .eq("id", w.id)

                      setEditingId(null)
                      fetchWallets()
                    }}
                    className="px-3 py-1 bg-emerald-600 rounded text-sm hover:bg-emerald-500"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-[#222] rounded text-sm text-gray-300 hover:bg-[#2a2a2a]"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">

                {/* CLICK DETAIL */}
                <div
                  onClick={() => {
                    setSelectedWallet(w)
                    setPage("walletDetail")
                  }}
                  className="cursor-pointer hover:text-emerald-400 transition"
                >
                  {w.name}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(w.id)
                      setEditName(w.name)
                    }}
                    className="text-blue-400 text-sm hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      await supabase
                        .from("wallets")
                        .delete()
                        .eq("id", w.id)

                      fetchWallets()
                    }}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>

              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  )
}

export default Wallets