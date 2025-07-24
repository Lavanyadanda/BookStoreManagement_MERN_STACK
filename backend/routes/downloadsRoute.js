// routes/downloadsRoute.js
import express from "express";
import Download from "../models/Download.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userName, userEmail, bookTitle, bookId } = req.body;
    const newDownload = new Download({ userName, userEmail, bookTitle, bookId });
    await newDownload.save();
    res.status(201).json({ message: "Download recorded." });
  } catch (error) {
    res.status(500).json({ message: "Error recording download", error });
  }
});

export default router;
