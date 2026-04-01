import { useState } from "react"
import { supabase } from "../../../lib/supabase"
import { useAuth } from "../../../hooks/useAuth"

function TransactionForm({ onSuccess }) {
  const { user } = useAuth()

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("expense")
  const [notes, setNotes] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase.from("transactions").insert([
      {
        title,
        amount: Number(amount),
        type,
        notes,
        user_id: user.id,
      },
    ])

    if (error) {
      alert(error.message)
    } else {
      setTitle("")
      setAmount("")
      setNotes("")
      onSuccess && onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 bg-[#111] border border-[#222] rounded"
      />

      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-2 bg-[#111] border border-[#222] rounded"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 mb-2 bg-[#111] border border-[#222] rounded"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-2 mb-2 bg-[#111] border border-[#222] rounded"
      />

      <button className="w-full bg-emerald-700 p-2 rounded">
        Add Transaction
      </button>
    </form>
  )
}

export default TransactionForm