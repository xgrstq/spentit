import { supabase } from "../lib/supabase"

// GET
export async function getWallets(userId) {
  if (!userId) return { data: [], error: null }

  const { data, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return { data, error }
}

// CREATE
export async function createWallet(name, userId) {
  const { data, error } = await supabase
    .from("wallets")
    .insert([{ name, user_id: userId }])

  return { data, error }
}

// UPDATE
export async function updateWallet(id, name) {
  const { data, error } = await supabase
    .from("wallets")
    .update({ name })
    .eq("id", id)

  return { data, error }
}

// DELETE
export async function deleteWallet(id) {
  const { data, error } = await supabase
    .from("wallets")
    .delete()
    .eq("id", id)

  return { data, error }
}