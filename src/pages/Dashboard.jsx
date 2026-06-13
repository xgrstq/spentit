import { useAuth } from "../hooks/useAuth"
import { useTransactions } from "../hooks/useTransactions"

import TransactionList from "../components/ui/transaction/TransactionList"
import TransactionChart from "../components/ui/transaction/TransactionChart"
import Topbar from "../components/layout/Topbar"

import { formatRupiah } from "../utils/format"

import {
  calculateSummary,
  getChartData,
} from "../services/transactionService"

function Dashboard({ setPage }) {
  const { user, logout } = useAuth()

  const { transactions, loading, refetch } = useTransactions(user)

  const {
    income,
    expense,
    balance,
  } = calculateSummary(transactions)

  const {
    labels,
    incomeData,
    expenseData,
  } = getChartData(transactions)

  if (!user) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f6f4] flex items-center justify-center">
        <p className="text-sm text-[#86958c] font-mono">
          Loading workspace...
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
          currentPage="dashboard"
          setPage={setPage}
          logout={logout}
        />

        {/* 🟢 HERO */}
        <section className="mb-8">

          <p className="text-[11px] uppercase tracking-[0.25em] text-[#86958c] font-mono mb-3">
            Quiet Finance Workspace
          </p>

          <h1 className="text-3xl md:text-5xl tracking-tight text-[#1a221f] leading-[1.1] mb-4">
            Keep your finances
            <span className="italic font-serif text-[#4f5d56]">
              {" "}clear and intentional.
            </span>
          </h1>

          <p className="text-sm text-[#606f66] leading-relaxed max-w-2xl">
            Monitor your wallets, track your transactions,
            and quietly understand where your money flows every day.
          </p>

        </section>

        {/* 🟢 BALANCE SECTION */}
        <section className="bg-white border border-[#e1e6e1] rounded-[32px] p-7 md:p-8 shadow-[0_20px_50px_rgba(45,58,52,0.03)] mb-6">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            {/* LEFT */}
            <div>

              <p className="text-xs uppercase tracking-[0.25em] text-[#86958c] font-mono mb-4">
                Total Balance
              </p>

              <h2 className="text-4xl md:text-6xl tracking-tight text-[#1a221f] mb-4">
                {formatRupiah(balance)}
              </h2>

              <p className="text-sm text-[#86958c] leading-relaxed max-w-md">
                A complete overview from all connected wallets and recorded financial activity.
              </p>

            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-[420px]">

              {/* INCOME */}
              <div className="bg-[#f7f9f7] border border-[#edf1ed] rounded-2xl p-5">

                <p className="text-xs text-[#86958c] mb-2 uppercase tracking-wide">
                  Income
                </p>

                <p className="text-2xl text-[#2d3a34] tracking-tight">
                  {formatRupiah(income)}
                </p>

              </div>

              {/* EXPENSE */}
              <div className="bg-[#f7f9f7] border border-[#edf1ed] rounded-2xl p-5">

                <p className="text-xs text-[#86958c] mb-2 uppercase tracking-wide">
                  Expense
                </p>

                <p className="text-2xl text-[#7a4b4b] tracking-tight">
                  {formatRupiah(expense)}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* 🟢 CHART */}
        <section className="bg-white border border-[#e1e6e1] rounded-[32px] p-6 md:p-7 shadow-[0_20px_50px_rgba(45,58,52,0.03)] mb-6 overflow-hidden">

          <div className="mb-6">

            <p className="text-xs uppercase tracking-[0.25em] text-[#86958c] font-mono mb-2">
              Spending Activity
            </p>

            <h3 className="text-2xl tracking-tight text-[#1a221f]">
              Financial Flow
            </h3>

          </div>

          <TransactionChart
            labels={labels}
            incomeData={incomeData}
            expenseData={expenseData}
          />

        </section>

        {/* 🟢 TRANSACTIONS */}
        <section className="bg-white border border-[#e1e6e1] rounded-[32px] p-6 md:p-7 shadow-[0_20px_50px_rgba(45,58,52,0.03)]">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">

            <div>

              <p className="text-xs uppercase tracking-[0.25em] text-[#86958c] font-mono mb-2">
                Activity
              </p>

              <h3 className="text-2xl tracking-tight text-[#1a221f]">
                Recent Transactions
              </h3>

            </div>

            <p className="text-xs text-[#86958c] font-mono">
              {transactions.length} RECORDED
            </p>

          </div>

          <TransactionList
            transactions={transactions}
            onDelete={refetch}
          />

        </section>

      </div>

    </div>
  )
}

export default Dashboard