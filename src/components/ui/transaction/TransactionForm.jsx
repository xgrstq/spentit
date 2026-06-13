import { useState } from "react"
import { supabase } from "../../../lib/supabase"
import { useAuth } from "../../../hooks/useAuth"

function TransactionForm({
  walletId,
  onSuccess,
}) {
  const { user } = useAuth()

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("expense")
  const [notes, setNotes] = useState("")

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !amount) return

    setLoading(true)

    const { error } = await supabase
      .from("transactions")
      .insert([
        {
          title,
          amount: Number(amount),
          type,
          notes,
          wallet_id: walletId,
          user_id: user.id,
        },
      ])

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      setTitle("")
      setAmount("")
      setNotes("")
      setType("expense")

      onSuccess && onSuccess()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      {/* TITLE */}
      <div>

        <label className="block text-[11px] uppercase tracking-[0.2em] text-[#86958c] font-mono mb-2">
          Title
        </label>

        <input
          placeholder="Coffee, Salary, Subscription..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-[#f7f9f7] border border-[#e5ebe5] rounded-2xl px-4 py-3 text-sm outline-none placeholder:text-[#98a59d] focus:border-[#b8c5bc] transition-all duration-200"
        />

      </div>

      {/* AMOUNT */}
      <div>

        <label className="block text-[11px] uppercase tracking-[0.2em] text-[#86958c] font-mono mb-2">
          Amount
        </label>

        <input
          placeholder="0"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-[#f7f9f7] border border-[#e5ebe5] rounded-2xl px-4 py-3 text-sm outline-none placeholder:text-[#98a59d] focus:border-[#b8c5bc] transition-all duration-200"
        />

      </div>

      {/* TYPE */}
      <div>

        <label className="block text-[11px] uppercase tracking-[0.2em] text-[#86958c] font-mono mb-2">
          Transaction Type
        </label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-[#f7f9f7] border border-[#e5ebe5] rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#b8c5bc] transition-all duration-200"
        >
          <option value="expense">
            Expense
          </option>

          <option value="income">
            Income
          </option>

        </select>

      </div>

      {/* NOTES */}
      <div>

        <label className="block text-[11px] uppercase tracking-[0.2em] text-[#86958c] font-mono mb-2">
          Notes
        </label>

        <textarea
          placeholder="Optional details..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full resize-none bg-[#f7f9f7] border border-[#e5ebe5] rounded-2xl px-4 py-3 text-sm outline-none placeholder:text-[#98a59d] focus:border-[#b8c5bc] transition-all duration-200"
        />

      </div>

      {/* BUTTON */}
      <button
        disabled={loading}
        className="w-full bg-[#2d3a34] hover:bg-[#1f2924] disabled:opacity-60 text-[#f4f6f4] py-3.5 rounded-2xl text-sm transition-all duration-200 active:scale-[0.99]"
      >
        {loading
          ? "Saving Activity..."
          : "Add Transaction"}
      </button>

    </form>
  )
}

export default TransactionForm