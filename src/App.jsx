import { useAuth } from "./hooks/useAuth"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"

function App() {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>

  return user ? <Dashboard /> : <Auth />
}

export default App