import { useEffect, useState } from "react";
import API from "../services/api";
import NoteCard from "../components/NoteCard";
import NoteEditor from "../components/NoteEditor";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>🧠 Second Brain</h1>

      <NoteEditor refresh={fetchNotes} />

      <div style={{ marginTop: "20px" }}>
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;