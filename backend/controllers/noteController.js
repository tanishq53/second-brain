import Note from "../models/Note.js";

// Create Note
export const createNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Notes
export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

// Get Single Note
export const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id).populate("links");
  res.json(note);
};

// Update Note
export const updateNote = async (req, res) => {
  const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete Note
export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};