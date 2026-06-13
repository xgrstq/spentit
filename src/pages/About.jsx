import Topbar from "../components/layout/Topbar"
import { useAuth } from "../hooks/useAuth"

function About({ setPage }) {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f6f4] text-[#2c3531] px-5 py-5 md:px-10 relative">

      {/* 🌫️ BACKGROUND */}
      <div className="fixed top-[-120px] right-[-120px] w-[300px] h-[300px] bg-[#dfe6df] blur-[120px] rounded-full opacity-70 pointer-events-none" />

      <div className="fixed bottom-[-100px] left-[-80px] w-[260px] h-[260px] bg-[#e8ece8] blur-[120px] rounded-full opacity-80 pointer-events-none" />

      {/* 🌿 CONTAINER */}
      <div className="max-w-5xl mx-auto relative z-10">

        {/* 🟢 TOPBAR */}
        <Topbar
          currentPage="about"
          setPage={setPage}
          logout={logout}
        />

        {/* 🟢 HERO */}
        <section className="mb-20 pt-6">

          <p className="text-[11px] uppercase tracking-[0.25em] text-[#86958c] font-mono mb-4">
            About Spentit
          </p>

          <h1 className="text-4xl md:text-6xl tracking-tight leading-[1.1] text-[#1a221f] mb-6">
            Built for clarity,
            <br />

            <span className="italic font-serif text-[#4f5d56]">
              not financial pressure.
            </span>
          </h1>

          <p className="text-sm md:text-[15px] leading-8 text-[#606f66] max-w-2xl">
            Spentit was created as a quiet personal finance workspace —
            a place to track balances, manage wallets,
            and understand spending habits without overwhelming dashboards,
            aggressive analytics, or unnecessary complexity.
          </p>

        </section>

        {/* 🟢 STORY */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">

          {/* LEFT */}
          <div className="lg:col-span-7">

            <div className="bg-white border border-[#e1e6e1] rounded-[32px] p-7 md:p-9 shadow-[0_20px_50px_rgba(45,58,52,0.03)]">

              <p className="text-[11px] uppercase tracking-[0.25em] text-[#86958c] font-mono mb-5">
                Philosophy
              </p>

              <div className="space-y-6 text-[#4f5d56] leading-8 text-[15px]">

                <p>
                  Most finance apps try to push productivity,
                  optimization, and pressure.
                </p>

                <p>
                  Spentit takes a quieter approach —
                  helping you become more aware of your financial flow
                  without turning money into anxiety.
                </p>

                <p>
                  The experience is intentionally calm,
                  minimal, and breathable.
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            <div className="bg-white border border-[#e1e6e1] rounded-[28px] p-6 shadow-[0_20px_50px_rgba(45,58,52,0.03)]">

              <p className="text-[11px] uppercase tracking-[0.25em] text-[#86958c] font-mono mb-4">
                Workspace Principles
              </p>

              <div className="space-y-4 text-sm text-[#606f66]">

                <div className="flex items-start gap-3">
                  <span className="text-[#2d3a34]">01</span>
                  <p>Quiet and focused interface design.</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#2d3a34]">02</span>
                  <p>Financial tracking without visual overload.</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#2d3a34]">03</span>
                  <p>Multi-wallet structure for intentional organization.</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#2d3a34]">04</span>
                  <p>Calm interactions and breathable layouts.</p>
                </div>

              </div>

            </div>

            <div className="bg-[#2d3a34] text-[#f4f6f4] rounded-[28px] p-6 shadow-[0_20px_50px_rgba(45,58,52,0.08)]">

              <p className="text-[11px] uppercase tracking-[0.25em] text-[#b7c3bc] font-mono mb-4">
                Current Release
              </p>

              <h3 className="text-3xl tracking-tight mb-3">
                v1.4.0
              </h3>

              <p className="text-sm leading-7 text-[#d7ddd7]">
                Multi-wallet architecture,
                cleaner workspace design,
                and a fully refactored interface system.
              </p>

            </div>

          </div>

        </section>

        {/* 🟢 QUOTE */}
        <section className="mb-20">

          <div className="border-l border-[#ccd4cc] pl-6 max-w-3xl">

            <p className="text-2xl md:text-3xl leading-[1.5] tracking-tight text-[#4f5d56] font-serif italic">
              “Financial clarity isn’t about restriction.
              It’s about understanding where your life quietly flows.”
            </p>

          </div>

        </section>

        {/* 🟢 FOOTER */}
        <footer className="pt-6 border-t border-[#dfe5df] flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-[#86958c]">

          <span>
            © {new Date().getFullYear()} Spentit Workspace
          </span>

          <span className="italic font-serif text-[#606f66]">
            Designed with calmness in mind.
          </span>

        </footer>

      </div>

    </div>
  )
}

export default About