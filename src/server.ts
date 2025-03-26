import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoute";
import { connectDB } from "./config/db";


dotenv.config();
const app = express();

const allowedOrigins = [
    'https://fanya-theta.vercel.app',
    'http://localhost:5000',
  ];

// Middleware
app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  );
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Server is running!");
  });
  

// Routes
app.use("/api/tasks", taskRoutes);

connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));
export default app;
