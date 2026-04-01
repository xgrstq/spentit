import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../hooks/useAuth"

import TransactionForm from "../components/ui/transaction/TransactionForm"
import TransactionList from "../components/ui/transaction/TransactionList"
import TransactionChart from "../components/ui/transaction/TransactionChart"

function Dashboard() {
  const { user, logout } = useAuth()
  const [transactions, setTransactions] = useState([])

  // 🔥 fetch data
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
    fetchData()
  }, [user])

  // 💰 SUMMARY
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0)

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  const balance = income - expense

  // 📊 ADVANCED CHART (EXPENSE PER DAY)
  const groupedData = transactions.reduce((acc, t) => {
    const date = new Date(t.created_at).toLocaleDateString()

    if (!acc[date]) acc[date] = 0

    if (t.type === "expense") {
      acc[date] += t.amount
    }

    return acc
  }, {})

  const labels = Object.keys(groupedData)
  const dataValues = Object.values(groupedData)

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">Spentit 💸</h1>

        <button
          onClick={logout}
          className="bg-[#1a1a1a] px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* USER */}
      <p className="text-gray-400 mb-4">{user?.email}</p>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-[#111] rounded">
          <p className="text-gray-400 text-sm">Income</p>
          <p className="text-emerald-500 font-bold">{income}</p>
        </div>

        <div className="p-4 bg-[#111] rounded">
          <p className="text-gray-400 text-sm">Expense</p>
          <p className="text-red-500 font-bold">{expense}</p>
        </div>

        <div className="p-4 bg-[#111] rounded">
          <p className="text-gray-400 text-sm">Balance</p>
          <p className="font-bold">{balance}</p>
        </div>
      </div>

      {/* 📊 CHART */}
      <div className="mb-6 bg-[#111] p-4 rounded">
        <TransactionChart labels={labels} data={dataValues} />
      </div>

      {/* FORM */}
      <TransactionForm onSuccess={fetchData} />

      {/* LIST */}
      <TransactionList
        transactions={transactions}
        onDelete={fetchData}
      />

    </div>
  )
}

export default Dashboard