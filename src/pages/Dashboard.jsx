import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../hooks/useAuth"

import TransactionForm from "../components/ui/transaction/TransactionForm"
import TransactionList from "../components/ui/transaction/TransactionList"
import TransactionChart from "../components/ui/transaction/TransactionChart"

import { formatRupiah } from "../utils/format"

function Dashboard() {
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
    if (user) {
      fetchData()
    }
  }, [user])

  // 💰 SUMMARY
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0)

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  const balance = income - expense

  // 📊 CHART DATA
  const groupedData = transactions.reduce((acc, t) => {
    const date = new Date(t.created_at).toLocaleDateString()

    if (!acc[date]) {
      acc[date] = {
        income: 0,
        expense: 0,
      }
    }

    if (t.type === "income") {
      acc[date].income += t.amount
    } else {
      acc[date].expense += t.amount
    }

    return acc
  }, {})

  const labels = Object.keys(groupedData)
  const incomeData = labels.map((d) => groupedData[d].income)
  const expenseData = labels.map((d) => groupedData[d].expense)

  // 🔥 RETURN DIPINDAH KE SINI (SETELAH HOOKS)
  if (!user) return null

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">Spentit 💸</h1>

        <button
          onClick={logout}
          className="bg-[#1a1a1a] px-4 py-2 rounded hover:bg-[#222] transition"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-400 mb-4">{user?.email}</p>

      <div className="grid grid-cols-3 gap-4 mb-6">
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

      <div className="mb-6 bg-[#111] p-4 rounded">
        <TransactionChart
          labels={labels}
          incomeData={incomeData}
          expenseData={expenseData}
        />
      </div>

      <TransactionForm onSuccess={fetchData} />

      <TransactionList
        transactions={transactions}
        onDelete={fetchData}
      />

    </div>
  )
}

export default Dashboard