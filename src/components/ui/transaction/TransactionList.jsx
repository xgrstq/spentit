import { useState } from "react"
import { supabase } from "../../../lib/supabase"
import { formatRupiah } from "../../../utils/format"

function TransactionList({ transactions, onDelete }) {
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editAmount, setEditAmount] = useState("")
  const [editNotes, setEditNotes] = useState("")

  const handleDelete = async (id) => {
    if (!confirm("Hapus data ini? 😏")) return

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
    return <p className="text-gray-500">No transactions yet</p>
  }

  return (
    <div>
      {transactions.map((item) => (
        <div
          key={item.id}
          className="p-3 mb-2 bg-[#111] border border-[#222] rounded"
        >
          {editingId === item.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full mb-1 bg-[#222] p-1"
              />

              <input
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="w-full mb-1 bg-[#222] p-1"
              />

              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="w-full mb-1 bg-[#222] p-1"
              />

              <button
                onClick={() => handleEdit(item.id)}
                className="text-emerald-400 mr-2"
              >
                Save
              </button>

              <button
                onClick={() => setEditingId(null)}
                className="text-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span>{item.title}</span>

                <span
                  className={
                    item.type === "income"
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                >
                  {item.type === "income" ? "+" : "-"} {formatRupiah(item.amount)}
                </span>
              </div>

              <p className="text-xs text-gray-500">{item.notes}</p>

              <div className="flex gap-3 mt-2 text-sm">
                <button
                  onClick={() => {
                    setEditingId(item.id)
                    setEditTitle(item.title)
                    setEditAmount(item.amount)
                    setEditNotes(item.notes || "")
                  }}
                  className="text-blue-400"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500"
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