import NoteCard from "./NoteCard";

export default function NotesGrid({
  notes,
  setTitle,
  setNote,
  setSelectedNote,
  setShowModal,
}) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {notes.map((n) => (
        <NoteCard
          key={n.id}
          note={n}
          onClick={() => {
  console.log("Clicked ID:", n.id);

  setTitle(n.title);
  setNote(n.note);
  setSelectedNote(n.id);
  setShowModal(true);
}}
        />
      ))}
    </div>
  );
}