import { useAuth } from "../../hooks/useAuth"

function AuthCard() {
  const { loginWithGoogle } = useAuth()

  const handleGoogleLogin = async () => {
    await loginWithGoogle()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />

      {/* CARD */}
      <div className="relative w-[360px] bg-[#050505] border border-[#1a1a1a] rounded-xl p-6 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">

        {/* HEADER */}
        <div className="mb-6">
          <p className="text-[10px] tracking-widest text-gray-600 mb-2">
            SYSTEM ACCESS
          </p>

          <h1 className="text-2xl tracking-wide">
            SPENTIT
          </h1>

          <p className="text-xs text-emerald-500/70 mt-1">
            Smart financial tracking system
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="text-xs text-gray-400 leading-relaxed mb-6">
          Track your income, expenses, and savings in one place.  
          Built for daily use, business tracking, and personal finance.  
          Visualize your data with simple charts.
        </div>

        {/* GOOGLE BUTTON */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-200 transition p-3 rounded-md text-sm font-medium"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Login with Google
        </button>

        {/* FOOTER */}
        <p className="text-[10px] text-center text-gray-600 mt-6">
          Secure • Simple • Fast
        </p>

      </div>
    </div>
  )
}

export default AuthCard