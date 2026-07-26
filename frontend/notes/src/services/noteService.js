import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export async function createNote(user, title, note) {
  return await addDoc(collection(db, "notes"), {
    uid: user.uid,
    title,
    note,
    pinned: false,
    favorite: false,
    createdAt: serverTimestamp(),
  });
}

export async function editNote(id, title, note) {
  await updateDoc(doc(db, "notes", id), {
    title,
    note,
    updatedAt: serverTimestamp(),
  });
}

export async function removeNote(id) {
  await deleteDoc(doc(db, "notes", id));
}