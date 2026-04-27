import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../hooks/useAuth"

import TransactionList from "../components/ui/transaction/TransactionList"
import TransactionChart from "../components/ui/transaction/TransactionChart"

import { formatRupiah } from "../utils/format"

function Dashboard({ setPage }) {
  const { user, logout } = useAuth()
  const [transactions, setTransactions] = useState([])

  const fetchData = async () => {
    if (!user) return

    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setTransactions(data || [])
  }

  useEffect(() => {
    if (user) fetchData()
  }, [user])

  // 💰 SUMMARY
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0)

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  const balance = income - expense

  // 📊 CHART
  const groupedData = transactions.reduce((acc, t) => {
    const date = new Date(t.created_at).toLocaleDateString()

    if (!acc[date]) acc[date] = { income: 0, expense: 0 }

    if (t.type === "income") acc[date].income += t.amount
    else acc[date].expense += t.amount

    return acc
  }, {})

  const labels = Object.keys(groupedData)
  const incomeData = labels.map((d) => groupedData[d].income)
  const expenseData = labels.map((d) => groupedData[d].expense)

  if (!user) return null

  return (
    <div className="min-h-screen bg-black text-white flex justify-center relative overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

      {/* CONTAINER */}
      <div className="w-full max-w-md md:max-w-4xl p-4 md:p-8 relative z-10">

        {/* NAVBAR */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-4">
            <span className="text-emerald-400">Spentit</span> 💸
          </h1>

          <div className="flex bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-1 w-fit">

            <button
              onClick={() => setPage("dashboard")}
              className="px-4 py-1.5 text-sm rounded-md bg-emerald-600"
            >
              Dashboard
            </button>

            <button
              onClick={() => setPage("wallets")}
              className="px-4 py-1.5 text-sm text-gray-400 hover:text-white"
            >
              Wallets
            </button>

            <button
              onClick={logout}
              className="px-4 py-1.5 text-sm text-gray-400 hover:text-red-400"
            >
              Logout
            </button>

          </div>
        </div>

        {/* USER */}
        <p className="text-gray-400 mb-4 text-sm">{user?.email}</p>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">

          <div className="p-4 rounded-xl bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[#1a1a1a]">
            <p className="text-gray-400 text-xs">Income</p>
            <p className="text-emerald-400 text-lg font-semibold">
              {formatRupiah(income)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[#1a1a1a]">
            <p className="text-gray-400 text-xs">Expense</p>
            <p className="text-red-400 text-lg font-semibold">
              {formatRupiah(expense)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[#1a1a1a]">
            <p className="text-gray-400 text-xs">Balance</p>
            <p className="text-white text-lg font-semibold">
              {formatRupiah(balance)}
            </p>
          </div>

        </div>

        {/* CHART */}
        <div className="mb-6 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <TransactionChart
            labels={labels}
            incomeData={incomeData}
            expenseData={expenseData}
          />
        </div>

        {/* TRANSACTION LIST */}
        <TransactionList
          transactions={transactions}
          onDelete={fetchData}
        />

      </div>
    </div>
  )
}

export default Dashboard