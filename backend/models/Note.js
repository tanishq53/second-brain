import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Note", noteSchema);