export default function AuthModal({
  showAuthModal,
  setShowAuthModal,
  email,
  setEmail,
  password,
  setPassword,
  handleGoogleLogin,
  handleEmailLogin,
  handleRegister,
}) {
  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] w-full max-w-sm rounded-xl p-6 shadow-xl">

        <h2 className="text-lg font-semibold mb-4 text-white">
          Welcome
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full mb-3 py-2 rounded-md bg-white text-black font-medium hover:opacity-90 transition"
        >
          Continue with Google
        </button>

        <div className="text-center text-gray-400 text-sm my-3">
          or
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white"
        />

        <button
          onClick={handleEmailLogin}
          className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700"
        >
          Login
        </button>

        <button
          onClick={handleRegister}
          className="w-full mt-2 py-2 rounded-md border border-white/20 hover:bg-white/10"
        >
          Register
        </button>

        <button
          onClick={() => setShowAuthModal(false)}
          className="mt-4 text-sm text-gray-400 hover:text-white"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}