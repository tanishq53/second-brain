export default function NoteModal({
  showModal,
  setShowModal,
  title,
  setTitle,
  note,
  setNote,
  addNote,
  updateNote,
  selectedNote,
}) {
  if (!showModal) return null;

  return (
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
    if (selectedNote) {
      updateNote();
    } else {
      addNote();
    }

    setShowModal(false);
  }}
  className="bg-white text-black px-4 py-1 rounded"
>
  {selectedNote ? "Update" : "Save"}
</button>
        </div>

      </div>
    </div>
  );
}