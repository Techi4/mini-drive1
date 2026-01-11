import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { uploadFile, getFiles, deleteFile } from "../controllers/fileController.js";

const router = express.Router();

router.post("/", auth, upload.single("file"), uploadFile);
router.get("/", auth, getFiles);
router.delete("/:id", auth, deleteFile);

export default router;
