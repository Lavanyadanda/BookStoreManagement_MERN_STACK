// models/Download.js
import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  bookTitle: { type: String, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  downloadTime: { type: Date, default: Date.now }
});

const Download = mongoose.model("Download", downloadSchema);
export default Download;
