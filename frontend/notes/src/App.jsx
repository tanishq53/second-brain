import { useState, useEffect } from "react";
import { auth, provider } from "./firebase";
import { db } from "./firebase";
import AuthModal from "./components/AuthModal";
import NoteModal from "./components/NoteModal";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Sidebar from "./components/Sidebar";
import {
  
  signInWithPopup,
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
  if (!user) {
    setNotes([]);
    return;
  }

  const q = query(
    collection(db, "notes"),
    where("uid", "==", user.uid)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const loadedNotes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Loaded Notes:", loadedNotes);

    setNotes(loadedNotes);
  });

  return () => unsubscribe();
}, [user]);
useEffect(() => {
  

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("Auth State:", currentUser);

    if (currentUser) {
      setUser(currentUser);
      setShowAuthModal(false);
    } else {
      setUser(null);
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
    const result = await signInWithPopup(auth, provider);
    console.log("Google User:", result.user);

    setUser(result.user);
    setShowAuthModal(false);
  } catch (error) {
    console.error(error);
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
  const addNote = async () => {
  if (!title || !note || !user) return;

  try {
    await addDoc(collection(db, "notes"), {
      uid: user.uid,
      title,
      note,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setNote("");
  } catch (err) {
    console.log(err);
  }
};

  return (
  <div className="min-h-screen flex bg-black text-white">
    <Sidebar
  user={user}
  notes={notes}
  logout={logout}
  setShowModal={setShowModal}
  setShowAuthModal={setShowAuthModal}
/>

    {/* MAIN CONTENT */}
    <div className="flex-1 relative p-10">

  {/* glow background */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 blur-3xl opacity-20"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 blur-3xl opacity-20"></div>

  <div className="relative z-10 max-w-5xl mx-auto">

  {user ? (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-100 mb-2">
          Welcome {user.displayName}
        </h1>

        <p className="text-gray-400 text-sm">
          Select a note or create a new one
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-3xl text-gray-300">
            No Notes Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Click <b>+ New Note</b> to create your first note.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {notes.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                setTitle(n.title);
                setNote(n.note);
                setSelectedIndex(n.id);
                setShowModal(true);
              }}
              className="cursor-pointer bg-[#1f1f1f] p-5 rounded-xl border border-white/10 hover:border-purple-500 transition"
            >
              <h2 className="text-lg font-semibold text-white mb-2">
                {n.title || "Untitled"}
              </h2>

              <p className="text-gray-400">
                {n.note}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  ) : (
    <div className="flex items-center justify-center h-[70vh]">
      <h1 className="text-3xl text-gray-300">
        Please login to continue
      </h1>
    </div>
  )}
</div>
</div>
<NoteModal
  showModal={showModal}
  setShowModal={setShowModal}
  title={title}
  setTitle={setTitle}
  note={note}
  setNote={setNote}
  addNote={addNote}
/>    
<AuthModal
  showAuthModal={showAuthModal}
  setShowAuthModal={setShowAuthModal}
  email={email}
  setEmail={setEmail}
  password={password}
  setPassword={setPassword}
  handleGoogleLogin={handleGoogleLogin}
  handleEmailLogin={handleEmailLogin}
  handleRegister={handleRegister}
/>
  </div>
);
}