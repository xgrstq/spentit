import { useState } from "react"
import { supabase } from "../../../lib/supabase"
import { formatRupiah } from "../../../utils/format"

function TransactionList({ transactions, onDelete }) {
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editAmount, setEditAmount] = useState("")
  const [editNotes, setEditNotes] = useState("")

  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction? 😏")) return

    await supabase.from("transactions").delete().eq("id", id)
    onDelete()
  }

  const handleEdit = async (id) => {
    await supabase
      .from("transactions")
      .update({
        title: editTitle,
        amount: Number(editAmount),
        notes: editNotes,
      })
      .eq("id", id)

    setEditingId(null)
    onDelete()
  }

  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-500 text-sm">No transactions yet</p>
  }

  return (
    <div>
      {transactions.map((item) => (
        <div
          key={item.id}
          className="p-4 mb-3 rounded-xl bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[#1a1a1a] hover:bg-[#111] transition"
        >
          {editingId === item.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full mb-2 p-2 bg-[#0a0a0a] border border-[#222] rounded outline-none"
                placeholder="Title"
              />

              <input
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="w-full mb-2 p-2 bg-[#0a0a0a] border border-[#222] rounded outline-none"
                placeholder="Amount"
              />

              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="w-full mb-2 p-2 bg-[#0a0a0a] border border-[#222] rounded outline-none"
                placeholder="Notes"
              />

              {/* 🔥 FIX BUTTON */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="px-3 py-1 bg-emerald-600 rounded text-sm hover:bg-emerald-500"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1 bg-[#222] rounded text-sm text-gray-300 hover:bg-[#2a2a2a]"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {item.title}
                </span>

                <span
                  className={`text-sm font-semibold ${
                    item.type === "income"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {item.type === "income" ? "+" : "-"}{" "}
                  {formatRupiah(item.amount)}
                </span>
              </div>

              {/* NOTES */}
              {item.notes && (
                <p className="text-xs text-gray-500 mt-1">
                  {item.notes}
                </p>
              )}

              {/* ACTION */}
              <div className="flex gap-3 mt-3 text-xs">
                <button
                  onClick={() => {
                    setEditingId(item.id)
                    setEditTitle(item.title)
                    setEditAmount(item.amount)
                    setEditNotes(item.notes || "")
                  }}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default TransactionList