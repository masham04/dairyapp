import mongoose from "mongoose";
import User from "./user.js";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.ObjectId,
    ref: User
  }
});
const Note =  mongoose.model("Note", NoteSchema);
export default Note;