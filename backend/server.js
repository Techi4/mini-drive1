import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

connectDB();

const app = express();

/* ✅ Required for ES module __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ✅ CORS MUST come before routes */
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      // Allow localhost
      if (origin.startsWith("http://localhost")) return cb(null, true);

      // Allow all Vercel domains (production + preview)
      if (origin.includes(".vercel.app")) return cb(null, true);

      return cb(new Error("CORS blocked: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ Preflight */
app.options("*", cors());

/* ✅ Middleware */
app.use(express.json());

/* ✅ Serve uploaded files properly */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ✅ Routes */
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

/* ✅ Health route */
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Mini Drive backend running ✅" });
});

/* ✅ Global error handler */
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
