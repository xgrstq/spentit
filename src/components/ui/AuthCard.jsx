import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"

function AuthCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, register, loginWithGoogle } = useAuth()

  const handleLogin = async () => {
    const { error } = await login(email, password)
    if (error) alert(error.message)
  }

  const handleRegister = async () => {
    const { error } = await register(email, password)
    if (error) alert(error.message)
  }

  const handleGoogleLogin = async () => {
    await loginWithGoogle()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      {/* DEVICE FRAME */}
      <div className="p-4 rounded-2xl bg-[#0e0e0e] border border-[#1c1c1c] shadow-[0_20px_80px_rgba(0,0,0,0.9)]">

        {/* SCREEN */}
        <div className="w-[340px] h-[520px] bg-[#050505] border border-[#151515] rounded-xl p-6 flex flex-col justify-between">

          {/* HEADER */}
          <div>
            <p className="text-xs text-gray-500 mb-2 tracking-widest">
              SPENTIT SYSTEM
            </p>

            <h1 className="text-xl tracking-wide mb-1">
              Financial Access
            </h1>

            <p className="text-emerald-500/60 text-xs">
              Secure Personal Ledger
            </p>
          </div>

          {/* FORM */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-3 text-sm bg-[#0a0a0a] border border-[#1f1f1f] rounded-md focus:outline-none focus:border-emerald-600 transition"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 text-sm bg-[#0a0a0a] border border-[#1f1f1f] rounded-md focus:outline-none focus:border-emerald-600 transition"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-emerald-700 hover:bg-emerald-600 transition p-3 rounded-md text-sm mb-2 font-medium"
            >
              Access Data
            </button>

            <button
              onClick={handleRegister}
              className="w-full bg-[#1a1a1a] hover:bg-[#222] transition p-3 rounded-md text-sm font-medium"
            >
              Create Account
            </button>
          </div>

          {/* FOOTER */}
          <div className="text-center">
            <div className="flex items-center mb-3">
              <div className="flex-1 h-px bg-[#222]" />
              <span className="px-2 text-[10px] text-gray-600">ALT</span>
              <div className="flex-1 h-px bg-[#222]" />
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white text-black hover:bg-gray-200 transition p-2 rounded-md text-sm font-medium"
            >
              Continue with Google
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default AuthCard