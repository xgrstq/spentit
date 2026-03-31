import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

function Auth() {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Spentit 🔐
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded-lg bg-gray-800 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 p-3 rounded-lg mb-2"
        >
          Login
        </button>

        <button
          onClick={handleRegister}
          className="w-full bg-gray-700 p-3 rounded-lg"
        >
          Register
        </button>

        <div className="text-center my-4 text-gray-400">atau</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 p-3 rounded-lg"
        >
          Login with Google 🚀
        </button>
      </div>
    </div>
  )
}

export default Auth