import { useAuth } from "../hooks/useAuth"
import { useTransactions } from "../hooks/useTransactions"

import TransactionForm from "../components/ui/transaction/TransactionForm"
import TransactionList from "../components/ui/transaction/TransactionList"
import TransactionChart from "../components/ui/transaction/TransactionChart"

import { formatRupiah } from "../utils/format"
import {
  calculateSummary,
  getChartData,
} from "../services/transactionService"

function WalletDetail({ wallet, setPage }) {
  const { user } = useAuth()

  const { transactions, loading, refetch } = useTransactions(
    user,
    wallet?.id
  )

  const { income, expense, balance } = calculateSummary(transactions)
  const { labels, incomeData, expenseData } = getChartData(transactions)

  if (!user || !wallet) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-md md:max-w-4xl p-4 md:p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setPage("wallets")}>
            ← Back
          </button>

          <h1 className="text-lg font-semibold">
            {wallet.name}
          </h1>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 bg-[#111] rounded">
            <p className="text-xs text-gray-400">Income</p>
            <p className="text-emerald-400">
              {formatRupiah(income)}
            </p>
          </div>

          <div className="p-3 bg-[#111] rounded">
            <p className="text-xs text-gray-400">Expense</p>
            <p className="text-red-400">
              {formatRupiah(expense)}
            </p>
          </div>

          <div className="p-3 bg-[#111] rounded">
            <p className="text-xs text-gray-400">Balance</p>
            <p>{formatRupiah(balance)}</p>
          </div>
        </div>

        {/* CHART */}
        <div className="mb-6 bg-[#111] p-4 rounded">
          <TransactionChart
            labels={labels}
            incomeData={incomeData}
            expenseData={expenseData}
          />
        </div>

        {/* FORM */}
        <TransactionForm
          walletId={wallet.id}
          onSuccess={refetch}
        />

        {/* LIST */}
        <TransactionList
          transactions={transactions}
          onDelete={refetch}
        />

      </div>
    </div>
  )
}

export default WalletDetail