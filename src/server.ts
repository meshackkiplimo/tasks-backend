import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoute";
import { connectDB } from "./config/db";


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Server is running!");
  });
  

// Routes
app.use("/api/tasks", taskRoutes);

connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));
