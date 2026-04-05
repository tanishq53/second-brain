import { useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const login = async () => {
  const result = await signInWithPopup(auth, provider);
  setUser(result.user);
};
const logout = () => {
  signOut(auth);
  setUser(null);
};
  const addNote = () => {
  if (!title || !note) return;

  if (selectedIndex !== null) {
    // UPDATE existing note
    const updatedNotes = [...notes];
    updatedNotes[selectedIndex] = { title, note };
    setNotes(updatedNotes);
    setSelectedIndex(null);
  } else {
    // CREATE new note
    setNotes([...notes, { title, note }]);
  }

  setTitle("");
  setNote("");
};

  return (
  <div className="min-h-screen flex bg-black text-white">

    {/* SIDEBAR */}
    <div className="w-60 bg-[#111] border-r border-white/10 p-4 flex flex-col">
  
  <h2 className="text-lg font-medium mb-4 text-gray-200">
  🧠 Second Brain
</h2>

{/* LOGIN SECTION */}
{!user ? (
  <button
    onClick={login}
    className="text-sm text-gray-300 mb-4 text-left hover:text-white transition"
  >
    Login with Google
  </button>
) : (
  <div className="mb-4 text-sm">
    <p className="text-gray-300">{user.displayName}</p>
    <button
      onClick={logout}
      className="text-xs text-gray-500 hover:text-white"
    >
      Logout
    </button>
  </div>
)}

  <button
  onClick={() => {
    console.log("clicked"); // debug
    setShowModal(true);
    setTitle("");
    setNote("");
    setSelectedIndex(null);
  }}
  className="text-left px-3 py-2 rounded-md hover:bg-white/10 text-sm text-gray-300 transition"
>
  + New Note
</button>

  <div className="mt-4 space-y-1">
    {notes.map((n, i) => (
      <div
        key={i}
        onClick={() => {
          setTitle(n.title);
          setNote(n.note);
          setSelectedIndex(i);
          setShowModal(true);
        }}
        className={`px-3 py-2 rounded-md text-sm cursor-pointer transition ${
          selectedIndex === i
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:bg-white/5"
        }`}
      >
        {n.title || "Untitled"}
      </div>
    ))}
  </div>
</div>

    {/* MAIN CONTENT */}
    <div className="flex-1 relative p-10">

  {/* glow background */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 blur-3xl opacity-20"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 blur-3xl opacity-20"></div>

  <div className="relative z-10 max-w-5xl mx-auto">

    {/* SHOW WELCOME ONLY IF NO NOTES */}
    {notes.length === 0 && (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-4xl font-semibold text-gray-100 mb-2">
          Welcome
        </h1>

        <p className="text-gray-400 text-sm">
          Select a note or create a new one
        </p>
      </div>
    )}

    {/* NOTES GRID */}
    {notes.length > 0 && (
      <div className="grid md:grid-cols-3 gap-6">
        {notes.map((n, i) => (
          <div
            key={i}
            onClick={() => {
              setTitle(n.title);
              setNote(n.note);
              setSelectedIndex(i);
              setShowModal(true);
            }}
            className="cursor-pointer bg-[#1f1f1f] p-5 rounded-xl border border-white/10 hover:border-purple-500 transition"
          >
            <h2 className="text-lg font-semibold text-white mb-1">
              {n.title}
            </h2>
            <p className="text-gray-400 text-sm line-clamp-3">
              {n.note}
            </p>
          </div>
        ))}
      </div>
    )}

  </div>
</div>
    {showModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
    
    <div className="bg-[#1f1f1f] w-full max-w-xl rounded-xl p-6 shadow-2xl">

      <input
        className="w-full text-xl font-semibold bg-transparent outline-none text-white mb-4"
        placeholder="Untitled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full bg-transparent outline-none text-gray-300 min-h-[120px]"
        placeholder="Start writing..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-400 hover:text-white"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            addNote();
            setShowModal(false);
          }}
          className="bg-white text-black px-4 py-1 rounded"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}
  </div>
);
}