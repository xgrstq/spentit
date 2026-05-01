import { useAuth } from "../hooks/useAuth"
import { useTransactions } from "../hooks/useTransactions"

import TransactionList from "../components/ui/transaction/TransactionList"
import TransactionChart from "../components/ui/transaction/TransactionChart"

import { formatRupiah } from "../utils/format"
import {
  calculateSummary,
  getChartData,
} from "../services/transactionService"

function Dashboard({ setPage }) {
  const { user, logout } = useAuth()

  // 🔥 HOOK LAYER
  const { transactions, loading, refetch } = useTransactions(user)

  // 🔥 SERVICE LAYER
  const { income, expense, balance } = calculateSummary(transactions)
  const { labels, incomeData, expenseData } = getChartData(transactions)

  if (!user) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center relative overflow-hidden">

      {/* BACKGROUND GLOW */}
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
          onDelete={refetch}
        />

      </div>
    </div>
  )
}

export default Dashboard