import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ambil user awal
    supabase.auth.getUser().then((res) => {
      setUser(res.data.user)
      setLoading(false)
    })

    // listen perubahan auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // login email
  const login = async (email, password) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  // register
  const register = async (email, password) => {
    return await supabase.auth.signUp({
      email,
      password,
    })
  }

  // login google
  const loginWithGoogle = async () => {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  // logout
  const logout = async () => {
    return await supabase.auth.signOut()
  }

  return {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
  }
}