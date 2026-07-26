import { useEffect, useState } from "react";
import { db } from "../firebase";
import { createNote } from "../services/noteService";
import { createNote, editNote } from "../services/noteService";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export default function useNotes(user) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!user) {
      setNotes([]);
      return;
    }

    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid)
    );
const addNote = async (title, note) => {
  if (!title || !note || !user) return;

  await createNote(user, title, note);
};
const updateNote = async (id, title, note) => {
  if (!id) return;

  await editNote(id, title, note);
};
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotes(loadedNotes);
    });

    return () => unsubscribe();
  }, [user]);

  const addNote = async (title, note) => {
    if (!title || !note || !user) return;

    
  };

  return {
    notes,
    addNote,
    updateNote,
  };
}