function Topbar({
  currentPage,
  setPage,
  logout,
}) {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
    },
    {
      id: "wallets",
      label: "Wallets",
    },
    {
      id: "about",
      label: "About",
    },
  ]

  return (
    <header className="w-full flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-10">

      {/* TOP */}
      <div className="flex items-center justify-between w-full md:w-auto">

        {/* LOGO */}
        <button
          onClick={() => setPage("dashboard")}
          className="text-xl tracking-tight font-bold text-[#1a221f]"
        >
          spentit.
        </button>

        {/* LOGOUT MOBILE */}
        <button
          onClick={() => {
            const confirmLogout = window.confirm(
              "Are you sure you want to leave Spentit?"
            )

            if (confirmLogout) {
              logout()
            }
          }}
          className="md:hidden text-sm text-[#86958c] hover:text-[#a14646] transition-colors duration-200"
        >
          Exit
        </button>

      </div>

      {/* NAVIGATION */}
      <div className="flex items-center justify-between gap-4">

        {/* NAV */}
        <nav className="flex items-center gap-2 overflow-x-auto scrollbar-hide">

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-xl text-sm transition-all duration-200
                ${
                  currentPage === item.id
                    ? "bg-white border border-[#e1e6e1] text-[#1a221f] shadow-sm"
                    : "text-[#86958c] hover:text-[#1a221f]"
                }
              `}
            >
              {item.label}
            </button>
          ))}

        </nav>

        {/* LOGOUT DESKTOP */}
        <button
          onClick={() => {
            const confirmLogout = window.confirm(
              "Are you sure you want to leave Spentit?"
            )

            if (confirmLogout) {
              logout()
            }
          }}
          className="hidden md:block text-sm text-[#86958c] hover:text-[#a14646] transition-colors duration-200 whitespace-nowrap"
        >
          Exit Workspace
        </button>

      </div>

    </header>
  )
}

export default Topbar