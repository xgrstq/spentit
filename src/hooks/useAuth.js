import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    // ambil session awal (LEBIH STABIL)
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (isMounted) {
        setUser(data.session?.user ?? null)
        setLoading(false)
      }
    }

    getInitialSession()

    // listen perubahan auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  // login email (masih ada kalau nanti lo butuh lagi)
  const login = async (email, password) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

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
    options: {
      redirectTo: window.location.origin,
    },
  })
}

  // 🔥 logout FIXED
  const logout = async () => {
    setUser(null) // langsung reset UI (ini kuncinya)
    await supabase.auth.signOut()
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