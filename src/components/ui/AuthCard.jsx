import { useAuth } from "../../hooks/useAuth"

function AuthCard() {
  const { loginWithGoogle } = useAuth()

  return (
    <div className="min-h-screen overflow-hidden w-full bg-[#f4f6f4] text-[#2c3531] flex flex-col justify-between px-5 py-4 md:px-10 md:py-5 font-sans antialiased selection:bg-[#2d3a34] selection:text-white relative">

      {/* 🌫️ SOFT BACKGROUND */}
      <div className="absolute top-[-120px] right-[-120px] w-[300px] h-[300px] bg-[#dfe6df] blur-[120px] rounded-full opacity-70 pointer-events-none" />

      <div className="absolute bottom-[-100px] left-[-80px] w-[260px] h-[260px] bg-[#e8ece8] blur-[120px] rounded-full opacity-80 pointer-events-none" />

      {/* 🟢 HEADER */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between z-10">

        <span className="font-bold tracking-tight text-xl text-[#1a221f]">
          spentit.
        </span>

        <div className="flex items-center gap-3">

          <span className="w-2 h-2 rounded-full bg-[#4f5d56] opacity-60 animate-pulse" />

          <span className="text-[11px] font-mono tracking-wider bg-[#e2e7e2] text-[#4f5d56] px-2.5 py-1 rounded-md font-medium">
            v1.3.0
          </span>

        </div>

      </header>

      {/* 🟢 MAIN */}
      <main className="w-full max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center my-auto py-4 z-10">

        {/* LEFT SIDE */}
        <section className="hidden lg:flex lg:col-span-7 flex-col justify-center pr-16 border-r border-[#e1e6e1]">

          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#86958c] mb-4">
            Quiet Finance Workspace
          </span>

          <h1 className="text-3xl xl:text-4xl font-normal tracking-tight text-[#1a221f] leading-[1.15] mb-6">
            Track your spending
            <br />

            <span className="italic font-serif text-[#4f5d56]">
              without the noise.
            </span>
          </h1>

          <p className="text-sm text-[#606f66] leading-relaxed max-w-md mb-8">
            A calm personal workspace for tracking balances,
            managing wallets, and understanding where your money quietly goes.
          </p>

          {/* ✨ ATMOSPHERE BLOCK */}
          <div className="max-w-md border-l border-[#d7ddd7] pl-5">

            <p className="text-[15px] leading-8 text-[#4f5d56] font-light">
              “Financial clarity isn’t about restriction.
              It’s about understanding where your life quietly flows.”
            </p>

            <div className="mt-6 space-y-2 text-[12px] text-[#86958c] font-mono">

              <p>+ salary received</p>
              <p>- late night coffee</p>
              <p>+ freelance payment</p>
              <p>- impulsive marketplace checkout</p>

            </div>

          </div>

        </section>

        {/* RIGHT SIDE */}
        <section className="lg:col-span-5 flex justify-center w-full">

          <div className="w-full max-w-[390px] bg-white border border-[#e1e6e1] rounded-[28px] p-7 md:p-8 shadow-[0_20px_50px_rgba(45,58,52,0.03)] relative overflow-hidden">

            {/* 🌿 DECORATION */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#2d3a34]/[0.02] rounded-bl-full pointer-events-none" />

            {/* CARD CONTENT */}
            <div className="mb-8">

              <h2 className="text-2xl font-semibold tracking-tight text-[#1a221f] mb-2.5">
                Welcome Back
              </h2>

              <p className="text-xs sm:text-sm text-[#606f66] leading-relaxed">
                Continue with your Google account to access your personal finance workspace.
              </p>

            </div>

            {/* BUTTON */}
            <button
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-3 bg-[#2d3a34] text-[#f4f6f4] hover:bg-[#1f2924] active:scale-[0.99] transition-all duration-200 py-3.5 px-4 rounded-xl text-sm font-medium shadow-sm shadow-[#2d3a34]/10"
            >

              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-4 h-4 bg-white p-0.5 rounded-full select-none"
                alt="Google"
              />

              Continue with Google

            </button>

            {/* FOOTER */}
            <div className="mt-8 pt-5 border-t border-[#f0f3f0] flex items-center justify-between text-[11px] font-mono text-[#86958c]">

              <span className="flex items-center gap-1.5">

                <svg
                  className="w-3 h-3 text-[#4f5d56]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>

                SUPABASE AUTH

              </span>

              <span>END-TO-END</span>

            </div>

          </div>

        </section>

      </main>

      {/* 🟢 FOOTER */}
      <footer className="w-full max-w-6xl mx-auto pt-2 border-t border-[#e1e6e1]/60 text-center lg:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#86958c] z-10">

        <span>
          © {new Date().getFullYear()} Spentit Workspace.
        </span>

        <span className="font-serif italic text-[#606f66]">
          Keep your mind clear, and your wallet tracked.
        </span>

      </footer>

    </div>
  )
}

export default AuthCard