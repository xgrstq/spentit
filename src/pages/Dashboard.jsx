import { useAuth } from "../hooks/useAuth"

function Dashboard() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Spentit 💸</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="bg-gray-900 p-4 rounded-xl">
        <p className="text-gray-400">Logged in as:</p>
        <p className="font-bold">{user?.email}</p>
      </div>
    </div>
  )
}

export default Dashboard