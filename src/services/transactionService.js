import { supabase } from "../lib/supabase"

// 💰 SUMMARY
export function calculateSummary(transactions) {
  if (!transactions || transactions.length === 0) {
    return {
      income: 0,
      expense: 0,
      balance: 0,
    }
  }

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0)

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  return {
    income,
    expense,
    balance: income - expense,
  }
}

// 📊 CHART DATA
export function getChartData(transactions) {
  if (!transactions || transactions.length === 0) {
    return {
      labels: [],
      incomeData: [],
      expenseData: [],
    }
  }

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

  return {
    labels,
    incomeData: labels.map((d) => groupedData[d].income),
    expenseData: labels.map((d) => groupedData[d].expense),
  }
}

// 📦 FETCH ALL (Dashboard)
export async function getTransactions(userId) {
  if (!userId) {
    return { data: [], error: null }
  }

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return { data, error }
}

// 📦 FETCH BY WALLET (WalletDetail)
export async function getTransactionsByWallet(userId, walletId) {
  if (!userId || !walletId) {
    return { data: [], error: null }
  }

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .eq("wallet_id", walletId)
    .order("created_at", { ascending: false })

  return { data, error }
}