import { useState, useEffect } from "react";
import { auth, provider } from "./firebase";
import {
  
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("User:", currentUser);

    if (currentUser) {
      setUser(currentUser);
      setShowAuthModal(false);
    }
  });

  return () => unsubscribe();
}, []);useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("User:", currentUser);

    if (currentUser) {
      setUser(currentUser);
      setShowAuthModal(false);
    }
  });

  return () => unsubscribe();
}, []);
useEffect(() => {
  // Handle redirect result (for PWA)
  getRedirectResult(auth).then((result) => {
    if (result?.user) {
      setUser(result.user);
      setShowAuthModal(false);
    }
  });
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      console.log("User logged in:", currentUser);
      setUser(currentUser);
      setShowAuthModal(false);
    }
  });

  return () => unsubscribe();
}, []);
const logout = () => {
  signOut(auth);
  setUser(null);
};
const handleGoogleLogin = async () => {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.log(error);
  }
};

const handleEmailLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setShowAuthModal(false);
  } catch (err) {
    console.log(err);
  }
};

const handleRegister = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    setShowAuthModal(false);
  } catch (err) {
    console.log(err);
  }
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
    <div className="w-60 bg-[#111] border-r border-white/10 p-4 flex flex-col justify-between">

  {/* TOP */}
  <div>
    <h2 className="text-lg font-medium mb-6 text-gray-200">
      🧠 Second Brain
    </h2>

    <button
      onClick={() => setShowModal(true)}
      className="text-left px-3 py-2 rounded-md hover:bg-white/10 text-sm text-gray-300 transition"
    >
      + New Note
    </button>

    {/* Notes list */}
    <div className="mt-4 space-y-1">
      {notes.map((n, i) => (
        <div
          key={i}
          className="px-3 py-2 rounded-md text-sm text-gray-400 hover:bg-white/5 cursor-pointer"
        >
          {n.title || "Untitled"}
        </div>
      ))}
    </div>
  </div>

  {/* 🔥 BOTTOM LOGIN BUTTON */}
  <button
    onClick={() => setShowAuthModal(true)}
    className="w-full py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm text-white transition"
  >
    Login / Signup
  </button>

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
{showAuthModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    <div className="bg-[#1a1a1a] w-full max-w-sm rounded-xl p-6 shadow-xl">

      <h2 className="text-lg font-semibold mb-4 text-white">
        Welcome
      </h2>

      {/* GOOGLE LOGIN */}
      <button
        onClick={handleGoogleLogin}
        className="w-full mb-3 py-2 rounded-md bg-white text-black font-medium hover:opacity-90 transition"
      >
        Continue with Google
      </button>

      {/* DIVIDER */}
      <div className="text-center text-gray-400 text-sm my-3">or</div>

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white"
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white"
      />

      {/* LOGIN BUTTON */}
      <button
        onClick={handleEmailLogin}
        className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition"
      >
        Login
      </button>

      {/* REGISTER */}
      <button
        onClick={handleRegister}
        className="w-full mt-2 py-2 rounded-md border border-white/20 hover:bg-white/10 transition"
      >
        Register
      </button>

      {/* CLOSE */}
      <button
        onClick={() => setShowAuthModal(false)}
        className="mt-4 text-sm text-gray-400 hover:text-white"
      >
        Cancel
      </button>

    </div>
  </div>
)}
  </div>
);
}