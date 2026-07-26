export default function NoteCard({ note, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-[#1f1f1f] p-5 rounded-xl border border-white/10 hover:border-purple-500 transition hover:-translate-y-1"
    >
      <h2 className="text-lg font-semibold text-white mb-2">
        {note.title || "Untitled"}
      </h2>

      <p className="text-gray-400 line-clamp-3">
        {note.note}
      </p>
    </div>
  );
}