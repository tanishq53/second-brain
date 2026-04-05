import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));