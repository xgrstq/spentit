import { useState } from "react"
import { supabase } from "../../../lib/supabase"
import { formatRupiah } from "../../../utils/format"

function TransactionList({
  transactions,
  onDelete,
}) {
  const [editingId, setEditingId] = useState(null)

  const [editTitle, setEditTitle] = useState("")
  const [editAmount, setEditAmount] = useState("")
  const [editNotes, setEditNotes] = useState("")
  const [editType, setEditType] = useState("expense")

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    )

    if (!confirmDelete) return

    await supabase
      .from("transactions")
      .delete()
      .eq("id", id)

    onDelete()
  }

  const handleEdit = async (id) => {
    await supabase
      .from("transactions")
      .update({
        title: editTitle,
        amount: Number(editAmount),
        notes: editNotes,
        type: editType,
      })
      .eq("id", id)

    setEditingId(null)

    onDelete()
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="py-10 text-center">

        <p className="text-sm text-[#86958c]">
          No transactions recorded yet.
        </p>

      </div>
    )
  }

  return (
    <div className="space-y-4">

      {transactions.map((item) => (

        <div
          key={item.id}
          className="group bg-[#f7f9f7] border border-[#edf1ed] rounded-[28px] p-5 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(45,58,52,0.04)] transition-all duration-300"
        >

          {editingId === item.id ? (

            <div className="space-y-4">

              {/* TITLE */}
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Transaction title..."
                className="w-full bg-white border border-[#e5ebe5] rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#b8c5bc] transition-all duration-200"
              />

              {/* AMOUNT */}
              <input
                value={editAmount}
                type="number"
                onChange={(e) => setEditAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-white border border-[#e5ebe5] rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#b8c5bc] transition-all duration-200"
              />

              {/* TYPE */}
              <select
                value={editType}
                onChange={(e) => setEditType(e.target.value)}
                className="w-full bg-white border border-[#e5ebe5] rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#b8c5bc] transition-all duration-200"
              >
                <option value="expense">
                  Expense
                </option>

                <option value="income">
                  Income
                </option>

              </select>

              {/* NOTES */}
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Optional notes..."
                rows={4}
                className="w-full resize-none bg-white border border-[#e5ebe5] rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#b8c5bc] transition-all duration-200"
              />

              {/* ACTIONS */}
              <div className="flex items-center gap-4 pt-2">

                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-[#2d3a34] hover:bg-[#1f2924] text-white px-5 py-2.5 rounded-xl text-sm transition-all duration-200 active:scale-[0.98]"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="text-sm text-[#86958c] hover:text-[#1a221f] transition-colors duration-200"
                >
                  Cancel
                </button>

              </div>

            </div>

          ) : (

            <>

              {/* TOP */}
              <div className="flex items-start justify-between gap-5 mb-4">

                <div>

                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#86958c] font-mono mb-2">
                    {item.type}
                  </p>

                  <h3 className="text-xl tracking-tight text-[#1a221f]">
                    {item.title}
                  </h3>

                </div>

                <div
                  className={`
                    text-lg tracking-tight whitespace-nowrap
                    ${
                      item.type === "income"
                        ? "text-[#2d3a34]"
                        : "text-[#7a4b4b]"
                    }
                  `}
                >
                  {item.type === "income" ? "+" : "-"}{" "}
                  {formatRupiah(item.amount)}
                </div>

              </div>

              {/* NOTES */}
              {item.notes && (

                <p className="text-sm text-[#606f66] leading-relaxed mb-5">
                  {item.notes}
                </p>

              )}

              {/* BOTTOM */}
              <div className="flex items-center justify-between">

                <p className="text-[11px] text-[#98a59d] font-mono">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>

                <div className="flex items-center gap-4">

                  <button
                    onClick={() => {
                      setEditingId(item.id)
                      setEditTitle(item.title)
                      setEditAmount(item.amount)
                      setEditNotes(item.notes || "")
                      setEditType(item.type)
                    }}
                    className="text-sm text-[#86958c] hover:text-[#1a221f] transition-colors duration-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-sm text-[#86958c] hover:text-[#a14646] transition-colors duration-200"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </>

          )}

        </div>

      ))}

    </div>
  )
}

export default TransactionList