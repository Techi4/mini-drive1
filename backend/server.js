import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

connectDB();

const app = express();

/* ✅ 1) CORS FIRST */
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://mini-drive1-omega.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

/* ✅ 2) Handle preflight */
app.options("*", cors());

/* ✅ 3) Body parser */
app.use(express.json());

/* ✅ 4) Routes */
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

/* ✅ 5) Error handler */
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
