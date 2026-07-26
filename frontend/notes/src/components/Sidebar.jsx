export default function Sidebar({
  user,
  notes,
  logout,
  setShowModal,
  setShowAuthModal,
}) {
  return (
    <div className="w-60 bg-[#111] border-r border-white/10 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-medium mb-6 text-gray-200">
          Second Brain
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="text-left px-3 py-2 rounded-md hover:bg-white/10 text-sm text-gray-300 transition"
        >
          + New Note
        </button>

        <div className="mt-4 space-y-1">
          {notes.map((n) => (
            <div
              key={n.id}
              className="px-3 py-2 rounded-md text-sm text-gray-400 hover:bg-white/5 cursor-pointer"
            >
              {n.title || "Untitled"}
            </div>
          ))}
        </div>
      </div>

      <div>
        {!user ? (
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg"
          >
            Login / Signup
          </button>
        ) : (
          <>
            <div className="text-sm text-gray-300">
              👤 {user.displayName || user.email}
            </div>

            <button
              onClick={logout}
              className="mt-2 text-xs text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}