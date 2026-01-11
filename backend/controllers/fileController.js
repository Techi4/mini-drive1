import File from "../models/File.js";
import fs from "fs";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const created = await File.create({
      filename: req.file.originalname,
      path: req.file.path,
      owner: req.user.id
    });

    return res.status(201).json(created);
  } catch (err) {
    console.log("UPLOAD ERROR BACKEND:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await File.find({
      $or: [{ owner: req.user.id }, { sharedWith: req.user.id }]
    }).sort({ createdAt: -1 });

    return res.json(files);
  } catch (err) {
    console.log("GET FILES ERROR BACKEND:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    if (file.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // ✅ delete from uploads folder (optional but best)
    if (file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    await File.findByIdAndDelete(req.params.id);

    return res.json({ message: "File deleted ✅" });
  } catch (err) {
    console.log("DELETE FILE ERROR BACKEND:", err);
    return res.status(500).json({ message: err.message });
  }
};
