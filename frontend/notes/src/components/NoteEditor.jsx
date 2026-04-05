import { useState } from "react";
import API from "../services/api";

const NoteEditor = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const saveNote = async () => {
    if (!title || !content) return alert("Fill all fields");

    await API.post("/notes", { title, content });

    setTitle("");
    setContent("");
    refresh();
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={saveNote}>Save Note</button>
    </div>
  );
};

export default NoteEditor;