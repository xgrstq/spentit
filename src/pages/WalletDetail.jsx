import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../hooks/useAuth"

import TransactionForm from "../components/ui/transaction/TransactionForm"
import TransactionList from "../components/ui/transaction/TransactionList"
import TransactionChart from "../components/ui/transaction/TransactionChart"

import { formatRupiah } from "../utils/format"

function WalletDetail({ wallet, setPage }) {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])

  const fetchData = async () => {
    if (!user || !wallet) return

    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .eq("wallet_id", wallet.id)
      .order("created_at", { ascending: false })

    setTransactions(data || [])
  }

  useEffect(() => {
    fetchData()
  }, [wallet, user])

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

    if (!acc[date]) {
      acc[date] = { income: 0, expense: 0 }
    }

    if (t.type === "income") acc[date].income += t.amount
    else acc[date].expense += t.amount

    return acc
  }, {})

  const labels = Object.keys(groupedData)
  const incomeData = labels.map((d) => groupedData[d].income)
  const expenseData = labels.map((d) => groupedData[d].expense)

  if (!wallet) return null

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-md md:max-w-4xl p-4 md:p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setPage("wallets")}
            className="text-sm text-gray-400"
          >
            ← Back
          </button>

          <h1 className="text-lg">{wallet.name}</h1>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="p-4 bg-[#111] rounded">
            <p className="text-gray-400 text-sm">Income</p>
            <p className="text-emerald-500 font-bold">
              {formatRupiah(income)}
            </p>
          </div>

          <div className="p-4 bg-[#111] rounded">
            <p className="text-gray-400 text-sm">Expense</p>
            <p className="text-red-500 font-bold">
              {formatRupiah(expense)}
            </p>
          </div>

          <div className="p-4 bg-[#111] rounded">
            <p className="text-gray-400 text-sm">Balance</p>
            <p className="font-bold">
              {formatRupiah(balance)}
            </p>
          </div>
        </div>

        {/* CHART */}
        <div className="mb-6 bg-[#111] p-4 rounded md:h-[300px]">
          <TransactionChart
            labels={labels}
            incomeData={incomeData}
            expenseData={expenseData}
          />
        </div>

        {/* 🔥 ADD TRANSACTION DI SINI */}
        <TransactionForm walletId={wallet.id} onSuccess={fetchData} />

        {/* LIST */}
        <TransactionList
          transactions={transactions}
          onDelete={fetchData}
        />

      </div>
    </div>
  )
}

export default WalletDetail